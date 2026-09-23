'use client';

import '@fumadocs-editor/ui/styles.css';

import { MdxEditor, type MdxEditorRef, type MediaProvider } from '@fumadocs-editor/ui';
import { Check, Copy, ExternalLink, FileUp, GitPullRequest, LogOut, Save, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { cmsConfig, collectionFor } from '@/lib/cms/config';
import { pageUrlFromPath, splitFrontmatter } from '@/lib/cms/paths';
import { siteUrl } from '@/lib/site';
import glossary from '@/public/glossary.json';

import { ApiError, cmsApi, type CmsDocument, type CmsFile, type Viewer } from './api';
import { createFileProvider, editorComponents } from './editor-config';
import { readDetails, writeDetails, type DetailKey, type Details } from './frontmatter';
import { uploadToDraft } from './github-upload';
import { nameBareLinks, relativizeSiteLinks } from './link-titles';
import { NewPageDialog } from './new-page-dialog';
import { PageDetails } from './page-details';
import { PageList } from './page-list';
import { PreviewButton } from './preview-button';

type SessionState =
  { status: 'loading' } | { status: 'signed-out' } | { status: 'ready'; viewer: Viewer };

type SaveState =
  | { status: 'idle' | 'saving' | 'saved' }
  | { status: 'error'; message: string; problems: string[] };

type Notice = { tone: 'info' | 'warn'; title: string; body: ReactNode };

type OpenDocument = CmsDocument & {
  body: string;
  frontmatter: string | null;
  frontmatterRaw: string;
  details: Details;
  detailsError?: string;
  version: number;
};

const imageTypes = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

function toOpenDocument(document: CmsDocument, version: number): OpenDocument {
  const { frontmatter, raw, body } = splitFrontmatter(document.content);
  const { details, error } = frontmatter === null ? readDetails('') : readDetails(frontmatter);
  return {
    ...document,
    body,
    frontmatter,
    frontmatterRaw: raw,
    details,
    detailsError: error,
    version,
  };
}

export function CmsApp() {
  const [session, setSession] = useState<SessionState>({ status: 'loading' });

  useEffect(() => {
    cmsApi
      .session()
      .then((viewer) => setSession({ status: 'ready', viewer }))
      .catch(() => setSession({ status: 'signed-out' }));
  }, []);

  if (session.status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center p-6 text-fd-muted-foreground">
        Loading the docs editor…
      </main>
    );
  }
  if (session.status === 'signed-out') return <SignIn />;
  return <Workspace viewer={session.viewer} />;
}

function SignIn() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-af-navy p-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-sm bg-fd-card p-8 text-center shadow-lg">
        <Image
          src="/img/AF_vertical_stack.png"
          alt="Arbitrum Foundation"
          width={160}
          height={120}
          loading="eager"
          style={{ height: 'auto' }}
        />
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Governance docs editor</h1>
          <p className="text-sm text-fd-muted-foreground">
            Sign in with a GitHub account that can edit the governance docs.
          </p>
        </div>
        <form action="/api/auth" method="get" className="w-full">
          <button
            type="submit"
            className="w-full rounded-sm bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
          >
            Sign in with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}

