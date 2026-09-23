import { keccak256 } from '@ethersproject/solidity';
import { NextResponse } from 'next/server';

import { branchFor, cmsConfig, isEditablePath } from '@/lib/cms/config';
import { ensurePullRequest } from '@/lib/cms/pull-request';
import { jsonError, withGitHub } from '@/lib/cms/session';

export const GET = withGitHub(async (github, request) => {
  const path = new URL(request.url).searchParams.get('path') ?? '';
  if (!isEditablePath(path)) return jsonError('path is not editable', 400);

  const branch = branchFor(path);
  const draftSha = await github.getBranchSha(branch);
  const ref = draftSha ? branch : cmsConfig.baseBranch;
  const file = await github.getFile(path, ref);
  if (!file) return jsonError('file not found', 404);

  const pull = draftSha ? await github.findOpenPullRequest(branch) : null;
  return NextResponse.json({
    path,
    content: file.content,
    sha: file.sha,
    ref,
    isDraft: Boolean(draftSha),
    pullRequestUrl: pull?.html_url ?? null,
  });
});

type SaveBody = {
  path?: string;
  content?: string;
  sha?: string | null;
  create?: boolean;
};

export const PUT = withGitHub(async (github, request) => {
  const body = (await request.json()) as SaveBody;
  const path = body.path ?? '';
  if (!isEditablePath(path)) return jsonError('path is not editable', 400);
  if (typeof body.content !== 'string') return jsonError('content is required', 400);

  const viewer = await github.getViewer();
  if (!viewer.canWrite) return jsonError('you do not have write access to this repository', 403);

  const branch = branchFor(path);
  await github.ensureBranch(branch);
  const current = await github.getFile(path, branch);

  if (body.create && current) return jsonError('a page with this name already exists', 409);
  if (!body.create && !current) return jsonError('file not found', 404);
  if (current && body.sha && current.sha !== body.sha) {
    return jsonError(
      'this page changed since you opened it, reload to get the latest version',
      409
    );
  }

  const sha = await github.putFile({
    path,
    branch,
    content: body.content,
    sha: current?.sha,
    message: `${body.create ? 'Create' : 'Update'} ${path}`,
  });

  if (path === cmsConfig.constitutionPath) {
    const hashFile = await github.getFile(cmsConfig.constitutionHashPath, branch);
    const constitutionHash = keccak256(['string'], [body.content]);
    await github.putFile({
      path: cmsConfig.constitutionHashPath,
      branch,
      content: JSON.stringify({ constitutionHash }),
      sha: hashFile?.sha,
      message: 'Update constitution hash',
    });
  }

  const pullRequestUrl = await ensurePullRequest(github, {
    branch,
    path,
    created: Boolean(body.create),
    login: viewer.login,
  });

  return NextResponse.json({ sha, ref: branch, isDraft: true, pullRequestUrl });
});
