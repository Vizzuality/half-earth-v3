
import React from 'react';
import cx from 'classnames';

import styles from './tooltip-styles.module.scss';

const TooltipComponent = ({ placement = 'left' }) => {
  return (
    <div className={cx({
      [styles.tooltipContainer]: true,
      [styles.tooltipContainerReverse]: placement === 'right',
    })}>
      <div className={cx({
        [styles.arrow]: true,
        [styles.arrowLeft]: placement === 'left',
        [styles.arrowRight]: placement === 'right',
      })}
      />
      <div id='onboarding' className={styles.tooltip}>
        Click here to continue.
      </div>
    </div>
  );
};

export default TooltipComponent;
