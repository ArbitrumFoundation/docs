import 'server-only';

import { collectionFor } from './config';
import type { GitHubClient } from './github';

export function describeChange(path: string, created: boolean) {
  const collection = collectionFor(path)?.label ?? 'Docs';
  const name = path.slice(path.lastIndexOf('/') + 1).replace(/\.mdx$/, '');
  return `${created ? 'Create' : 'Update'} ${collection} “${name}”`;
}

export async function ensurePullRequest(
  github: GitHubClient,
  input: { branch: string; path: string; created: boolean; login: string }
) {
  const existing = await github.findOpenPullRequest(input.branch);
  if (existing) return existing.html_url;
  const pull = await github.createPullRequest({
    branch: input.branch,
    title: describeChange(input.path, input.created),
    body: `Edited in the docs editor by @${input.login}.\n\nFile: \`${input.path}\``,
  });
  return pull.html_url;
}
