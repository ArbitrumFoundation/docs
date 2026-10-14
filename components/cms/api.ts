import type { UploadKind } from '@/lib/cms/uploads';

export type Repository = {
  owner: string;
  repo: string;
  baseBranch: string;
};

export type Viewer = {
  login: string;
  name: string | null;
  avatarUrl: string;
  canWrite: boolean;
  repository: Repository;
};

export type CmsFile = {
  path: string;
  collection: string;
  title: string;
  label: string;
  hasDraft: boolean;
  isNew: boolean;
};

export type CmsDocument = {
  path: string;
  content: string;
  sha: string;
  ref: string;
  isDraft: boolean;
  pullRequestUrl: string | null;
};

export type SaveResult = {
  sha: string;
  ref: string;
  isDraft: boolean;
  pullRequestUrl: string;
};

export type UploadResult = {
  branch: string;
  src: string;
  pullRequestUrl: string;
};

export type Preview = {
  state: 'none' | 'building' | 'ready' | 'failed';
  url: string | null;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public problems: string[] = [],
    public latest?: { content: string; sha: string }
  ) {
    super(message);
  }
}

type ErrorBody = {
  error?: string;
  problems?: string[];
  latest?: { content: string; sha: string };
};

async function call<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, { cache: 'no-store', ...init });
  const data = (await response.json().catch(() => ({}))) as T & ErrorBody;
  if (!response.ok) {
    throw new ApiError(
      data.error ?? response.statusText,
      response.status,
      data.problems ?? [],
      data.latest
    );
  }
  return data;
}

const json = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const cmsApi = {
  session: () => call<Viewer>('/api/cms/session'),
  files: () => call<{ files: CmsFile[] }>('/api/cms/files'),
  file: (path: string) => call<CmsDocument>(`/api/cms/file?path=${encodeURIComponent(path)}`),
  save: (input: { path: string; content: string; sha?: string | null; create?: boolean }) =>
    call<SaveResult>('/api/cms/file', json('PUT', input)),
  uploadChunk: (piece: Blob) =>
    call<{ sha: string }>('/api/cms/upload/chunk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: piece,
    }),
  upload: (input: { page: string; kind: UploadKind; name: string; chunks: string[] }) =>
    call<UploadResult>('/api/cms/upload', json('POST', input)),
  preview: (path: string) => call<Preview>(`/api/cms/preview?path=${encodeURIComponent(path)}`),
  logout: () => call<{ ok: boolean }>('/api/cms/logout', { method: 'POST' }),
};
