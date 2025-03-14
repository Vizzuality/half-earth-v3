import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import InfoIcon from 'icons/infoDark.svg?react';

import styles from './indicator-card-styles.module.scss';

function IndicatorCard({
  color,
  indicator,
  description,
  tooltipInfo,
  children,
  className,
}) {
  return (
    <div className={cx(styles.container, className)}>
      <p className={styles.indicator} style={{ color }}>
        {indicator}
      </p>
      <div className={styles.description}>{description}</div>
      <div className={styles.children}>{children}</div>
      {tooltipInfo && (
        <span className={styles.iconWrapper}>
          <Tooltip
            content={<div className={styles.tooltip}>{tooltipInfo}</div>}
            >
            <span className={styles.icon}><InfoIcon /></span>
          </Tooltip>
        </span>
      )}
    </div>
  );
}

export default IndicatorCard;
