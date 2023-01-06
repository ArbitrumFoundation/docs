// @ts-nocheck
// Docs: https://docusaurus.io/docs/next/sidebar
// Tip: sidebar labels are specified within the frontmatter of individual docs, not here
// Internal style guide: https://www.notion.so/arbitrum/Offchain-Labs-Governance-Docs-Contribution-Style-Guide-ec0ceb060ce54f6abaaef1b0154c574b

module.exports = {
  sidebar: [
    {
      type: 'doc',
      id: 'gentle-intro-dao-governance',
    },
    {
      type: 'doc',
      id: 'why-governance',
    },
    {
      type: 'doc',
      id: 'airdrop-eligibility-distribution',
    },
    {
      type: 'doc',
      id: 'decentralization-roadmap',
    },
    {
      type: 'category',
      label: 'How-to guides',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'create-submit-dao-proposal',
        },
        {
          type: 'link',
          label: 'Resubmit a DAO proposal',
          href: '#todo:qqq',
        },
        {
          type: 'link',
          label: 'Select a delegate',
          href: '#todo:qqq',
        },
        {
          type: 'link',
          label: 'Become a delegate',
          href: '#todo:qqq',
        },
        {
          type: 'link',
          label: 'Vote on proposals',
          href: '#todo:qqq',
        },
      ],
    },
    {
      type: 'category',
      label: 'Governance architecture',
      items: [
        {
          type: 'doc',
          id: 'dao-constitution',
        },
        {
          type: 'link',
          label: 'Smart contract architecture',
          href: 'https://github.com/OffchainLabs/governance/blob/main/docs/overview.md',
        },
        {
          type: 'link',
          label: 'Sybil detection',
          href: '#todo:qqq',
        },
      ],
    },
    {
      type: 'doc',
      id: 'dao-glossary',
    },
    {
      type: 'doc',
      id: 'dao-faq',
    },
  ],
};
