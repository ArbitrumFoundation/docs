import { keccak256 } from '@ethersproject/solidity';
import { NextResponse } from 'next/server';

import { checkDocument } from '@/lib/cms/check-document';
import { branchFor, cmsConfig, isEditablePath } from '@/lib/cms/config';
import { ensurePullRequest } from '@/lib/cms/pull-request';
import { jsonError, withGitHub } from '@/lib/cms/session';

export const GET = withGitHub(async (github, request) => {
  const path = new URL(request.url).searchParams.get('path') ?? '';
  if (!isEditablePath(path)) return jsonError('path is not editable', 400);

  const branch = branchFor(path);
  const [draftSha, baseFile] = await Promise.all([
    github.getBranchSha(branch),
    github.getFile(path, cmsConfig.baseBranch),
  ]);
  const ref = draftSha ? branch : cmsConfig.baseBranch;
  const [file, pull] = draftSha
    ? await Promise.all([github.getFile(path, branch), github.findOpenPullRequest(branch)])
    : [baseFile, null];
  if (!file) return jsonError('file not found', 404);

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

  const branch = branchFor(path);
  const [viewer, branchSha] = await Promise.all([github.getViewer(), github.getBranchSha(branch)]);
  if (!viewer.canWrite) return jsonError('you do not have write access to this repository', 403);
  const branchExists = Boolean(branchSha);
  const ref = branchExists ? branch : cmsConfig.baseBranch;
  const [current, repoPaths] = await Promise.all([
    github.getFile(path, ref),
    github.listFiles(ref),
  ]);

  if (body.create && current) return jsonError('a page with this name already exists', 409);
  if (!body.create && !current) return jsonError('file not found', 404);
  if (current && body.sha && current.sha !== body.sha) {
    return NextResponse.json(
      { error: 'this page changed since you opened it', conflict: true, latest: current },
      { status: 409 }
    );
  }

  const problems = checkDocument({
    path,
    content: body.content,
    create: Boolean(body.create),
    repoFiles: new Set([...repoPaths, path]),
  });
  if (problems.length > 0) {
    return NextResponse.json({ error: 'the page has problems to fix', problems }, { status: 422 });
  }

  if (!branchExists) await github.ensureBranch(branch, true);

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
