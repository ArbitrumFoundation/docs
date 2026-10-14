// shared by the editor and the upload routes, so it must stay free of server-only imports

export type UploadKind = 'pdf' | 'image';

// github rejects blobs over 100 MB and base64 adds a third, so keep raw files under 70 MB
export const maxUploadBytes = 70 * 1024 * 1024;

// vercel functions reject request bodies over 4.5 MB, so files travel in 4 MB pieces
export const uploadChunkBytes = 4 * 1024 * 1024;

export const maxUploadChunks = Math.ceil(maxUploadBytes / uploadChunkBytes);

export const uploadDirectories: Record<UploadKind, string> = {
  pdf: 'public/assets',
  image: 'public/img/uploads',
};

type Signature = { extension: string; kind: UploadKind; matches: (bytes: Uint8Array) => boolean };

const startsWith = (bytes: Uint8Array, prefix: number[], offset = 0) =>
  prefix.every((byte, index) => bytes[offset + index] === byte);

const ascii = (text: string) => [...text].map((char) => char.charCodeAt(0));

// the file's first bytes decide its type, never its name, so a renamed html or svg file is refused
const signatures: Signature[] = [
  { extension: 'pdf', kind: 'pdf', matches: (bytes) => startsWith(bytes, ascii('%PDF-')) },
  {
    extension: 'png',
    kind: 'image',
    matches: (bytes) => startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  },
  { extension: 'jpg', kind: 'image', matches: (bytes) => startsWith(bytes, [0xff, 0xd8, 0xff]) },
  {
    extension: 'gif',
    kind: 'image',
    matches: (bytes) => startsWith(bytes, ascii('GIF87a')) || startsWith(bytes, ascii('GIF89a')),
  },
  {
    extension: 'webp',
    kind: 'image',
    matches: (bytes) => startsWith(bytes, ascii('RIFF')) && startsWith(bytes, ascii('WEBP'), 8),
  },
];

export function detectFileType(bytes: Uint8Array) {
  const signature = signatures.find((candidate) => candidate.matches(bytes));
  return signature ? { kind: signature.kind, extension: signature.extension } : null;
}

export function safeFileName(fullName: string, extension?: string) {
  const name = fullName.split(/[\\/]/).pop() ?? '';
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ownExtension = dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
  const slug = base
    .replace(/['’]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
  const finalExtension = extension ?? ownExtension.replace(/[^a-z0-9]/g, '');
  return `${slug || 'file'}${finalExtension ? `.${finalExtension}` : ''}`;
}

export function chunkCount(size: number) {
  return Math.max(1, Math.ceil(size / uploadChunkBytes));
}

export const isBlobSha = (value: unknown): value is string =>
  typeof value === 'string' && /^[0-9a-f]{40}$/.test(value);
