import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

export const HeaderBadges = ({
  commaDelimitedContributors,
  lastVerifiedDateString,
  lastVerifiedVersionString,
}) => {
  let githubUsernames = {
    Mick: 'mick-prysm',
    Raul: 'rauljordan',
    Terence: 'terencechain',
    James: 'james-prysm',
    Kasey: 'kasey',
    Potuz: 'potuz',
    Nishant: 'nisdas',
  };

  let buildAuthorBadge = function (authorNickname) {
    if (authorNickname != 'Clarin') {
      return (
        <a
          className="header-badge"
          href={`https://github.com/${githubUsernames[authorNickname]}`}
        >
          <span
            className="badge-avatar"
            style={{
              backgroundImage:
                "url('https://avatars.githubusercontent.com/" +
                githubUsernames[authorNickname] +
                "')",
            }}
          ></span>
          <span className="badge-label">{authorNickname}</span>
        </a>
      );
    } else {
      return (
        <a
          className="header-badge"
          href="https://www.linkedin.com/in/clarin-dy-239b5616a/"
        >
          <span
            className="badge-avatar"
            style={{
              backgroundImage: "url('https://i.imgur.com/vhht8qs.jpg')",
            }}
          ></span>
          <span className="badge-label">{authorNickname}</span>
        </a>
      );
    }
  };

  let buildLastVerifiedBadge = function (dateString) {
    if (dateString != null) {
      return (
        <a className="header-badge">
          <span className="badge-avatar emoji-avatar">✔️</span> 
          <span className="badge-label">
            Last verified on <strong>{dateString}</strong>
          </span>
        </a>
      );
    }
  };

  return (
    <BrowserOnly>
      {() => (
        <div className="header-badges">
          {commaDelimitedContributors != null
            ? commaDelimitedContributors.split(',').map(buildAuthorBadge)
            : null}
          {buildLastVerifiedBadge(
            lastVerifiedDateString,
            lastVerifiedVersionString
          )}
          <a className="header-badge" href={`https://github.com/CoolChainCo/docs/issues/new?title=Docs update request: ${new URL(window.location.href).pathname}&body=Source: ${window.location.href}%0A%0ARequest: (how can we help?)`}>
            <span className="badge-avatar emoji-avatar">✏️</span>
            <span className="badge-label">Request an update</span>
          </a>
        </div>
      )}
    </BrowserOnly>
  );
};
