import React from 'react';
import cx from 'classnames';

import styles from './onboarding-tooltip-styles.module.scss';

const OnboardingTooltipComponent = ({
  placement = 'left',
  tooltipPlacement,
  className,
  onboardingStep,
}) => {
  if (typeof onboardingStep !== 'number') return null;
  return (
    <div
      className={cx(styles.tooltipPlacement, className)}
      style={tooltipPlacement}
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
