'use client';

import { useState, type FormEvent } from 'react';

import type { Collection } from '@/lib/cms/config';

type NewPageFormProps = {
  collection: Collection;
  existing: string[];
  onCancel: () => void;
  onCreate: (path: string, content: string) => Promise<void>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function yamlString(value: string) {
  return JSON.stringify(value);
}

export function NewPageForm({ collection, existing, onCancel, onCreate }: NewPageFormProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const finalSlug = slug || slugify(title);
  const path = `${collection.directory}/${finalSlug}.mdx`;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !finalSlug) return setError('add a title');
    if (existing.includes(path)) return setError('a page with this url already exists');
    setBusy(true);
    setError(undefined);
    const content = [
      '---',
      `title: ${yamlString(title.trim())}`,
      `sidebar_label: ${yamlString(title.trim())}`,
      'description: ""',
      '---',
      '',
      'Start writing here.',
      '',
    ].join('\n');
    try {
      await onCreate(path, content);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'could not create the page');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-2 mb-2 space-y-2 rounded-sm border bg-fd-background p-2">
      <input
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Page title"
        className="w-full rounded-sm border bg-transparent px-2 py-1 text-sm"
      />
      <input
        value={slug}
        onChange={(event) => setSlug(slugify(event.target.value))}
        placeholder={slugify(title) || 'url-slug'}
        className="w-full rounded-sm border bg-transparent px-2 py-1 font-mono text-xs"
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-2 py-1 text-xs hover:underline">
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy}
          className="rounded-sm bg-fd-primary px-2.5 py-1 text-xs font-medium text-fd-primary-foreground disabled:opacity-50"
        >
          {busy ? 'Creating…' : 'Create draft'}
        </button>
      </div>
    </form>
  );
}
