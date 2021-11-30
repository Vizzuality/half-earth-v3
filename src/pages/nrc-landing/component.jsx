import React from 'react';
import loadable from '@loadable/component'
import NationalReportCardLandingScene from 'scenes/nrc-landing-scene';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';

import uiStyles from 'styles/ui.module.scss';
const InfoModal = loadable(() => import('components/modal-metadata'));

const NationalReportCardLanding = ({
  countryISO,
  userConfig,
  openedModal,
  hasMetadata,
  activeLayers,
  sceneSettings,
  handleMapLoad,
  isFullscreenActive,
}) => (
  <>
  <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft}/> 
  <MainMenu />
  <NationalReportCardLandingScene
    countryISO={countryISO}
    userConfig={userConfig}
    openedModal={openedModal}
    activeLayers={activeLayers}
    sceneSettings={sceneSettings}
    isFullscreenActive={isFullscreenActive}
    onMapLoad={(map) => handleMapLoad(map, activeLayers)}
  />
  {hasMetadata && <InfoModal />}
</>
)

export default NationalReportCardLanding;