import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

const LegendGradient = ({legendItem, className}) => {
  
  return (
    <div className={cx(className, styles.container)}>
      <div className={cx(styles.gradient, styles[legendItem])}/>
      <div className={styles.valuesWrapper}>
        <span>low</span>
        <span>high</span>
      </div>
    </div>
  )
} 

export default LegendGradient;