import React from 'react';
import cx from 'classnames';
import loadable from '@loadable/component'

import Legend from 'components/legend';
import About from 'components/about';
import RankingChart from 'components/ranking-chart';
import UserDataModal from 'components/user-data-modal';
import NationalReportCardScene from 'scenes/nrc-scene';
import HalfEarthLogo from 'components/half-earth-logo';
import LocalSceneSidebar from 'components/local-scene-sidebar';
import CountryChallengesChart from 'components/country-challenges-chart';

import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';
import { useMobile } from 'constants/responsive';
import styles from './nrc-styles.module.scss';
import uiStyles from 'styles/ui.module.scss';
const InfoModal = loadable(() => import('components/modal-metadata'));

const NationalReportCard = ({
  countryISO,
  userConfig,
  openedModal,
  hasMetadata,
  activeLayers,
  sceneSettings,
  handleMapLoad,
  isFullscreenActive,
  handleGlobeUpdating,
  localSceneActiveTab,
  countryChallengesSelectedKey,
}) => (
  <>
    <HalfEarthLogo className={cx(styles.hideOnPrint,uiStyles.halfEarthLogoTopLeft)}/> 
    <LocalSceneSidebar
      countryISO={countryISO}
      openedModal={openedModal}
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
      activeLayers={activeLayers}
      sceneSettings={sceneSettings}
      isFullscreenActive={isFullscreenActive}
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      isVisible={localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.OVERVIEW}
    />
    {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.OVERVIEW && (
      <Legend
        hideTutorial
        hideCloseButton
        activeLayers={activeLayers}
        className={styles.hideOnPrint}
        isFullscreenActive={isFullscreenActive}
      />
    )}
    {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.CHALLENGES && (
      <div
        className={cx(styles.hideOnPrint, styles.challengesViewContainer)}
      >
        <CountryChallengesChart
          countryISO={countryISO}
          className={styles.challengesChart}
          localSceneActiveTab={localSceneActiveTab}
          countryChallengesSelectedKey={countryChallengesSelectedKey}
        />
      </div>
    )}
    {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.RANKING && (
      <div
        className={cx(styles.hideOnPrint, styles.challengesViewContainer)}
      >
        <RankingChart
          countryISO={countryISO}
          className={styles.rankingChart}
          localSceneActiveTab={localSceneActiveTab}
        />
      </div>
    )}
    {hasMetadata && (
      <InfoModal />
    )}
    {!useMobile() && <About className={styles.hideOnPrint} />}
    <UserDataModal />
  </>
);

export default NationalReportCard;