import React from 'react';

import loadable from '@loadable/component';

import LandingScene from 'scenes/landing-scene';

import About from 'containers/landing/about';

import HalfEarthLogo from 'components/half-earth-logo';
import LanguageSwitcher from 'components/language-switcher';
import MainMenu from 'components/main-menu';

import { useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module.scss';

const REACT_APP_FEATURE_TRANSLATION = process.env.REACT_APP_FEATURE_TRANSLATION === 'true';

const {
  REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS,
} = process.env;

const InfoModal = loadable(() => import('components/modal-metadata'));

function LandingComponent({
  hasMetadata,
  sceneSettings,
}) {
  const isMobile = useMobile();
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      {REACT_APP_FEATURE_TRANSLATION && <LanguageSwitcher />}
      {FEATURE_NEW_MENUS && !isMobile && (
        <About />
      )}
      {(!FEATURE_NEW_MENUS || isMobile) && (
        <MainMenu />
      )}
      <LandingScene
        sceneSettings={sceneSettings}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default LandingComponent;
