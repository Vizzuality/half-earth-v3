import React from 'react';
import cx from 'classnames';
import styles from './spinner-styles.module';

const Spinner = ({ floating = false, spinnerWithOverlay = false }) => {
  const spinnerElement = <div className={cx(styles.spinner, {[styles.spinnerAbsolute]: floating})} />;

  return (
    <>
      {spinnerWithOverlay ? (
        <div className={styles.spinnerWithOverlay}>
          {spinnerElement}
        </div>
      ) : (
        {spinnerElement}
      )}
    </>
  );
}

export default Spinner;