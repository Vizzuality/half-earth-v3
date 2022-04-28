// Dependencies
import React, { useState } from 'react';
import loadable from '@loadable/component';
// Components
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';
import NationalReportCardLandingScene from 'scenes/nrc-landing-scene';
// Styles
import uiStyles from 'styles/ui.module.scss';
// Dynamic imports
const InfoModal = loadable(() => import('components/modal-metadata'));

const NationalReportCardLanding = ({
  countryISO,
  countryName,
  userConfig,
  openedModal,
  hasMetadata,
  activeLayers,
  sceneSettings,
  handleMapLoad,
  isFullscreenActive,
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) => {
  const [map, setMap] = useState();
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
      />
      <NationalReportCardLandingScene
        map={map}
        countryISO={countryISO}
        countryName={countryName}
        userConfig={userConfig}
        openedModal={openedModal}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isFullscreenActive={isFullscreenActive}
        onMapLoad={(loadedMap) => {
          setMap(loadedMap);
          handleMapLoad(loadedMap, activeLayers)
        }}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
      />

      {hasMetadata && <InfoModal />}
    </>
  );
};

export default NationalReportCardLanding;
