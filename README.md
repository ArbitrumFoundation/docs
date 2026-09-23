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

- Link to other pages with root relative URLs, for example `[the constitution](/dao-constitution#section-1-chain-ownership-)`.
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

`pnpm build` runs `check-links`, which fails on broken internal links and heading anchors, and `verify-quicklooks`, which fails when a `data-quicklook-from` key is missing from `public/glossary.json`.

## Docs editor

`/admin` opens a visual MDX editor powered by [Fumadocs Editor](https://editor.fumadocs.dev). Editors sign in with GitHub, and each saved page is committed to a `cms/<page>` branch with a pull request against `main` for review. Saving the constitution partial also updates `lib/constitution-hash.json` on the same branch.

The editor needs a GitHub OAuth app whose callback URL is `<deployment-url>/api/callback`. See `.env.example` for the environment variables.

## Constitution hash

`pnpm update-constitution-hash` recomputes `lib/constitution-hash.json` from `content/partials/_constitution-content-partial.mdx`.
