import React from 'react';
import cx from 'classnames';
import { getTooltipText } from 'containers/onboarding/onboarding-hooks';
import styles from './onboarding-tooltip-styles.module.scss';

const OnboardingTooltipComponent = ({
  placement = 'left',
  className,
  onboardingType,
  onboardingStep,
  tooltipTop,
  tooltipLeft,
  waitingInteraction,
}) => {
  if (
    !waitingInteraction ||
    typeof onboardingStep !== 'number' ||
    !tooltipTop
  ) {
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
          {getTooltipText(onboardingType, onboardingStep)}
        </div>
      </div>
    </div>
  );
};

export default OnboardingTooltipComponent;
