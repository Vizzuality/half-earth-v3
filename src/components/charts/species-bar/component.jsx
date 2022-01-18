import React from 'react';
import cx from 'classnames';
import { percentageFormat } from 'utils/data-formatting-utils';
import styles from './styles.module.scss';

const Component = ({
  title,
  className,
  percentage,
  percentageLabel,
  barAnnotation,
  barAnnotationTitle,
  scale = 'global'
}) => {
  let titlePosition = barAnnotation;
  if (barAnnotation < 18) {
    titlePosition = 18;
  } else if (barAnnotation > 82) {
    barAnnotation = 82;
  }
  return (
    <section className={cx(
      className,
      styles.container,
      {
        [styles.globalRange]: scale === 'global',
        [styles.localRange]: scale === 'local',
      })}>
      <p className={styles.barTitle}>{title}</p>
      <div className={styles.barWrapper}>
        <div className={styles.bar}>
          <div className={styles.value} style={{ width: `${percentage}%` }} />
          {barAnnotation && <div className={styles.annotationBar} style={{ left: `${barAnnotation}%` }} />}
          {barAnnotationTitle && <p className={styles.annotationTitle} style={{ left: `${titlePosition}%` }}>{barAnnotationTitle}</p>}
        </div>
        <span className={styles.percentage}>{percentageLabel ? percentageLabel : `~${percentageFormat(percentage)}%`}</span>
      </div>
    </section>
  );
}

export default Component;
