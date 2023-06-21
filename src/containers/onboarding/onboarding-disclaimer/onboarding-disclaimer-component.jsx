import React from 'react';

import { T } from '@transifex/react';

import styles from './onboarding-disclaimer-styles.module.scss';

function OnboardingDisclaimer() {
  return (
    <div className={styles.disclaimerContainer}>
      <p className={styles.disclaimer}>
        <T _str="During the onboarding process, certain features of the platform may not be accessible" />
      </p>
    </div>
  );
}

export default OnboardingDisclaimer;
