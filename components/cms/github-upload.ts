import { cmsApi, type Repository } from './api';

// github rejects blobs over 100 MB and base64 adds a third, so keep raw files under 70 MB
export const maxUploadBytes = 70 * 1024 * 1024;

function readAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error ?? new Error('could not read the file'));
    reader.readAsDataURL(file);
  });
}

export function safeFileName(name: string) {
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const extension = dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
  const slug = base
    .replace(/['’]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slug || 'file'}${extension ? `.${extension}` : ''}`;
}

type UploadInput = {
  repository: Repository;
  page: string;
  directory: string;
  file: File;
};

// commits one file to the page's draft branch through the git data api and returns its site url
export async function uploadToDraft({ repository, page, directory, file }: UploadInput) {
  if (file.size > maxUploadBytes) {
    throw new Error('files must be smaller than 70 MB, compress the file and try again');
  }
  const [{ branch }, { token }, content] = await Promise.all([
    cmsApi.ensureBranch(page),
    cmsApi.token(),
    readAsBase64(file),
  ]);

  const base = `https://api.github.com/repos/${repository.owner}/${repository.repo}`;
  const github = async <T>(path: string, init?: { method: string; body: unknown }) => {
    const response = await fetch(`${base}${path}`, {
      method: init?.method ?? 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        ...(init ? { 'Content-Type': 'application/json' } : {}),
      },
      body: init ? JSON.stringify(init.body) : undefined,
    });
    if (!response.ok) throw new Error(`upload failed: ${response.status} ${response.statusText}`);
    return (await response.json()) as T;
  };

  const ref = await github<{ object: { sha: string } }>(
    `/git/ref/heads/${encodeURIComponent(branch)}`
  );
  const commit = await github<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`);
  const tree = await github<{ tree: { path: string }[] }>(
    `/git/trees/${commit.tree.sha}?recursive=1`
  );
  const existing = new Set(tree.tree.map((entry) => entry.path));

  let name = safeFileName(file.name);
  if (existing.has(`${directory}/${name}`)) name = `${Date.now()}-${name}`;
  const path = `${directory}/${name}`;

  const blob = await github<{ sha: string }>('/git/blobs', {
    method: 'POST',
    body: { content, encoding: 'base64' },
  });
  const nextTree = await github<{ sha: string }>('/git/trees', {
    method: 'POST',
    body: {
      base_tree: commit.tree.sha,
      tree: [{ path, mode: '100644', type: 'blob', sha: blob.sha }],
    },
  });
  const nextCommit = await github<{ sha: string }>('/git/commits', {
    method: 'POST',
    body: { message: `Upload ${name}`, tree: nextTree.sha, parents: [ref.object.sha] },
  });
  await github(`/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: 'PATCH',
    body: { sha: nextCommit.sha },
  });

  return { branch, src: `/${path.replace(/^public\//, '')}` };
}
