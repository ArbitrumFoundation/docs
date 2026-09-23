'use client';

import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

import { collections } from '@/lib/cms/config';

import type { CmsFile } from './api';

type PageListProps = {
  files: CmsFile[];
  activePath?: string;
  canWrite: boolean;
  onOpen: (path: string) => void;
  onStartCreate: (collection: string) => void;
};

export function PageList({ files, activePath, canWrite, onOpen, onStartCreate }: PageListProps) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const matches = (file: CmsFile) =>
    !needle || `${file.label} ${file.title}`.toLowerCase().includes(needle);

  return (
    <>
      <div className="border-b p-2">
        <label className="flex items-center gap-2 rounded-sm border bg-fd-background px-2 py-1.5">
          <Search className="size-3.5 text-fd-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a page"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {collections.map((collection) => {
          const entries = files.filter((file) => file.collection === collection.id);
          const visible = entries.filter(matches);
          if (needle && visible.length === 0) return null;
          return (
            <section key={collection.id} className="mb-3">
              <div className="flex items-center justify-between gap-2 px-2 py-1">
                <h2 className="min-w-0 truncate text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
                  {collection.label}
                </h2>
                {collection.allowCreate && canWrite ? (
                  <button
                    type="button"
                    onClick={() => onStartCreate(collection.id)}
                    className="inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-sm px-1.5 py-0.5 text-xs text-fd-primary hover:bg-fd-accent"
                  >
                    <Plus className="size-3" />
                    New page
                  </button>
                ) : null}
              </div>
              <ul>
                {visible.map((file) => (
                  <li key={file.path}>
                    <button
                      type="button"
                      title={file.title}
                      onClick={() => onOpen(file.path)}
                      className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-fd-accent ${
                        file.path === activePath ? 'bg-fd-accent font-medium text-fd-primary' : ''
                      }`}
                    >
                      <span className="min-w-0 flex-1 truncate">{file.label}</span>
                      {file.hasDraft ? (
                        <span className="shrink-0 rounded-sm bg-amber-500/15 px-1.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                          {file.isNew ? 'new draft' : 'draft'}
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
    </>
  );
}
