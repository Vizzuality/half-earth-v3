
import React from 'react';
import loadable from '@loadable/component';

import LandingScene from 'scenes/landing-scene';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';

import uiStyles from 'styles/ui.module.scss';
// Dynamic imports
const InfoModal = loadable(() => import('components/modal-metadata'));

const LandingComponent = ({
  hasMetadata,
  sceneSettings,
}) => {
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu />
      <LandingScene
        sceneSettings={sceneSettings}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
};

export default LandingComponent;
