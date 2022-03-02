import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

const Component = ({
  className,
  title,
  description,
  handleClick,
}) => (
  <button
    onClick={handleClick}
    className={cx(className, styles.container)}
  >
    <div className={styles.numberContainer}>
      <p>01.</p>
    </div>
    <div className={styles.content}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  </button>
);

export default Component;
