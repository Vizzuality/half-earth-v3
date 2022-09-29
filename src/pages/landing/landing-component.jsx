import React from 'react';

import loadable from '@loadable/component';

import LandingScene from 'scenes/landing-scene';

import About from 'containers/landing/about';

import HalfEarthLogo from 'components/half-earth-logo';
import LanguageSwitcher from 'components/language-switcher';

import { useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function LandingComponent({ hasMetadata, sceneSettings }) {
  const isMobile = useMobile();
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <LanguageSwitcher />
      {!isMobile && <About />}
      <LandingScene sceneSettings={sceneSettings} />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default LandingComponent;
