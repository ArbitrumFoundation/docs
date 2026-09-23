export type Viewer = {
  login: string;
  name: string | null;
  avatarUrl: string;
  canWrite: boolean;
};

export type CmsFile = {
  path: string;
  collection: string;
  title: string;
  hasDraft: boolean;
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

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

async function call<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, { cache: 'no-store', ...init });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new ApiError(data.error ?? response.statusText, response.status);
  return data;
}

export const cmsApi = {
  session: () => call<Viewer>('/api/cms/session'),
  files: () => call<{ files: CmsFile[]; newDrafts: string[] }>('/api/cms/files'),
  file: (path: string) => call<CmsDocument>(`/api/cms/file?path=${encodeURIComponent(path)}`),
  save: (input: { path: string; content: string; sha?: string | null; create?: boolean }) =>
    call<SaveResult>('/api/cms/file', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  upload: (page: string, file: File) =>
    call<{ src: string }>(`/api/cms/upload?page=${encodeURIComponent(page)}`, {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'x-filename': encodeURIComponent(file.name),
      },
      body: file,
    }),
  logout: () => call<{ ok: boolean }>('/api/cms/logout', { method: 'POST' }),
};
