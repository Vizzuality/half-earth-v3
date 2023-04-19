import React from 'react';

import Tooltip from '@tippyjs/react';

import styles from './styles.module.scss';

function TitleTooltipComponent({ children, content }) {
  return (
    <Tooltip
      className="light"
      content={<div className={styles.tooltip}>{content}</div>}
    >
      {children}
    </Tooltip>
  );
}

export default TitleTooltipComponent;
