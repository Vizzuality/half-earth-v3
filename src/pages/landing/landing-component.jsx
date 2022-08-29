import React from 'react';

import loadable from '@loadable/component';

import LandingScene from 'scenes/landing-scene';

import HalfEarthLogo from 'components/half-earth-logo';
import LanguageSwitcher from 'components/language-switcher';

import uiStyles from 'styles/ui.module.scss';

const REACT_APP_FEATURE_TRANSLATION = process.env.REACT_APP_FEATURE_TRANSLATION === 'true';

const InfoModal = loadable(() => import('components/modal-metadata'));

function LandingComponent({
  hasMetadata,
  sceneSettings,
}) {
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      {REACT_APP_FEATURE_TRANSLATION && <LanguageSwitcher />}
      <LandingScene
        sceneSettings={sceneSettings}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default LandingComponent;
