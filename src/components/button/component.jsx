import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

const tooltipStyles = {
  'data-place': 'right',
  'data-effect':'solid',
  'data-delay-show': 0,
}

const Component = ({
  type,
  Icon,
  label,
	className,
  handleClick,
  tooltipText
}) => (
  <button 
    onClick={handleClick}
    data-tip={tooltipText}
    {...tooltipStyles}
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
