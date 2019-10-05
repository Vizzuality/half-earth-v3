import React from 'react';
import cx from 'classnames';
import styles from './spinner-styles.module';

const Spinner = ({ floating = false, spinnerWithOverlay = false, initialLoading = false, display = true }) => {
  return display ? (
    <>
      {spinnerWithOverlay ? (
        <div className={styles.spinnerWithOverlay}>
          <div className={cx(styles.spinner, {[styles.spinnerAbsolute]: floating, [styles.initialLoading]: initialLoading })} />
        </div>
      ) : (
        <div className={cx(styles.spinner, {[styles.spinnerAbsolute]: floating, [styles.initialLoading]: initialLoading })} />
      )}
    </>
  ) : <div></div>;
}

export default Spinner;