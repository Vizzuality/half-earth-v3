import React from 'react';

import { T } from '@transifex/react';

import { ReactComponent as WarningIcon } from 'icons/warning.svg';

import styles from './onboarding-disclaimer-styles.module.scss';

function OnboardingDisclaimer() {
  return (
    <div className={styles.disclaimerContainer}>
      <p className={styles.disclaimer}>
        <WarningIcon className={styles.icon} />
        <span className={styles.text}>
          <T _str="During the onboarding process, some features may not be working" />
        </span>
      </p>
    </div>
  );
}

export default OnboardingDisclaimer;
