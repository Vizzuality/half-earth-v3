import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

const Component = ({
  type,
  Icon,
  label,
	className,
  handleClick,
}) => (
  <button 
    onClick={handleClick}
		className={cx(
      className,
      {
        [styles.rounded]: type === 'rounded',
        [styles.compound]: type === 'compound',
      }
    )}
  >
    {Icon && <Icon className={styles.icon}/>}
    {label && <span className={styles.label}>{label}</span>}
  </button>
)

export default Component;
