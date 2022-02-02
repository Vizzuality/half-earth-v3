import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

const Component = ({
  type,
  Icon,
  label,
  active,
  className,
  handleClick,
  tooltipText,
}) => (
  <button
    onClick={handleClick}
    title={tooltipText}
    className={cx(className, {
      [styles.rectangular]: type === 'rectangular',
      [styles.iconSquare]: type === 'icon-square',
      [styles.rounded]: type === 'rounded',
      [styles.compound]: type === 'compound',
      [styles.square]: type === 'square',
      [styles.active]: active,
    })}
  >
    {Icon && <Icon className={styles.icon} />}
    {label && <span className={styles.label}>{label}</span>}
  </button>
);

export default Component;
