import loadable from '@loadable/component';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';
import React from 'react';
import NationalReportCardLandingScene from 'scenes/nrc-landing-scene';
import uiStyles from 'styles/ui.module.scss';



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
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu />
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