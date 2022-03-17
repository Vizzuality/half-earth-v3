// Dependencies
import React from 'react';
import cx from 'classnames';
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
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu
        className={cx({
          [uiStyles.pointerBlocked]: waitingInteraction,
        })}
        waitingInteraction={waitingInteraction}
      />
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