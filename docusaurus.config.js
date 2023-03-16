// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arbitrum DAO - Governance docs',
  tagline: 'Decentralized governance is cool',
  url: 'https://arbitrum.foundation',
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
            'https://github.com/ArbitrumFoundation/docs/edit/main/docs',
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
      announcementBar: {
        id: "banner",
        content: `ArbitrumDAO has been officially announced. The airdrop won’t be live until March 23rd. Apply to be a delegate <a rel="noopener noreferrer" href="https://forum.arbitrum.foundation/t/delegate-application-template/31">here</a>.`,
        backgroundColor: 'rgb(8 53 117)',
        textColor: 'white',
        isCloseable: false,
      },
    }),
  scripts: [
    // Fathom Analytics
    {
      src: 'https://thirty-thirtyfour.arbitrum.foundation/script.js',
      'data-site': 'QLNDABBR',
      defer: true,
    },
  ],
};

module.exports = config;
