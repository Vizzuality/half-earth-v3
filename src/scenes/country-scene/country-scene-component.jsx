// Dependencies
import React, { useState } from 'react';
import loadable from '@loadable/component'
import cx from 'classnames';
// Components
import Scene from 'components/scene';
import About from 'components/about';
import Legend from 'components/legend';
import Widgets from 'components/widgets';
import LabelsLayer from 'components/labels-layer';
import LocalSceneSidebar from 'components/local-scene-sidebar';
import CountryMaskLayer from 'components/country-mask-layer';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LocalSceneModeSwitch from 'components/local-scene-mode-switch';
import LocalSceneViewManager from 'components/local-scene-view-manager';
import CountryChallengesChart from 'components/country-challenges-chart';
import RankingChart from 'components/ranking-chart';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
// Utils
import { useMobile } from 'constants/responsive';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

import { LOCAL_SCENE_TABS } from 'constants/ui-params';

import styles from './country-scene-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const CountrySceneComponent = ({
  shortLink,
  onMapLoad,
  countryISO,
  countryName,
  hasMetadata,
  activeLayers,
  countryBorder,
  sceneSettings,
  openedModal,
  handleModeChange,
  isFullscreenActive,
  handleGlobeUpdating,
  localSceneActiveTab,
  sortRankingCategory,
  countryChallengesSelectedKey,
  userConfig
}) => {
  const isOnMobile = useMobile();
  const [infoModalAdditionalContent, setInfoModalAdditionalContent] = useState(null);

  return (
    <>
      <Scene
        className={styles.sceneWrapper}
        sceneId="8f71838a19624717a4e45de110eced1b"
        sceneName={'country-scene'}
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
      >
        <LocalSceneViewManager localGeometry={countryBorder} />
        <ArcgisLayerManager
          activeLayers={activeLayers}
          userConfig={userConfig}
        />
        <CountryMaskLayer
          countryISO={countryISO}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <TerrainExaggerationLayer exaggeration={20} />
        <LabelsLayer activeLayers={activeLayers} countryISO={countryISO} />
        {localSceneActiveTab === LOCAL_SCENE_TABS.MAP && (
          <Legend
            hideTutorial
            hideCloseButton
            activeLayers={activeLayers}
            className={styles.hideOnPrint}
            isFullscreenActive={isFullscreenActive}
          />
        )}
        <Widgets
          hideSearch
          hideLocator
          activeLayers={activeLayers}
          openedModal={openedModal}
          isFullscreenActive={isFullscreenActive}
        />
        <LocalSceneSidebar
          countryISO={countryISO}
          countryName={countryName}
          openedModal={openedModal}
          activeLayers={activeLayers}
          localGeometry={countryBorder}
          className={styles.hideOnPrint}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
        />
        <PdfNationalReport
          countryISO={countryISO}
          countryName={countryName}
          onMapLoad={onMapLoad}
          shortLink={shortLink}
        />
      </Scene>
      <LocalSceneModeSwitch
        className={cx(styles.modeSwitch, styles.hideOnPrint)}
        handleModeChange={handleModeChange}
        localSceneActiveTab={localSceneActiveTab}
      />
      <div
        className={cx(styles.hideOnPrint, styles.challengesViewContainer, {
          [styles.challengesSelected]:
            localSceneActiveTab === LOCAL_SCENE_TABS.CHALLENGES
        })}
      >
        <CountryChallengesChart
          countryISO={countryISO}
          className={styles.challengesChart}
          localSceneActiveTab={localSceneActiveTab}
          countryChallengesSelectedKey={countryChallengesSelectedKey}
          setInfoModalAdditionalContent={setInfoModalAdditionalContent}
        />
      </div>
      <div
        className={cx(styles.hideOnPrint, styles.challengesViewContainer, {
          [styles.challengesSelected]:
            localSceneActiveTab === LOCAL_SCENE_TABS.RANKING
        })}
      >
        <RankingChart
          countryISO={countryISO}
          className={styles.rankingChart}
          localSceneActiveTab={localSceneActiveTab}
          sortRankingCategory={sortRankingCategory}
        />
      </div>
      {hasMetadata && (
        <InfoModal additionalContent={infoModalAdditionalContent} />
      )}
      {!isOnMobile && <About className={styles.hideOnPrint} />}
    </>
  );
};

export default CountrySceneComponent;
