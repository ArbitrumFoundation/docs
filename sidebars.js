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
      id: 'state-of-progressive-decentralization',
    },
    {
      type: 'doc',
      id: 'dao-constitution',
    },
    {
      type: 'doc',
      id: 'new-arb-chains',
    },
    {
      type: 'category',
      label: 'How-to guides',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'how-tos/create-submit-dao-proposal',
        },
        {
          type: 'doc',
          id: 'how-tos/resubmit-dao-proposal',
        },
        {
          type: 'doc',
          id: 'how-tos/select-delegate-voting-power',
        },
        {
          type: 'doc',
          id: 'how-tos/apply-become-delegate',
        },
        {
          type: 'doc',
          id: 'how-tos/build-strong-delegate-platform',
        },
        {
          type: 'doc',
          id: 'how-tos/vote-dao-proposals',
        }
      ],
    },
    {
      type: 'category',
      label: 'Governance concepts',
      items: [
        {
          type: 'doc',
          id: 'concepts/arb-token',
        },
        {
          type: 'doc',
          id: 'concepts/arbitrum-dao',
        },
        {
          type: 'doc',
          id: 'concepts/delegate-delegation',
        },
        {
          type: 'doc',
          id: 'concepts/sybil-account',
        },
        {
          type: 'doc',
          id: 'concepts/dao-vote',
        },
        {
          type: 'doc',
          id: 'concepts/security-council',
        },
        {
          type: 'doc',
          id: 'concepts/lifecycle-anatomy-aip-proposal',
        },
        {
          type: 'doc',
          id: 'concepts/public-preview-content',
        }
      ],
    },
    {
      type: 'category',
      label: 'Governance architecture',
      items: [
        {
          type: 'link',
          label: 'Sybil detection',
          href: 'https://github.com/OffchainLabs/arb-sybil/tree/master/v2',
        },
        {
          type: 'link',
          label: 'Smart contract architecture',
          href: 'https://github.com/OffchainLabs/governance/blob/main/docs/overview.md',
        },
        {
          type: 'doc',
          id: 'deployment-addresses'
        }
      ],
    },
    {
      type: 'doc',
      id: 'dao-comprehension-check',
    },
    {
      type: 'doc',
      id: 'dao-glossary',
    }
  ],
};
