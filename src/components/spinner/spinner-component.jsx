import React from 'react';
import cx from 'classnames';
import styles from './spinner-styles.module';

const Spinner = ({ floating = false }) => {
  return (
    <div className={cx(styles.spinner, {[styles.spinnerAbsolute]: floating})} />
  );
}

export default Spinner;