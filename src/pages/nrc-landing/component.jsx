import React, { useState } from 'react';

import loadable from '@loadable/component';

import NationalReportCardLandingScene from 'scenes/nrc-landing-scene';

import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

const {
  REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS,
} = process.env;

function NationalReportCardLanding({
  countryISO,
  countryName,
  openedModal,
  hasMetadata,
  activeLayers,
  sceneSettings,
  handleMapLoad,
  isFullscreenActive,
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) {
  const [map, setMap] = useState();
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />

      {!FEATURE_NEW_MENUS && (
        <MainMenu
          onboardingStep={onboardingStep}
          onboardingType={onboardingType}
        />
      )}

      <NationalReportCardLandingScene
        map={map}
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isFullscreenActive={isFullscreenActive}
        onMapLoad={(loadedMap) => {
          setMap(loadedMap);
          handleMapLoad(loadedMap, activeLayers);
        }}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
      />

      {hasMetadata && <InfoModal />}
    </>
  );
}

export default NationalReportCardLanding;
