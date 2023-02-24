import React, { useState } from 'react';

import { NATIONAL_REPORT_CARD } from 'router';

import loadable from '@loadable/component';

import cx from 'classnames';

import NationalReportCardScene from 'scenes/nrc-scene';

import { useOnboardingOpenSection } from 'containers/onboarding/onboarding-hooks';
import NationalReportSidebar from 'containers/sidebars/national-report-sidebar';

import CountryChallengesChart from 'components/country-challenges-chart';
import HalfEarthLogo from 'components/half-earth-logo';
import RankingChart from 'components/ranking-chart-legacy';

import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';

import uiStyles from 'styles/ui.module.scss';

import styles from './nrc-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function NationalReportCard({
  countryISO,
  chartData,
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
  browsePage,
  changeUI,
  changeGlobe,
}) {
  const [map, setMap] = useState();

  useOnboardingOpenSection({
    onboardingStep,
    onboardingType,
    waitingInteraction,
    browsePage,
    changeUI,
    changeGlobe,
    countryISO,
    locationRoute: NATIONAL_REPORT_CARD,
    localSceneActiveTab,
  });

  const { marine } = chartData;
  const coastal = !!marine;

  return (
    <>
      <HalfEarthLogo
        className={cx(styles.hideOnPrint, uiStyles.halfEarthLogoTopLeft)}
      />
      <NationalReportSidebar
        chartData={chartData}
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
        waitingInteraction={waitingInteraction}
      />
      <NationalReportCardScene
        chartData={chartData}
        countryISO={countryISO}
        openedModal={openedModal}
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
        <div
          className={cx(styles.hideOnPrint, styles.challengesViewContainer, {
            [uiStyles.onboardingMode]: !!onboardingType,
          })}
        >
          <CountryChallengesChart
            coastal={coastal}
            countryISO={countryISO}
            className={styles.challengesChart}
            localSceneActiveTab={localSceneActiveTab}
            countryChallengesSelectedKey={countryChallengesSelectedKey}
          />
        </div>
      )}
      {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.RANKING && (
        <div
          className={cx(styles.hideOnPrint, styles.challengesViewContainer, {
            [uiStyles.onboardingMode]: !!onboardingType,
          })}
        >
          <RankingChart
            coastal={coastal}
            countryISO={countryISO}
            className={styles.rankingChart}
            localSceneActiveTab={localSceneActiveTab}
          />
        </div>
      )}
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default NationalReportCard;
