import { NextResponse } from 'next/server';

import { branchFor, cmsConfig, isEditablePath } from '@/lib/cms/config';
import { jsonError, withGitHub } from '@/lib/cms/session';

const maxBytes = 5 * 1024 * 1024;
const allowedTypes = new Set([
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
]);

export const POST = withGitHub(async (github, request) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '';
  if (!isEditablePath(page)) return jsonError('page is not editable', 400);

  const type = request.headers.get('content-type') ?? '';
  if (!allowedTypes.has(type))
    return jsonError('only png, jpeg, gif, webp and svg images are allowed', 415);

  const data = Buffer.from(await request.arrayBuffer());
  if (data.byteLength === 0 || data.byteLength > maxBytes) {
    return jsonError('images must be between 1 byte and 5 MB', 413);
  }

  const original = decodeURIComponent(request.headers.get('x-filename') ?? 'image');
  const safeName = original
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const fileName = `${Date.now()}-${safeName || 'image'}`;
  const branch = branchFor(page);

  await github.ensureBranch(branch);
  await github.putFile({
    path: `${cmsConfig.uploadDir}/${fileName}`,
    branch,
    content: data,
    message: `Upload ${fileName}`,
  });

  return NextResponse.json({ src: `/img/uploads/${fileName}` });
});
