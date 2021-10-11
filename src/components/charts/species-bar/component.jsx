import React from 'react';
import cx from 'classnames';
import { percentageFormat } from 'utils/data-formatting-utils';
import styles from './styles.module.scss';

const Component = ({
  title, 
  className,
  percentage,
  barAnnotation,
  barAnnotationTitle,
  scale = 'global'
}) => (
  <section className={cx(
    className,
    styles.container,
    {[styles.globalRange]: scale === 'global',
    [styles.localRange]: scale === 'local',
  })}>
    <p className={styles.barTitle}>{title}</p>
    <div className={styles.barWrapper}>
      <div className={styles.bar}>
        <div className={styles.value} style={{width: `${percentage}%`}}/>
        {barAnnotation && <div className={styles.annotationBar} style={{left: `${barAnnotation}%`}}/>}
        {barAnnotationTitle && <p className={styles.annotationTitle} style={{left: `${barAnnotation}%`}}>{barAnnotationTitle}</p>}
      </div>
      <span className={styles.percentage}>{`${percentageFormat(percentage)}%`}</span>
    </div>
  </section>
)

export default Component;