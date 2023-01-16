import React from 'react';

import loadable from '@loadable/component';

import LandingScene from 'scenes/mobile/landing-scene-mobile';

import HalfEarthLogo from 'components/half-earth-logo';
import SideMenuLanguageSwitcher from 'components/sidemenu-language-switcher';

import uiStyles from 'styles/ui.module.scss';

import styles from './landing-mobile-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function LandingMobileComponent({ hasMetadata, sceneSettings }) {
  return (
    <div className={styles.container}>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />

      <div className={styles.switcherWrapper}>
        <SideMenuLanguageSwitcher />
      </div>

      <LandingScene sceneSettings={sceneSettings} />
      {hasMetadata && <InfoModal />}
    </div>
  );
}

export default LandingMobileComponent;
