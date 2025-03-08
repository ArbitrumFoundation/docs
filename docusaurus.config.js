// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// for LaTeX support
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arbitrum DAO - Governance docs',
  tagline: 'Decentralized governance is cool',
  url: 'https://docs.arbitrum.foundation',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  markdown: {
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: ["docusaurus-plugin-less", [require.resolve('docusaurus-lunr-search'), {
    indexBaseUrl: true
  }]],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // q: why is it configured this way?
          // a: we originally tried to use "docs only mode" by setting the `routeBasePath` to `/`, but this prevents the landing page from displaying the`/gentle-intro-dao-governance` slug, which is important for SEO.
          //    this doc elaborates: https://docusaurus.io/docs/docs-introduction#docs-only-mode
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ArbitrumFoundation/docs/edit/main/',
          remarkPlugins : [math],
          rehypePlugins : [katex],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.less'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Arbitrum DAO - Governance docs',
        logo: {
          alt: 'Arbitrum DAO',
          src: 'img/logo.svg',
          href: '/gentle-intro-dao-governance',
        },
        items: [
          {
            href: 'https://github.com/ArbitrumFoundation/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get started',
                to: '/gentle-intro-dao-governance',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/arbitrum',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/arbitrum',
              },
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Arbitrum Foundation.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // announcementBar: {
      //   id: "banner",
      //   content: `Arbitrum DAO has been officially announced, and the $ARB airdrop is live. <a rel="noopener noreferrer" href='https://arbitrum.foundation/'>Claim your $ARB</a>.`,
      //   backgroundColor: 'rgb(8 53 117)',
      //   textColor: 'white',
      //   isCloseable: false,
      // },
    }),
    
    // also needed for math stuff.
    // see https://docusaurus.io/docs/2.x/markdown-features/math-equations
    stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  scripts: [
    // Fathom Analytics
    {
      src: 'https://cdn.usefathom.com/script.js',
      'data-site': 'QLNDABBR',
      defer: true,
    },
  ],
};

module.exports = config;
