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
          class="header-badge"
          href={`https://github.com/${githubUsernames[authorNickname]}`}
        >
          <span
            class="badge-avatar"
            style={{
              backgroundImage:
                "url('https://avatars.githubusercontent.com/" +
                githubUsernames[authorNickname] +
                "')",
            }}
          ></span>
          <span class="badge-label">{authorNickname}</span>
        </a>
      );
    } else {
      return (
        <a
          class="header-badge"
          href="https://www.linkedin.com/in/clarin-dy-239b5616a/"
        >
          <span
            class="badge-avatar"
            style={{
              backgroundImage: "url('https://i.imgur.com/vhht8qs.jpg')",
            }}
          ></span>
          <span class="badge-label">{authorNickname}</span>
        </a>
      );
    }
  };

  let buildLastVerifiedBadge = function (dateString) {
    if (dateString != null) {
      return (
        <a class="header-badge">
          <span class="badge-avatar emoji-avatar">✔️</span>
          <span class="badge-label">
            Last verified on <strong>{dateString}</strong>
          </span>
        </a>
      );
    }
  };

  return (
    <BrowserOnly>
      {() => (
        <div class="header-badges">
          {commaDelimitedContributors != null
            ? commaDelimitedContributors.split(',').map(buildAuthorBadge)
            : null}
          {buildLastVerifiedBadge(
            lastVerifiedDateString,
            lastVerifiedVersionString
          )}
          <a
            class="header-badge"
            href={`https://github.com/CoolChainCo/docs/issues/new?title=Docs update request: ${
              new URL(window.location.href).pathname
            }&body=Source: ${
              window.location.href
            }%0A%0ARequest: (how can we help?)`}
          >
            <span class="badge-avatar emoji-avatar">✏️</span>
            <span class="badge-label">Request an update</span>
          </a>
        </div>
      )}
    </BrowserOnly>
  );
};
