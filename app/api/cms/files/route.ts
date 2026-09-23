import { NextResponse } from 'next/server';

import { branchFor, cmsConfig, collectionFor, isEditablePath } from '@/lib/cms/config';
import { withGitHub } from '@/lib/cms/session';
import { contentDir } from '@/lib/site';
import { source } from '@/lib/source';

export const GET = withGitHub(async (github) => {
  const [paths, drafts] = await Promise.all([
    github.listFiles(cmsConfig.baseBranch),
    github.listBranches(cmsConfig.branchPrefix),
  ]);
  const titles = new Map(
    source.getPages().map((page) => [`${contentDir}/${page.path}`, page.data.title])
  );
  const draftBranches = new Set(drafts);

  const files = paths.filter(isEditablePath).map((path) => ({
    path,
    collection: collectionFor(path)!.id,
    title: titles.get(path) ?? path.slice(path.lastIndexOf('/') + 1).replace(/\.mdx$/, ''),
    hasDraft: draftBranches.has(branchFor(path)),
  }));

  const drafted = new Set(files.map((file) => branchFor(file.path)));
  const newDrafts = drafts.filter((branch) => !drafted.has(branch));

  return NextResponse.json({ files, newDrafts });
});
