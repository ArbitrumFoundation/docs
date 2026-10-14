import { NextResponse } from 'next/server';

import { branchFor, isEditablePath } from '@/lib/cms/config';
import { jsonError, withGitHub } from '@/lib/cms/session';

export const GET = withGitHub(async (github, request) => {
  const path = new URL(request.url).searchParams.get('path') ?? '';
  if (!isEditablePath(path)) return jsonError('path is not editable', 400);
  const branch = branchFor(path);
  if (!(await github.getBranchSha(branch))) return NextResponse.json({ state: 'none', url: null });
  return NextResponse.json(await github.getPreview(branch));
});