function Workspace({ viewer }: { viewer: Viewer }) {
  const { repository } = viewer;
  const [files, setFiles] = useState<CmsFile[]>([]);
  const [repoPaths, setRepoPaths] = useState<string[]>([]);
  const [listError, setListError] = useState<string>();
  const [activePath, setActivePath] = useState<string>();
  const [document, setDocument] = useState<OpenDocument>();
  const [loadError, setLoadError] = useState<string>();
  const [creatingIn, setCreatingIn] = useState<string>();
  const [details, setDetails] = useState<Details>();
  const [bodyDirty, setBodyDirty] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' });
  const [notice, setNotice] = useState<Notice>();
  const [uploading, setUploading] = useState(false);
  const body = useRef('');
  const editor = useRef<MdxEditorRef>(null);
  const pdfInput = useRef<HTMLInputElement>(null);

  const detailsDirty = Boolean(
    document &&
    details &&
    Object.entries(details).some(
      ([key, value]) => value.trim() !== document.details[key as DetailKey].trim()
    )
  );
  const dirty = bodyDirty || detailsDirty;

  const refreshFiles = useCallback(
    () =>
      cmsApi.files().then(
        (result) => {
          setFiles(result.files);
          setRepoPaths(result.files.map((file) => file.path));
          setListError(undefined);
        },
        (error: unknown) => {
          setListError(error instanceof Error ? error.message : 'could not load pages');
        }
      ),
    []
  );

  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const openFile = useCallback(
    async (path: string, { force = false }: { force?: boolean } = {}) => {
      if (!force && dirty && !window.confirm('You have unsaved changes. Discard them?')) return;
      setActivePath(path);
      setDocument(undefined);
      setDetails(undefined);
      setLoadError(undefined);
      setBodyDirty(false);
      setSaveState({ status: 'idle' });
      setNotice(undefined);
      try {
        const loaded = toOpenDocument(await cmsApi.file(path), Date.now());
        body.current = loaded.body;
        setDocument(loaded);
        setDetails(loaded.details);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'could not load this page');
      }
    },
    [dirty]
  );

  const composeContent = useCallback(() => {
    if (!document || !details) return '';
    const frontmatter =
      document.frontmatter !== null && detailsDirty
        ? writeDetails(document.frontmatter, details, document.details)
        : document.frontmatterRaw;
    return frontmatter + body.current;
  }, [document, details, detailsDirty]);

  // a colleague saved first: merge their version under the open edits instead of discarding them
  const mergeLatest = useCallback(
    async (latest: { content: string; sha: string }) => {
      if (!document) return;
      const incoming = toOpenDocument({ ...document, ...latest }, document.version);
      const conflicts = (await editor.current?.applyExternalMarkdown(incoming.body)) ?? [];
      const keepDetails = detailsDirty ? details : incoming.details;
      setDocument({ ...incoming, content: latest.content });
      setDetails(keepDetails);
      setBodyDirty(true);
      setSaveState({ status: 'idle' });
      setNotice({
        tone: 'warn',
        title: 'Someone else saved this page while you were editing',
        body:
          conflicts.length > 0
            ? 'Their changes were added to yours. Where you both changed the same paragraph, your version was kept. Review the page, then save again.'
            : 'Their changes were added to yours. Review the page, then save again.',
      });
    },
    [document, details, detailsDirty]
  );

  const linkTitles = useMemo(() => {
    const titles = new Map<string, string>();
    for (const file of files) {
      const url = pageUrlFromPath(file.path);
      if (url) titles.set(url, file.label);
    }
    for (const [key, term] of Object.entries(glossary as Record<string, { title: string }>)) {
      titles.set(`/dao-glossary#${key}`, term.title);
    }
    return titles;
  }, [files]);

  const save = useCallback(async () => {
    if (!document || !details) return;
    const named = nameBareLinks(relativizeSiteLinks(body.current, siteUrl), linkTitles);
    const renamedLinks = named !== body.current;
    body.current = named;
    if (!details.title.trim() && document.frontmatter !== null) {
      setSaveState({ status: 'error', message: 'Add a title before saving.', problems: [] });
      return;
    }
    setSaveState({ status: 'saving' });
    const content = composeContent();
    try {
      const result = await cmsApi.save({ path: document.path, content, sha: document.sha });
      const saved = toOpenDocument({ ...document, ...result, content }, document.version);
      setDocument({ ...saved, version: document.version });
      setDetails(saved.details);
      body.current = saved.body;
      if (renamedLinks) await editor.current?.setMarkdown(saved.body);
      editor.current?.markSaved(saved.body);
      setBodyDirty(false);
      setNotice(undefined);
      setSaveState({ status: 'saved' });
      refreshFiles();
    } catch (error) {
      if (error instanceof ApiError && error.status === 409 && error.latest) {
        await mergeLatest(error.latest);
        return;
      }
      const message =
        error instanceof ApiError && error.status === 401
          ? 'Your session expired. Sign in again to save.'
          : error instanceof ApiError && error.problems.length > 0
            ? 'This page has problems to fix before it can be saved:'
            : error instanceof Error
              ? error.message
              : 'Saving failed.';
      setSaveState({
        status: 'error',
        message,
        problems: error instanceof ApiError ? error.problems : [],
      });
    }
  }, [document, details, composeContent, mergeLatest, refreshFiles, linkTitles]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        if (dirty) void save();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dirty, save]);

  const createPage = useCallback(
    async (path: string, content: string) => {
      if (dirty && !window.confirm('The open page has unsaved changes. Discard them?')) {
        throw new Error('Save the open page first, then create the new one.');
      }
      let result;
      try {
        result = await cmsApi.save({ path, content, create: true });
      } catch (error) {
        if (error instanceof ApiError && error.problems.length > 0) {
          throw new Error(error.problems.join(' '));
        }
        throw error;
      }
      // open the new page from what was just saved instead of fetching it again
      const created = toOpenDocument({ path, content, ...result }, Date.now());
      const title = created.details.title || path;
      setFiles((current) => [
        ...current,
        {
          path,
          collection: collectionFor(path)?.id ?? '',
          title,
          label: created.details.sidebar_label || title,
          hasDraft: true,
          isNew: true,
        },
      ]);
      setRepoPaths((current) => [...current, path]);
      setCreatingIn(undefined);
      setActivePath(path);
      setLoadError(undefined);
      setBodyDirty(false);
      setNotice(undefined);
      setSaveState({ status: 'idle' });
      body.current = created.body;
      setDocument(created);
      setDetails(created.details);
      refreshFiles();
    },
    [dirty, refreshFiles]
  );

  const media = useMemo<MediaProvider | undefined>(() => {
    if (!document) return undefined;
    return {
      upload: async (file) => {
        if (!imageTypes.has(file.type)) {
          throw new Error('only png, jpeg, gif and webp images can be added');
        }
        const { src, branch } = await uploadToDraft({
          repository,
          page: document.path,
          directory: cmsConfig.uploadDir,
          file,
        });
        setDocument((current) => (current ? { ...current, ref: branch } : current));
        return src;
      },
      resolve: (src) =>
        src.startsWith('/img/uploads/')
          ? `https://raw.githubusercontent.com/${repository.owner}/${repository.repo}/${encodeURIComponent(document.ref)}/public${src}`
          : src,
    };
  }, [document, repository]);

  const fileProvider = useMemo(() => createFileProvider(repoPaths), [repoPaths]);

  const attachPdf = async (file: File) => {
    if (!document) return;
    if (file.type !== 'application/pdf') {
      setNotice({ tone: 'warn', title: 'Only PDF files can be attached', body: file.name });
      return;
    }
    setUploading(true);
    setNotice({
      tone: 'info',
      title: `Uploading ${file.name}…`,
      body: 'Large reports can take a minute.',
    });
    try {
      const { src, branch } = await uploadToDraft({
        repository,
        page: document.path,
        directory: 'public/assets',
        file,
      });
      setDocument((current) => (current ? { ...current, ref: branch } : current));
      setNotice({
        tone: 'info',
        title: 'PDF uploaded to this draft',
        body: <PdfLink src={src} />,
      });
    } catch (error) {
      setNotice({
        tone: 'warn',
        title: 'The PDF could not be uploaded',
        body: error instanceof Error ? error.message : 'Try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  const signOut = async () => {
    if (dirty && !window.confirm('You have unsaved changes. Sign out anyway?')) return;
    await cmsApi.logout();
    window.location.reload();
  };

  const activeFile = files.find((file) => file.path === document?.path);
  const pageUrl = document ? pageUrlFromPath(document.path) : null;
  const isPartial = document?.path.startsWith('content/partials/');
  const isConstitution = document?.path === cmsConfig.constitutionPath;

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r bg-fd-card">
        <div className="flex items-center gap-3 border-b p-4">
          <Image src="/img/logo.svg" alt="" width={28} height={28} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Governance docs editor</p>
            <p className="truncate text-xs text-fd-muted-foreground">@{viewer.login}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            title="Sign out"
            className="rounded-sm p-1.5 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
          >
            <LogOut className="size-4" />
          </button>
        </div>
        {!viewer.canWrite ? (
          <p className="border-b bg-fd-muted p-3 text-xs text-fd-muted-foreground">
            Your account can read but not save. Ask a docs maintainer for write access to{' '}
            {repository.owner}/{repository.repo}.
          </p>
        ) : null}
        {listError ? <p className="p-3 text-sm text-red-600">{listError}</p> : null}
        <PageList
          files={files}
          activePath={activePath}
          canWrite={viewer.canWrite}
          onOpen={(path) => void openFile(path)}
          onStartCreate={setCreatingIn}
        />
      </aside>

      {creatingIn ? (
        <NewPageDialog
          initialCollection={creatingIn}
          allPaths={repoPaths}
          onCancel={() => setCreatingIn(undefined)}
          onCreate={createPage}
        />
      ) : null}

      <main className="pl-72">
        {!activePath ? (
          <Placeholder>Select a page on the left to start editing.</Placeholder>
        ) : loadError ? (
          <Placeholder tone="error">{loadError}</Placeholder>
        ) : !document || !details ? (
          <Placeholder>Loading page…</Placeholder>
        ) : (
          <>
            <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-fd-background/95 px-6 py-2.5 backdrop-blur">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-sm font-semibold">
                    {activeFile?.label ?? details.title ?? document.path}
                  </h1>
                  <StatusChip document={document} dirty={dirty} saveState={saveState} />
                  {isConstitution ? (
                    <span className="shrink-0 rounded-sm bg-red-500/15 px-1.5 py-0.5 text-[11px] font-medium text-red-700 dark:text-red-400">
                      Saving updates the constitution hash
                    </span>
                  ) : null}
                </div>
                <p className="truncate font-mono text-[11px] text-fd-muted-foreground">
                  {document.path}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {document.isDraft && !isPartial ? (
                  <PreviewButton path={document.path} pageUrl={pageUrl} revision={document.sha} />
                ) : null}
                {pageUrl && !activeFile?.isNew ? (
                  <a
                    href={pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs hover:bg-fd-accent"
                  >
                    View live page
                    <ExternalLink className="size-3" />
                  </a>
                ) : null}
                <a
                  href={document.pullRequestUrl ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-hidden={!document.pullRequestUrl}
                  tabIndex={document.pullRequestUrl ? undefined : -1}
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs hover:bg-fd-accent ${
                    document.pullRequestUrl ? '' : 'invisible'
                  }`}
                >
                  <GitPullRequest className="size-3.5" />
                  Review on GitHub
                </a>
                {viewer.canWrite ? (
                  <>
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => pdfInput.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs hover:bg-fd-accent disabled:opacity-50"
                    >
                      <FileUp className="size-3.5" />
                      Attach PDF
                    </button>
                    <input
                      ref={pdfInput}
                      type="file"
                      accept="application/pdf"
                      hidden
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = '';
                        if (file) void attachPdf(file);
                      }}
                    />
                    <button
                      type="button"
                      onClick={save}
                      disabled={!dirty || saveState.status === 'saving'}
                      className="inline-flex w-28 items-center justify-center gap-1.5 rounded-sm bg-fd-primary px-3 py-1.5 text-xs font-medium text-fd-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      <Save className="size-3.5" />
                      {saveState.status === 'saving' ? 'Saving…' : 'Save draft'}
                    </button>
                  </>
                ) : null}
              </div>
            </header>

            <div className="mx-auto max-w-4xl space-y-4 px-6 py-6">
              {saveState.status === 'error' ? (
                <Banner
                  tone="warn"
                  title={saveState.message}
                  onClose={() => setSaveState({ status: 'idle' })}
                >
                  {saveState.problems.length > 0 ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {saveState.problems.map((problem) => (
                        <li key={problem}>{problem}</li>
                      ))}
                    </ul>
                  ) : null}
                </Banner>
              ) : null}
              {saveState.status === 'saved' ? (
                <Banner
                  tone="info"
                  title="Draft saved"
                  onClose={() => setSaveState({ status: 'idle' })}
                >
                  Your change is waiting for review. A docs maintainer checks it and publishes it to
                  the live site.
                </Banner>
              ) : null}
              {notice ? (
                <Banner
                  tone={notice.tone}
                  title={notice.title}
                  onClose={() => setNotice(undefined)}
                >
                  {notice.body}
                </Banner>
              ) : null}

              {isPartial ? (
                <p className="rounded-sm border bg-fd-muted px-4 py-2.5 text-sm text-fd-muted-foreground">
                  This is shared content. Changes appear on every page that includes it.
                </p>
              ) : (
                <PageDetails
                  details={details}
                  error={document.detailsError}
                  disabled={!viewer.canWrite}
                  onChange={(key, value) => {
                    setDetails((current) => (current ? { ...current, [key]: value } : current));
                    if (saveState.status === 'saved') setSaveState({ status: 'idle' });
                  }}
                />
              )}

              <MdxEditor
                ref={editor}
                key={`${document.path}:${document.version}`}
                defaultValue={document.body}
                editable={viewer.canWrite}
                components={editorComponents}
                media={media}
                files={fileProvider}
                onChange={(markdown) => {
                  body.current = markdown;
                  setBodyDirty(markdown !== document.body);
                  if (saveState.status === 'saved') setSaveState({ status: 'idle' });
                }}
              />
              <p className="text-xs text-fd-muted-foreground">
                Tips: type <kbd className="rounded-sm border px-1">/</kbd> to add a block, and{' '}
                <kbd className="rounded-sm border px-1">[[</kbd> to link to another page or a
                glossary term (the link shows its address until you save, then takes the page name).
                Press <kbd className="rounded-sm border px-1">⌘S</kbd> to save.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Placeholder({ children, tone }: { children: ReactNode; tone?: 'error' }) {
  return (
    <div
      className={`flex min-h-screen items-center justify-center p-6 ${
        tone === 'error' ? 'text-red-600' : 'text-fd-muted-foreground'
      }`}
    >
      <p>{children}</p>
    </div>
  );
}

function Banner({
  tone,
  title,
  children,
  onClose,
}: {
  tone: 'info' | 'warn';
  title: string;
  children?: ReactNode;
  onClose: () => void;
}) {
  const colors =
    tone === 'warn'
      ? 'border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200'
      : 'border-fd-primary/30 bg-fd-primary/10 text-fd-foreground';
  return (
    <div role="status" className={`relative rounded-sm border px-4 py-3 text-sm ${colors}`}>
      <button
        type="button"
        onClick={onClose}
        title="Dismiss"
        className="absolute right-2 top-2 rounded-sm p-1 opacity-70 hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
      <p className="pr-6 font-medium">{title}</p>
      {children ? <div className="mt-1">{children}</div> : null}
    </div>
  );
}

function PdfLink({ src }: { src: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <code className="rounded-sm bg-fd-background px-1.5 py-0.5 text-xs">{src}</code>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(src).then(() => setCopied(true));
          }}
          className="inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs hover:bg-fd-accent"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
      <p className="text-xs">
        To link to it, select the words in the page, click the link button in the toolbar, and
        paste. The file goes live when this draft is published.
      </p>
    </div>
  );
}

function StatusChip({
  document,
  dirty,
  saveState,
}: {
  document: CmsDocument;
  dirty: boolean;
  saveState: SaveState;
}) {
  const label = dirty
    ? 'Unsaved changes'
    : saveState.status === 'saved'
      ? 'Saved, waiting for review'
      : document.isDraft
        ? 'Draft waiting for review'
        : 'Same as the live page';
  const tone = dirty
    ? 'bg-fd-muted text-fd-muted-foreground'
    : document.isDraft || saveState.status === 'saved'
      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400';
  return (
    <span className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] font-medium ${tone}`}>
      {label}
    </span>
  );
}
