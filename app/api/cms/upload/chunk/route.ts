import { NextResponse } from 'next/server';

import { jsonError, withGitHub } from '@/lib/cms/session';
import { uploadChunkBytes } from '@/lib/cms/uploads';

// stores one piece of a file as a loose git blob, the upload route joins the pieces and commits them
export const POST = withGitHub(async (github, request) => {
  const viewer = await github.getViewer();
  if (!viewer.canWrite) return jsonError('you do not have write access to this repository', 403);
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > uploadChunkBytes) return jsonError('upload piece is too large', 413);
  const bytes = Buffer.from(await request.arrayBuffer());
  if (bytes.length === 0 || bytes.length > uploadChunkBytes) {
    return jsonError('upload piece is empty or too large', 413);
  }
  const sha = await github.createBlob(bytes);
  return NextResponse.json({ sha });
});
