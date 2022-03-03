import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import { ReactComponent as VolumeControl } from 'icons/volume-control.svg';


const Component = ({
  className,
  title,
  number,
  gif,
  description,
  handleClick,
}) => (
  <button
    onClick={handleClick}
    className={cx(className, styles.container)}
  >
    <div className={styles.numberContainer}>
      <p className={styles.number}>{number}.</p>
      <img className={styles.gif} src={gif} alt={title} />
    </div>

    <div className={styles.content}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>

    <div className={styles.volumeContainer}>
      <p>4-7 min</p>
      <VolumeControl className={styles.volumeIcon} />
    </div>

  </button>
);

export default Component;
