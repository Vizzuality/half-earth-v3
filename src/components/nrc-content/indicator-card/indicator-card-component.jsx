import React from 'react';

import Tooltip from '@tippyjs/react';

import { ReactComponent as InfoIcon } from 'icons/infoDark.svg';

import styles from './indicator-card-styles.module.scss';

function IndicatorCard({
  color,
  indicator,
  description,
  tooltipInfo,
  children,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.indicator} style={{ color }}>
        {indicator}
      </p>
      <div className={styles.description}>{description}</div>
      <div className={styles.children}>{children}</div>
      <span className={styles.iconWrapper}>
        <Tooltip
          content={<div className={styles.tooltip}>{tooltipInfo}</div>}
          delay={100}
          placement="top"
        >
          <InfoIcon className={styles.icon} />
        </Tooltip>
      </span>
    </div>
  );
}

export default IndicatorCard;
