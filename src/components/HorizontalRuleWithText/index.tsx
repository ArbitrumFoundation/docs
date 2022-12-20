import React from 'react';
import styles from './styles.module.css';

export default function HorizontalRuleWithText({ children }) {
  return (
    <div className={styles['horizontal-rule']}>
      <span>{children}</span>
    </div>
  );
}
