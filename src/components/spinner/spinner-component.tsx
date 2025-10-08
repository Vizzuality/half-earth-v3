import cx from 'classnames';

import styles from './spinner-styles.module';

export interface SpinnerProps {
  floating?: boolean;
  spinnerWithOverlay?: boolean;
  initialLoading?: boolean;
  display?: boolean;
}

function Spinner({
  floating = false,
  spinnerWithOverlay = false,
  initialLoading = false,
  display = true,
}: SpinnerProps) {
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
