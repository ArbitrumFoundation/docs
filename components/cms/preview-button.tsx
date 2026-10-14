'use client';

import { Eye, Loader2, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cmsApi, type Preview } from './api';

const pollMs = 15_000;

type PreviewButtonProps = {
  path: string;
  pageUrl: string | null;
  // changes after each save so a fresh build is picked up
  revision: string;
};

export function PreviewButton({ path, pageUrl, revision }: PreviewButtonProps) {
  const [preview, setPreview] = useState<Preview>({ state: 'none', url: null });

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      cmsApi
        .preview(path)
        .then((next) => {
          if (cancelled) return;
          setPreview(next);
          if (next.state === 'building') timer = setTimeout(check, pollMs);
        })
        .catch(() => undefined);
    };
    check();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [path, revision]);

  const base = 'inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs';

  if (preview.state === 'building') {
    return (
      <span className={`${base} text-fd-muted-foreground`}>
        <Loader2 className="size-3.5 animate-spin" />
        Preview building…
      </span>
    );
  }
  if (preview.state === 'failed') {
    return (
      <a
        href={preview.url ?? undefined}
        target="_blank"
        rel="noreferrer"
        title="The preview could not be built. A maintainer can see why from this link."
        className={`${base} border-red-500/40 text-red-700 hover:bg-red-500/10 dark:text-red-400`}
      >
        <TriangleAlert className="size-3.5" />
        Preview failed
      </a>
    );
  }
  if (preview.state === 'ready' && preview.url) {
    return (
      <a
        href={`${preview.url.replace(/\/$/, '')}${pageUrl ?? ''}`}
        target="_blank"
        rel="noreferrer"
        className={`${base} hover:bg-fd-accent`}
      >
        <Eye className="size-3.5" />
        Preview draft
      </a>
    );
  }
  return null;
}
