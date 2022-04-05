import React from 'react';
import cx from 'classnames';

import styles from './onboarding-tooltip-styles.module.scss';

const OnboardingTooltipComponent = ({
  placement = 'left',
  className,
  onboardingStep,
  tooltipTop,
  tooltipLeft,
}) => {
  if (typeof onboardingStep !== 'number' || !tooltipTop) {
    return null;
  }
  return (
    <div
      className={cx(styles.tooltipPlacement, className)}
      style={{ top: tooltipTop, left: tooltipLeft }}
    >
      <div
        className={cx({
          [styles.tooltipContainer]: true,
          [styles.tooltipContainerReverse]: placement === 'right',
        })}
      >
        <div
          className={cx({
            [styles.arrow]: true,
            [styles.arrowLeft]: placement === 'left',
            [styles.arrowRight]: placement === 'right',
          })}
        />
        <div id="onboarding" className={styles.tooltip}>
          Click here to continue.
        </div>
      </div>
    </div>
  );
};

export default OnboardingTooltipComponent;
