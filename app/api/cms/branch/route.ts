import { NextResponse } from 'next/server';

import { branchFor, isEditablePath } from '@/lib/cms/config';
import { jsonError, withGitHub } from '@/lib/cms/session';

export const POST = withGitHub(async (github, request) => {
  const { page } = (await request.json()) as { page?: string };
  if (!page || !isEditablePath(page)) return jsonError('page is not editable', 400);
  const branch = branchFor(page);
  await github.ensureBranch(branch);
  return NextResponse.json({ branch });
});
