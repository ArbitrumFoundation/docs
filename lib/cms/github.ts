import 'server-only';

import { cmsConfig } from './config';

const api = 'https://api.github.com';

export class GitHubError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  allow404?: boolean;
};

export function createGitHubClient(token: string) {
  const repoPath = `/repos/${cmsConfig.owner}/${cmsConfig.repo}`;

  async function request<T>(path: string, options: RequestOptions = {}): Promise<T | null> {
    const response = await fetch(`${api}${path}`, {
      method: options.method ?? 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: 'no-store',
    });
    if (response.status === 404 && options.allow404) return null;
    if (!response.ok) {
      const detail = (await response.json().catch(() => ({}))) as { message?: string };
      throw new GitHubError(detail.message ?? response.statusText, response.status);
    }
    if (response.status === 204) return null;
    return (await response.json()) as T;
  }

  async function getBranchSha(branch: string): Promise<string | null> {
    const ref = await request<{ object: { sha: string } }>(
      `${repoPath}/git/ref/heads/${encodeURIComponent(branch)}`,
      { allow404: true }
    );
    return ref?.object.sha ?? null;
  }

  return {
    async getViewer() {
      const user = await request<{ login: string; avatar_url: string; name: string | null }>(
        '/user'
      );
      const repo = await request<{ permissions?: { push?: boolean } }>(repoPath);
      return {
        login: user!.login,
        name: user!.name,
        avatarUrl: user!.avatar_url,
        canWrite: repo?.permissions?.push === true,
      };
    },

    async listFiles(ref: string) {
      const tree = await request<{ tree: { path: string; type: string }[] }>(
        `${repoPath}/git/trees/${encodeURIComponent(ref)}?recursive=1`
      );
      return tree!.tree.filter((item) => item.type === 'blob').map((item) => item.path);
    },

    async listBranches(prefix: string) {
      const refs = await request<{ ref: string }[]>(
        `${repoPath}/git/matching-refs/heads/${encodeURIComponent(prefix)}`
      );
      return (refs ?? []).map((ref) => ref.ref.replace('refs/heads/', ''));
    },

    getBranchSha,

    async getFile(path: string, ref: string) {
      const file = await request<{ content: string; sha: string }>(
        `${repoPath}/contents/${encodeURI(path)}?ref=${encodeURIComponent(ref)}`,
        { allow404: true }
      );
      if (!file) return null;
      return { content: Buffer.from(file.content, 'base64').toString('utf8'), sha: file.sha };
    },

    async ensureBranch(branch: string) {
      const existing = await getBranchSha(branch);
      if (existing) return existing;
      const base = await getBranchSha(cmsConfig.baseBranch);
      if (!base) throw new GitHubError(`base branch ${cmsConfig.baseBranch} not found`, 404);
      await request(`${repoPath}/git/refs`, {
        method: 'POST',
        body: { ref: `refs/heads/${branch}`, sha: base },
      });
      return base;
    },

    async putFile(input: {
      path: string;
      branch: string;
      message: string;
      content: Buffer | string;
      sha?: string;
    }) {
      const result = await request<{ content: { sha: string } }>(
        `${repoPath}/contents/${encodeURI(input.path)}`,
        {
          method: 'PUT',
          body: {
            message: input.message,
            branch: input.branch,
            content: Buffer.from(input.content).toString('base64'),
            ...(input.sha ? { sha: input.sha } : {}),
          },
        }
      );
      return result!.content.sha;
    },

    async findOpenPullRequest(branch: string) {
      const pulls = await request<{ html_url: string; number: number }[]>(
        `${repoPath}/pulls?state=open&head=${encodeURIComponent(`${cmsConfig.owner}:${branch}`)}`
      );
      return pulls?.[0] ?? null;
    },

    async createPullRequest(input: { branch: string; title: string; body: string }) {
      const pull = await request<{ html_url: string; number: number }>(`${repoPath}/pulls`, {
        method: 'POST',
        body: {
          title: input.title,
          head: input.branch,
          base: cmsConfig.baseBranch,
          body: input.body,
        },
      });
      return pull!;
    },
  };
}

export type GitHubClient = ReturnType<typeof createGitHubClient>;
