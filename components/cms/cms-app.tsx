'use client';

import '@fumadocs-editor/ui/styles.css';

import { MdxEditor, type MediaProvider } from '@fumadocs-editor/ui';
import { ExternalLink, FilePlus, GitPullRequest, LogOut, Save } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import { cmsConfig, collections } from '@/lib/cms/config';

import { ApiError, cmsApi, type CmsDocument, type CmsFile, type Viewer } from './api';
import { NewPageForm } from './new-page-form';

type SessionState =
  { status: 'loading' } | { status: 'signed-out' } | { status: 'ready'; viewer: Viewer };

type SaveState = { status: 'idle' | 'saving' | 'saved' } | { status: 'error'; message: string };

const rawBase = `https://raw.githubusercontent.com/${cmsConfig.owner}/${cmsConfig.repo}`;

export function CmsApp() {
  const [session, setSession] = useState<SessionState>({ status: 'loading' });

  useEffect(() => {
    cmsApi
      .session()
      .then((viewer) => setSession({ status: 'ready', viewer }))
      .catch(() => setSession({ status: 'signed-out' }));
  }, []);

  if (session.status === 'loading') {
    return <CenteredMessage>Loading the docs editor…</CenteredMessage>;
  }
  if (session.status === 'signed-out') return <SignIn />;
  return <Workspace viewer={session.viewer} />;
}

