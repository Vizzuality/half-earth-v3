import React from 'react';
import cx from 'classnames';
import styles from './spinner-styles.module';

const Spinner = ({ floating = false, spinnerWithOverlay = false, display = true }) => {
  return display ? (
    <>
      {spinnerWithOverlay ? (
        <div className={styles.spinnerWithOverlay}>
          <div className={cx(styles.spinner, {[styles.spinnerAbsolute]: floating})} />
        </div>
      ) : (
        <div className={cx(styles.spinner, {[styles.spinnerAbsolute]: floating})} />
      )}
    </>
  ) : <div></div>;
}

export default Spinner;