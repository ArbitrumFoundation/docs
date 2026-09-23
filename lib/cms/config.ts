export const cmsConfig = {
  owner: process.env.CMS_GITHUB_OWNER ?? 'ArbitrumFoundation',
  repo: process.env.CMS_GITHUB_REPO ?? 'docs',
  baseBranch: process.env.CMS_BASE_BRANCH ?? 'main',
  branchPrefix: 'cms/',
  uploadDir: 'public/img/uploads',
  constitutionPath: 'content/partials/_constitution-content-partial.mdx',
  constitutionHashPath: 'lib/constitution-hash.json',
};

export const tokenCookie = 'af_cms_token';
export const stateCookie = 'af_cms_oauth_state';

export type Collection = {
  id: string;
  label: string;
  directory: string;
  recursive: boolean;
  allowCreate: boolean;
};

export const collections: Collection[] = [
  {
    id: 'governance-pages',
    label: 'Governance pages',
    directory: 'content/docs',
    recursive: false,
    allowCreate: true,
  },
  {
    id: 'aligned-entities',
    label: 'Arbitrum aligned entities',
    directory: 'content/docs/(arbitrum-aligned-entities)',
    recursive: false,
    allowCreate: true,
  },
  {
    id: 'governance-architecture',
    label: 'Governance architecture',
    directory: 'content/docs/(governance-architecture)',
    recursive: false,
    allowCreate: true,
  },
  {
    id: 'how-tos',
    label: 'How-to guides',
    directory: 'content/docs/how-tos',
    recursive: false,
    allowCreate: true,
  },
  {
    id: 'concepts',
    label: 'Governance concepts',
    directory: 'content/docs/concepts',
    recursive: false,
    allowCreate: true,
  },
  {
    id: 'bold-economics',
    label: 'BoLD economics guides',
    directory: 'content/docs/arbitrum-bold-economics',
    recursive: false,
    allowCreate: true,
  },
  {
    id: 'foundational-documents',
    label: 'Foundational documents',
    directory: 'content/docs/foundational-documents',
    recursive: false,
    allowCreate: true,
  },
  {
    id: 'partials',
    label: 'Shared content (partials)',
    directory: 'content/partials',
    recursive: false,
    allowCreate: false,
  },
];

export function collectionFor(path: string): Collection | undefined {
  const directory = path.slice(0, path.lastIndexOf('/'));
  return collections.find((collection) => collection.directory === directory);
}

// only mdx files that sit directly inside a known collection directory are editable
export function isEditablePath(path: string): boolean {
  if (path.includes('..') || path.includes('\\') || !path.endsWith('.mdx')) return false;
  return collectionFor(path) !== undefined;
}

export function branchFor(path: string): string {
  const slug = path
    .replace(/\.mdx$/, '')
    .replace(/[()]/g, '')
    .replace(/[^a-zA-Z0-9/_-]+/g, '-')
    .replace(/\//g, '-');
  return `${cmsConfig.branchPrefix}${slug}`;
}
