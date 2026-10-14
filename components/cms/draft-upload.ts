import { chunkCount, maxUploadBytes, uploadChunkBytes, type UploadKind } from '@/lib/cms/uploads';

import { cmsApi } from './api';

type UploadInput = {
  page: string;
  kind: UploadKind;
  file: File;
  onProgress?: (fraction: number) => void;
};

// sends the file to the server in pieces small enough for a vercel function, three at a time,
// and the server commits it to the page's draft branch, so github credentials never reach the browser
export async function uploadToDraft({ page, kind, file, onProgress }: UploadInput) {
  if (file.size > maxUploadBytes) {
    throw new Error('Files must be smaller than 70 MB. Compress the file and try again.');
  }
  const total = chunkCount(file.size);
  const chunks: string[] = new Array(total);
  let next = 0;
  let done = 0;
  onProgress?.(0);
  const worker = async () => {
    while (next < total) {
      const index = next++;
      const piece = file.slice(index * uploadChunkBytes, (index + 1) * uploadChunkBytes);
      chunks[index] = (await cmsApi.uploadChunk(piece)).sha;
      onProgress?.(++done / (total + 1));
    }
  };
  await Promise.all(Array.from({ length: Math.min(3, total) }, worker));
  const result = await cmsApi.upload({ page, kind, name: file.name, chunks });
  onProgress?.(1);
  return result;
}
