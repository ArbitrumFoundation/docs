'use client';

import { X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { stringify } from 'yaml';

import { collections } from '@/lib/cms/config';
import { pageUrlFromPath } from '@/lib/cms/paths';
import { previewNoticePath } from '@/lib/cms/shared-content';
import { siteUrl } from '@/lib/site';

type NewPageDialogProps = {
  initialCollection: string;
  allPaths: string[];
  onCancel: () => void;
  onCreate: (path: string, content: string) => Promise<void>;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const creatable = collections.filter((collection) => collection.allowCreate);

const inputClass = 'mt-1 w-full rounded-sm border bg-fd-background px-2 py-1.5 text-sm';
const labelClass = 'block text-sm font-medium';
const hintClass = 'mt-1 block text-xs font-normal text-fd-muted-foreground';

export function NewPageDialog({
  initialCollection,
  allPaths,
  onCancel,
  onCreate,
}: NewPageDialogProps) {
  const [collectionId, setCollectionId] = useState(initialCollection);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [sme, setSme] = useState('');
  const [preview, setPreview] = useState(true);
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !busy) onCancel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [busy, onCancel]);

  const collection = creatable.find((item) => item.id === collectionId) ?? creatable[0];
  const finalSlug = slug || slugify(title);
  const path = `${collection.directory}/${finalSlug || 'page'}.mdx`;
  const url = pageUrlFromPath(path) ?? '';
  const takenBy = allPaths.find((other) => pageUrlFromPath(other) === url);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return setError('Add a title.');
    if (!description.trim()) return setError('Add a short description.');
    if (!finalSlug) return setError('Add a web address.');
    if (takenBy) return setError('Another page already uses this web address.');
    setBusy(true);
    setError(undefined);
    const details: Record<string, string> = {
      title: title.trim(),
      sidebar_label: title.trim(),
      description: description.trim(),
    };
    if (author.trim()) details.dao_author = author.trim();
    if (sme.trim()) details.dao_sme = sme.trim();
    const body = preview ? `\n<include cwd>${previewNoticePath}</include>\n` : '';
    const content = `---\n${stringify(details, { lineWidth: 0 })}---\n${body}`;
    try {
      await onCreate(path, content);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The page could not be created.');
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-page-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <form
        onSubmit={submit}
        className="relative max-h-full w-full max-w-lg space-y-4 overflow-y-auto rounded-sm bg-fd-card p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onCancel}
          title="Close"
          className="absolute right-3 top-3 rounded-sm p-1 text-fd-muted-foreground hover:bg-fd-accent"
        >
          <X className="size-4" />
        </button>
        <h2 id="new-page-title" className="text-lg font-semibold">
          New page
        </h2>

        <label className={labelClass}>
          Section
          <select
            value={collection.id}
            onChange={(event) => setCollectionId(event.target.value)}
            className={inputClass}
          >
            {creatable.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <span className={hintClass}>
            The page appears at the end of this section in the site navigation.
          </span>
        </label>

        <label className={labelClass}>
          Title
          <input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Web address
          <input
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            placeholder={slugify(title) || 'page-name'}
            className={`${inputClass} font-mono`}
          />
          <span className={`${hintClass} break-all ${takenBy ? 'text-red-600' : ''}`}>
            {siteUrl.replace(/^https?:\/\//, '')}
            {url}
            {takenBy ? ' is already used by another page' : ''}
          </span>
        </label>

        <label className={labelClass}>
          Description
          <textarea
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value.replace(/\n/g, ' '))}
            className={inputClass}
          />
          <span className={hintClass}>
            One or two sentences shown in search results and link previews.
          </span>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Author
            <input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Subject matter expert
            <input
              value={sme}
              onChange={(event) => setSme(event.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={preview}
            onChange={(event) => setPreview(event.target.checked)}
          />
          Show the public preview notice at the top
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm px-3 py-1.5 text-sm hover:bg-fd-accent"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="rounded-sm bg-fd-primary px-3 py-1.5 text-sm font-medium text-fd-primary-foreground disabled:opacity-50"
          >
            {busy ? 'Creating…' : 'Create draft'}
          </button>
        </div>
      </form>
    </div>
  );
}
