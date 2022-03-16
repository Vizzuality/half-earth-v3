
import React from 'react';

import styles from './tooltip-styles.module.scss';

const TooltipComponent = () => {
  return (
    <div className={styles.tooltipContainer}>
      <div className={styles.arrowLeft} />
      <div id='onboarding' className={styles.tooltip}>
        Click here to continue.
      </div>
    </div>
  );
};

export default TooltipComponent;
