import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  chunkCount,
  detectFileType,
  isBlobSha,
  maxUploadBytes,
  maxUploadChunks,
  safeFileName,
  uploadChunkBytes,
} from './uploads.ts';

const bytes = (...values: (number | string)[]) =>
  new Uint8Array(
    values.flatMap((value) =>
      typeof value === 'string' ? [...value].map((char) => char.charCodeAt(0)) : [value]
    )
  );

test('detects pdf and image files from their first bytes', () => {
  assert.deepEqual(detectFileType(bytes('%PDF-1.7\n')), { kind: 'pdf', extension: 'pdf' });
  assert.deepEqual(detectFileType(bytes(0x89, 'PNG', 0x0d, 0x0a, 0x1a, 0x0a, 0)), {
    kind: 'image',
    extension: 'png',
  });
  assert.deepEqual(detectFileType(bytes(0xff, 0xd8, 0xff, 0xe0)), {
    kind: 'image',
    extension: 'jpg',
  });
  assert.deepEqual(detectFileType(bytes('GIF89a')), { kind: 'image', extension: 'gif' });
  assert.deepEqual(detectFileType(bytes('RIFF', 0, 0, 0, 0, 'WEBPVP8 ')), {
    kind: 'image',
    extension: 'webp',
  });
});

test('refuses files that only claim to be pdfs or images', () => {
  assert.equal(detectFileType(bytes('<html><script>alert(1)</script>')), null);
  assert.equal(detectFileType(bytes('<svg xmlns="http://www.w3.org/2000/svg">')), null);
  assert.equal(detectFileType(bytes('RIFF', 0, 0, 0, 0, 'WAVE')), null);
  assert.equal(detectFileType(new Uint8Array()), null);
});

test('file names are slugged and take the detected extension', () => {
  assert.equal(safeFileName('Q3 Report (final).PDF', 'pdf'), 'Q3-Report-final.pdf');
  assert.equal(safeFileName('photo.jpeg', 'jpg'), 'photo.jpg');
  assert.equal(safeFileName('report.html', 'pdf'), 'report.pdf');
  assert.equal(safeFileName('../../etc/passwd', 'pdf'), 'passwd.pdf');
  assert.equal(safeFileName('Foundation’s plan.png'), 'Foundations-plan.png');
  assert.equal(safeFileName('!!!.pdf', 'pdf'), 'file.pdf');
});

test('files are split into pieces that fit a vercel function request', () => {
  assert.ok(uploadChunkBytes < 4.5 * 1024 * 1024);
  assert.equal(chunkCount(0), 1);
  assert.equal(chunkCount(uploadChunkBytes), 1);
  assert.equal(chunkCount(uploadChunkBytes + 1), 2);
  assert.equal(chunkCount(maxUploadBytes), maxUploadChunks);
});

test('only accepts git blob shas as upload pieces', () => {
  assert.ok(isBlobSha('a'.repeat(40)));
  assert.ok(!isBlobSha('A'.repeat(40)));
  assert.ok(!isBlobSha('../refs/heads/main'));
  assert.ok(!isBlobSha(42));
});
