// Dependencies
import React, { useState } from 'react';
import loadable from '@loadable/component';
import cx from 'classnames';
// Components
import CountryChallengesChart from 'components/country-challenges-chart';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';
import RankingChart from 'components/ranking-chart';
import NationalReportSidebar from 'containers/sidebars/national-report-sidebar';
import NationalReportCardScene from 'scenes/nrc-scene';
// Constants
import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';
// Styles
import uiStyles from 'styles/ui.module.scss';
import styles from './nrc-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

const NationalReportCard = ({
  countryISO,
  userConfig,
  openedModal,
  countryName,
  hasMetadata,
  activeLayers,
  sceneSettings,
  handleMapLoad,
  isFullscreenActive,
  handleGlobeUpdating,
  localSceneActiveTab,
  countryTooltipDisplayFor,
  countryChallengesSelectedKey,
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) => {
  const [map, setMap] = useState();

  return (
    <>
      <HalfEarthLogo
        className={cx(styles.hideOnPrint, uiStyles.halfEarthLogoTopLeft)}
      />
      <MainMenu
        nBoardingStep={onboardingStep}
        onboardingType={onboardingType}
      />
      <NationalReportSidebar
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        map={map}
        activeLayers={activeLayers}
        className={cx(styles.sidebarContainer, styles.hideOnPrint)}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        localSceneActiveTab={localSceneActiveTab}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
      />
      <NationalReportCardScene
        countryISO={countryISO}
        userConfig={userConfig}
        openedModal={openedModal}
        countryName={countryName}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isFullscreenActive={isFullscreenActive}
        countryTooltipDisplayFor={countryTooltipDisplayFor}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        onMapLoad={(loadedMap) => {
          setMap(loadedMap);
          handleMapLoad(loadedMap, activeLayers);
        }}
        isVisible={localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.OVERVIEW}
      />
      {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.CHALLENGES && (
        <div className={cx(styles.hideOnPrint, styles.challengesViewContainer)}>
          <CountryChallengesChart
            countryISO={countryISO}
            className={styles.challengesChart}
            localSceneActiveTab={localSceneActiveTab}
            countryChallengesSelectedKey={countryChallengesSelectedKey}
          />
        </div>
      )}
      {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.RANKING && (
        <div className={cx(styles.hideOnPrint, styles.challengesViewContainer)}>
          <RankingChart
            countryISO={countryISO}
            className={styles.rankingChart}
            localSceneActiveTab={localSceneActiveTab}
          />
        </div>
      )}
      {hasMetadata && <InfoModal />}
    </>
  );
};

export default NationalReportCard;
