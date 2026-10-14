import { NextResponse } from 'next/server';

import { branchFor, isEditablePath } from '@/lib/cms/config';
import { ensurePullRequest } from '@/lib/cms/pull-request';
import { jsonError, withGitHub } from '@/lib/cms/session';
import {
  detectFileType,
  isBlobSha,
  maxUploadBytes,
  maxUploadChunks,
  safeFileName,
  uploadDirectories,
  type UploadKind,
} from '@/lib/cms/uploads';

// joining a 70 MB report and sending it to github can take a while
export const maxDuration = 300;

type UploadBody = { page?: string; kind?: UploadKind; name?: string; chunks?: unknown };

const kindHints: Record<UploadKind, string> = {
  pdf: 'This file is not a real PDF. Export or save it as a PDF, then try again.',
  image:
    'This file is not a PNG, JPEG, GIF or WebP image. Save it in one of those formats, then try again.',
};

// commits an uploaded file to the page's draft branch and makes sure the draft has a pull request
export const POST = withGitHub(async (github, request) => {
  const body = (await request.json()) as UploadBody;
  const page = body.page ?? '';
  if (!isEditablePath(page)) return jsonError('page is not editable', 400);
  if (body.kind !== 'pdf' && body.kind !== 'image') return jsonError('unknown upload type', 400);
  const chunks = body.chunks;
  if (!Array.isArray(chunks) || chunks.length === 0 || chunks.length > maxUploadChunks) {
    return jsonError('The upload did not finish. Try again.', 400);
  }
  if (!chunks.every(isBlobSha)) return jsonError('The upload did not finish. Try again.', 400);

  const viewer = await github.getViewer();
  if (!viewer.canWrite) return jsonError('you do not have write access to this repository', 403);

  const pieces = await Promise.all(chunks.map((sha) => github.getBlob(sha)));
  const file = Buffer.concat(pieces);
  if (file.length > maxUploadBytes) {
    return jsonError('Files must be smaller than 70 MB. Compress the file and try again.', 413);
  }
  const type = detectFileType(file);
  if (!type || type.kind !== body.kind) {
    return jsonError(kindHints[body.kind], 415);
  }
  // a single piece is already the whole file, so its blob can be committed as is
  const blobSha = chunks.length === 1 ? chunks[0] : await github.createBlob(file);

  const branch = branchFor(page);
  await github.ensureBranch(branch);
  const directory = uploadDirectories[type.kind];
  const existing = new Set(await github.listFiles(branch));
  let name = safeFileName(body.name ?? 'file', type.extension);
  if (existing.has(`${directory}/${name}`)) name = `${Date.now()}-${name}`;
  const path = `${directory}/${name}`;

  await github.commitBlob({ branch, path, blobSha, message: `Upload ${name}` });
  const pullRequestUrl = await ensurePullRequest(github, {
    branch,
    path: page,
    created: false,
    login: viewer.login,
  });

  return NextResponse.json({
    branch,
    src: `/${path.replace(/^public\//, '')}`,
    pullRequestUrl,
  });
});
