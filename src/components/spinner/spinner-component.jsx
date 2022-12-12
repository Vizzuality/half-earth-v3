import React from 'react';

import cx from 'classnames';

import styles from './spinner-styles.module';

function Spinner({
  floating = false,
  spinnerWithOverlay = false,
  initialLoading = false,
  display = true,
}) {
  if (!display) return <div />;
  return spinnerWithOverlay ? (
    <div className={styles.spinnerWithOverlay}>
      <div
        className={cx(styles.spinner, {
          [styles.spinnerAbsolute]: floating,
          [styles.initialLoading]: initialLoading,
        })}
      />
    </div>
  ) : (
    <div
      className={cx(styles.spinner, {
        [styles.spinnerAbsolute]: floating,
        [styles.initialLoading]: initialLoading,
      })}
    />
  );
}

export default Spinner;
