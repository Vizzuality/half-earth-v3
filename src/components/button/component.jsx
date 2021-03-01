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
		className={cx(styles.container, className, { [styles.rounded]: type === 'rounded'})}
  >
    {Icon && <Icon className={styles.icon}/>}
    {label && <span>{label}</span>}
  </button>
)

export default Component;