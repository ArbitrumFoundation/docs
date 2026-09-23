# Arbitrum DAO governance docs

Source for [docs.arbitrum.foundation](https://docs.arbitrum.foundation), built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Requirements

- Node.js 22 or later
- pnpm 10

## Local development

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000.

## Project layout

| Path                        | Contents                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content/docs`              | Pages. The file path is the URL, and folders in parentheses such as `(governance-architecture)` group pages in the sidebar without changing their URL. |
| `content/docs/**/meta.json` | Sidebar titles and ordering.                                                                                                                           |
| `content/partials`          | Shared content spliced into pages with `<include cwd>content/partials/_name.mdx</include>`.                                                            |
| `components/mdx.tsx`        | Components available in every page without an import.                                                                                                  |
| `public`                    | Static files, including the PDFs under `public/assets`.                                                                                                |
| `app/admin`                 | The browser based docs editor.                                                                                                                         |
| `notion-docs`               | Generator for the glossary and FAQ partials from Notion.                                                                                               |

## Writing content

- Link to other pages with root relative URLs, for example `[the constitution](/dao-constitution#section-1-chain-ownership-)`, or with a relative path to the mdx file.
- Link to a glossary term with `[term](/dao-glossary#term-id)`. Every glossary link shows the definition as a tooltip.
- Set a stable heading anchor with `## Heading [#anchor-id]`.
- Use `<Callout type="info" title="Title">` for notes and warnings.
- Wrap math in double dollar signs, for example `$$x^2$$`. Single dollar signs are plain text so `$ARB` is never parsed as math.

## Checks

```bash
pnpm lint
pnpm format:check
pnpm types:check
pnpm test
pnpm build
```

`pnpm build` runs `check-links`, which fails on broken internal links and heading anchors, and `verify-quicklooks`, which fails when a glossary link points at a term missing from `public/glossary.json`. `check-links` also fails when two files resolve to the same URL.

## Docs editor

`/admin` opens a visual MDX editor powered by [Fumadocs Editor](https://editor.fumadocs.dev). Editors sign in with GitHub, and each saved page is committed to a `cms/<page>` branch with a pull request against `main` for review.

- Page details (title, sidebar label, description, author, expert) are form fields. Only changed lines are rewritten.
- Every save is checked on the server (`lib/cms/validate.ts`): mdx syntax, blocks the site cannot render, links and anchors, shared content paths, a heading 1 in the body and duplicate web addresses. Nothing is committed until the page passes.
- Images and PDFs upload from the browser straight to the draft branch, so files up to 70 MB work despite the serverless request limit.
- When Vercel builds the draft branch, the editor shows a preview link.
- Saving the constitution partial also updates `lib/constitution-hash.json` on the same branch.

The editor needs a GitHub OAuth app whose callback URL is `<deployment-url>/api/callback`. See `.env.example` for the environment variables. For local work without OAuth, set `CMS_DEV_GITHUB_TOKEN` in `.env.local`; it is ignored in production.

## Constitution hash

`pnpm update-constitution-hash` recomputes `lib/constitution-hash.json` from `content/partials/_constitution-content-partial.mdx`.
