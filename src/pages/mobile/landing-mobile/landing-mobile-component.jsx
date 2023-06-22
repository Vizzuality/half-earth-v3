import React from 'react';

import LandingScene from 'scenes/mobile/landing-scene-mobile';

import Logo from 'components/half-earth-logo';
import SideMenuLanguageSwitcher from 'components/sidemenu-language-switcher';

import uiStyles from 'styles/ui.module.scss';

import styles from './landing-mobile-styles.module.scss';

function LandingMobileComponent({ sceneSettings }) {
  return (
    <div className={styles.container}>
      <Logo className={uiStyles.halfEarthLogoTopLeft} />

      <div className={styles.switcherWrapper}>
        <SideMenuLanguageSwitcher />
      </div>

      <LandingScene sceneSettings={sceneSettings} />
    </div>
  );
}

export default LandingMobileComponent;
