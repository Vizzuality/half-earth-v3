import React from 'react';
import cx from 'classnames';
import styles from './spinner-styles.module';

const Spinner = ({ className }) => {
  return (
    <div className={cx(styles.spinner, className)} />
  );
}

export default Spinner;