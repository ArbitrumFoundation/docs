import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { HeaderBadges } from '@site/src/components/HeaderBadges';


export default function ContentWrapper(props) {
  return (
    <>
      <HeaderBadges />
      <Content {...props} />
    </>
  );
}