function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 text-fd-muted-foreground">
      {children}
    </main>
  );
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
            Sign in with a GitHub account that has write access to {cmsConfig.owner}/
            {cmsConfig.repo}.
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
  const [files, setFiles] = useState<CmsFile[]>([]);
  const [listError, setListError] = useState<string>();
  const [activePath, setActivePath] = useState<string>();
  const [document, setDocument] = useState<CmsDocument>();
  const [loadError, setLoadError] = useState<string>();
  const [creatingIn, setCreatingIn] = useState<string>();
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' });
  const draft = useRef('');

  const refreshFiles = useCallback(
    () =>
      cmsApi.files().then(
        (result) => {
          setFiles(result.files);
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
    async (path: string) => {
      if (dirty && !window.confirm('You have unsaved changes. Discard them?')) return;
      setActivePath(path);
      setDocument(undefined);
      setLoadError(undefined);
      setDirty(false);
      setSaveState({ status: 'idle' });
      try {
        const loaded = await cmsApi.file(path);
        draft.current = loaded.content;
        setDocument(loaded);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'could not load this page');
      }
    },
    [dirty]
  );

  const save = useCallback(async () => {
    if (!document) return;
    setSaveState({ status: 'saving' });
    try {
      const result = await cmsApi.save({
        path: document.path,
        content: draft.current,
        sha: document.sha,
      });
      setDocument({ ...document, ...result, content: draft.current });
      setDirty(false);
      setSaveState({ status: 'saved' });
      void refreshFiles();
    } catch (error) {
      const message =
        error instanceof ApiError && error.status === 401
          ? 'your session expired, sign in again'
          : error instanceof Error
            ? error.message
            : 'save failed';
      setSaveState({ status: 'error', message });
    }
  }, [document, refreshFiles]);

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
      await cmsApi.save({ path, content, create: true });
      setCreatingIn(undefined);
      await refreshFiles();
      await openFile(path);
    },
    [openFile, refreshFiles]
  );

  const media = useMemo<MediaProvider | undefined>(() => {
    if (!document) return undefined;
    return {
      upload: async (file) => (await cmsApi.upload(document.path, file)).src,
      resolve: (src) =>
        src.startsWith('/img/uploads/')
          ? `${rawBase}/${encodeURIComponent(document.ref)}/public${src}`
          : src,
    };
  }, [document]);

  const signOut = async () => {
    if (dirty && !window.confirm('You have unsaved changes. Sign out anyway?')) return;
    await cmsApi.logout();
    window.location.reload();
  };

  const isConstitution = document?.path === cmsConfig.constitutionPath;

  return (
    <div style={{ '--fde-page-inset': '19rem' } as CSSProperties}>
      <aside className="fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r bg-fd-card">
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
            Your account can read but not save. Ask a maintainer for write access to{' '}
            {cmsConfig.owner}/{cmsConfig.repo}.
          </p>
        ) : null}
        <nav className="flex-1 overflow-y-auto p-2">
          {listError ? <p className="p-2 text-sm text-red-600">{listError}</p> : null}
          {collections.map((collection) => {
            const entries = files.filter((file) => file.collection === collection.id);
            return (
              <section key={collection.id} className="mb-3">
                <div className="flex items-center justify-between px-2 py-1">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
                    {collection.label}
                  </h2>
                  {collection.allowCreate && viewer.canWrite ? (
                    <button
                      type="button"
                      title={`New page in ${collection.label}`}
                      onClick={() => setCreatingIn(collection.id)}
                      className="rounded-sm p-1 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
                    >
                      <FilePlus className="size-3.5" />
                    </button>
                  ) : null}
                </div>
                {creatingIn === collection.id ? (
                  <NewPageForm
                    collection={collection}
                    existing={entries.map((file) => file.path)}
                    onCancel={() => setCreatingIn(undefined)}
                    onCreate={createPage}
                  />
                ) : null}
                <ul>
                  {entries.map((file) => (
                    <li key={file.path}>
                      <button
                        type="button"
                        onClick={() => openFile(file.path)}
                        className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-fd-accent ${
                          file.path === activePath ? 'bg-fd-accent font-medium text-fd-primary' : ''
                        }`}
                      >
                        <span className="min-w-0 flex-1 truncate">{file.title}</span>
                        {file.hasDraft ? (
                          <span className="shrink-0 rounded-sm bg-amber-500/15 px-1.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                            draft
                          </span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </nav>
      </aside>

      {!activePath ? (
        <main className="flex min-h-screen items-center justify-center pl-72 text-fd-muted-foreground">
          <p>Select a page on the left to start editing.</p>
        </main>
      ) : loadError ? (
        <main className="flex min-h-screen items-center justify-center pl-72 text-red-600">
          <p>{loadError}</p>
        </main>
      ) : !document ? (
        <main className="flex min-h-screen items-center justify-center pl-72 text-fd-muted-foreground">
          <p>Loading page…</p>
        </main>
      ) : (
        <MdxEditor
          key={`${document.path}:${document.ref}`}
          variant="page"
          defaultValue={document.content}
          editable={viewer.canWrite}
          media={media}
          onChange={(markdown) => {
            draft.current = markdown;
            setDirty(markdown !== document.content);
            if (saveState.status === 'saved') setSaveState({ status: 'idle' });
          }}
          header={{
            start: (
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <span className="truncate font-medium">{document.path}</span>
                <StatusChip document={document} dirty={dirty} saveState={saveState} />
                {isConstitution ? (
                  <span
                    title="Saving the Constitution also updates its published hash. Only change it to reflect an executed AIP."
                    className="shrink-0 rounded-sm bg-red-500/15 px-1.5 py-0.5 text-[11px] font-medium text-red-700 dark:text-red-400"
                  >
                    Updates constitution hash
                  </span>
                ) : null}
              </div>
            ),
            end: (
              <div className="flex items-center gap-2">
                {document.pullRequestUrl ? (
                  <a
                    href={document.pullRequestUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs hover:bg-fd-accent"
                  >
                    <GitPullRequest className="size-3.5" />
                    Review request
                    <ExternalLink className="size-3" />
                  </a>
                ) : null}
                {viewer.canWrite ? (
                  <button
                    type="button"
                    onClick={save}
                    disabled={!dirty || saveState.status === 'saving'}
                    className="inline-flex items-center gap-1.5 rounded-sm bg-fd-primary px-3 py-1.5 text-xs font-medium text-fd-primary-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    <Save className="size-3.5" />
                    {saveState.status === 'saving' ? 'Saving…' : 'Save draft'}
                  </button>
                ) : null}
              </div>
            ),
          }}
        />
      )}
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
  if (saveState.status === 'error') {
    return <span className="truncate text-xs text-red-600">{saveState.message}</span>;
  }
  const label = dirty
    ? 'Unsaved changes'
    : saveState.status === 'saved'
      ? 'Saved to draft'
      : document.isDraft
        ? 'Draft in review'
        : 'Published';
  const tone = dirty
    ? 'bg-fd-muted text-fd-muted-foreground'
    : document.isDraft
      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400';
  return (
    <span className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] font-medium ${tone}`}>
      {label}
    </span>
  );
}
