// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arbitrum DAO - Governance docs',
  tagline: 'Dinosaurs are cool', // todo:qqq
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico', // todo:qqq

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name. // todo:qqq
  projectName: 'docusaurus', // Usually your repo name. // todo:qqq

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // q: why is it configured this way?
          // a: we originally tried to use "docs only mode" by setting the `routeBasePath` to `/`, but this prevents the landing page from displaying the`/gentle-intro-dao-governance` slug, which is important for SEO.
          //    this doc elaborates: https://docusaurus.io/docs/docs-introduction#docs-only-mode
          //    todo:qqq...
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', // todo:qqq
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
          alt: 'My Site Logo', // todo:qqq
          src: 'img/logo.svg',
          href: '/gentle-intro-dao-governance',
        },
        items: [
          {
            href: 'https://github.com/facebook/docusaurus', // todo:qqq
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
                label: 'Stack Overflow',
                href: 'https://ethereum.stackexchange.com/questions/tagged/arbitrum',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/arbitrum',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/arbitrum',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/arbitrum',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/arbitrum',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus', // todo:qqq
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Arbitrum Foundation.`, // todo:qqq: verify
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
