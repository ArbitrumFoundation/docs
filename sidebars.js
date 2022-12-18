// @ts-nocheck
// Docs: https://docusaurus.io/docs/next/sidebar
// Tip: sidebar labels are specified within the frontmatter of individual docs, not here
// Internal style guide: https://www.notion.so/arbitrum/Offchain-Labs-Governance-Docs-Contribution-Style-Guide-ec0ceb060ce54f6abaaef1b0154c574b 

module.exports = {
  sidebar: [
    {
      type: 'doc',
      id: 'gentle-introduction-dao',
    },
    {
      type: 'doc',
      id: 'why-governance',
    },
    {
      type: 'doc',
      id: 'airdrop-eligibility-specs',
    },
    {
      type: 'doc',
      id: 'create-submit-proposals',
    },
    {
      type: 'doc',
      id: 'decentralization-roadmap',
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
          href: 'https://github.com/OffchainLabs/governance/blob/main/docs/overview.md',
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
    }
  ],
};
