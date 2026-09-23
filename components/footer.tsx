import Link from 'next/link';

const columns = [
  {
    title: 'Docs',
    links: [{ label: 'Get started', href: '/gentle-intro-dao-governance' }],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: 'https://discord.gg/arbitrum' },
      { label: 'Twitter', href: 'https://twitter.com/arbitrum' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-columns">
        {columns.map((column) => (
          <div key={column.title}>
            <p className="site-footer-title">{column.title}</p>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="site-footer-copyright">
        Copyright © {new Date().getFullYear()} Arbitrum Foundation.
      </p>
    </footer>
  );
}
