// Dependencies
import React from 'react';
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
  onBoardingType,
  onBoardingStep,
  waitingInteraction,
}) => {
  console.log({ onBoardingType, onBoardingStep, waitingInteraction })
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu onBoardingStep={onBoardingStep} onBoardingType={onBoardingType} />
      <NationalReportCardLandingScene
        countryISO={countryISO}
        countryName={countryName}
        userConfig={userConfig}
        openedModal={openedModal}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isFullscreenActive={isFullscreenActive}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        onBoardingType={onBoardingType}
        onBoardingStep={onBoardingStep}
        waitingInteraction={waitingInteraction}
      />

      {hasMetadata && <InfoModal />}
    </>
  )
};

export default NationalReportCardLanding;