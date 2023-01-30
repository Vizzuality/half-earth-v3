import React from 'react';

import cx from 'classnames';

import styles from './styles.module.scss';

function Component({
  title,
  className,
  percentage,

  barAnnotation,

  theme = 'light',
}) {
  let titlePosition = barAnnotation;
  let updatedBarAnnotation = barAnnotation;
  if (barAnnotation < 18) {
    titlePosition = 18;
  } else if (barAnnotation > 82) {
    updatedBarAnnotation = 82;
  }
  return (
    <section
      className={cx(className, styles.container, {
        [styles.dark]: theme === 'dark',
      })}
    >
      <p className={styles.barTitle}>{title}</p>
      <div className={styles.barWrapper}>
        <div className={styles.bar}>
          <div className={styles.value} style={{ width: `${percentage}%` }} />
          {barAnnotation && (
            <div
              className={styles.annotationBar}
              style={{ left: `${updatedBarAnnotation}%` }}
            />
          )}
          <div
            className={styles.annotation}
            style={{ left: `${titlePosition}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default Component;
