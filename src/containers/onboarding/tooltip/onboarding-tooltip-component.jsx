import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import styles from './onboarding-tooltip-styles.module.scss';

function OnboardingTooltipComponent({
  placement = 'left',
  className,
  onboardingType,
  onboardingStep,
  tooltipTop,
  tooltipLeft,
  waitingInteraction,
}) {
  const t = useT();
  const getTooltipText = (_onboardingType, _onboardingStep) => (_onboardingType === 'national-report-cards' && _onboardingStep === 1
    ? t('Type here to continue')
    : t('Click here to continue.'));

  if (
    !waitingInteraction
    || typeof onboardingStep !== 'number'
    || !tooltipTop
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
}

export default OnboardingTooltipComponent;
