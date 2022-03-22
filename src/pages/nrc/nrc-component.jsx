import loadable from '@loadable/component';
import cx from 'classnames';
import CountryChallengesChart from 'components/country-challenges-chart';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';
import RankingChart from 'components/ranking-chart';
import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';
import NationalReportSidebar from 'containers/sidebars/national-report-sidebar';
import React, { useState } from 'react';
import NationalReportCardScene from 'scenes/nrc-scene';
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
  onBoardingType,
  onBoardingStep,
  waitingInteraction,
}) => {
  const [map, setMap] = useState();
  return (
    <>
      <HalfEarthLogo
        className={cx(styles.hideOnPrint, uiStyles.halfEarthLogoTopLeft)}
      />
      <MainMenu onBoardingStep={onBoardingStep} />
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
        onBoardingType={onBoardingType}
        onBoardingStep={onBoardingStep}
        waitingInteraction={waitingInteraction}
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
