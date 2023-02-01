import React from 'react';

import { percentageFormat } from 'utils/data-formatting-utils';

import cx from 'classnames';

import styles from './styles.module.scss';

function Component({
  title,
  className,
  percentage,
  percentageLabel,
  barAnnotation,
  barAnnotationTitle,
  scale = 'global',
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
        [styles.globalRange]: scale === 'global',
        [styles.localRange]: scale === 'local',
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
          {barAnnotationTitle && (
            <p
              className={styles.annotationTitle}
              style={{ left: `${titlePosition}%` }}
            >
              {barAnnotationTitle}
            </p>
          )}
        </div>
        <span className={styles.percentage}>
          {percentageLabel || `~${percentageFormat(percentage)}%`}
        </span>
      </div>
    </section>
  );
}

export default Component;
