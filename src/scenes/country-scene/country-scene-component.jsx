// Dependencies
import React from 'react';
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
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
// Utils
import { useMobile } from 'constants/responsive';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

import { LOCAL_SCENE_TABS } from 'constants/ui-params';

import styles from './country-scene-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const CountrySceneComponent = ({
  onMapLoad,
  countryISO,
  countryName,
  hasMetadata,
  activeLayers,
  countryBorder,
  sceneSettings,
  isHEModalOpen,
  handleModeChange,
  isFullscreenActive,
  handleGlobeUpdating,
  localSceneActiveTab,
  countryChallengesSelectedKey
}) => {
  const isOnMobile = useMobile();
  return (
    <>
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneName={'country-scene'}
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
      >
        <LocalSceneViewManager localGeometry={countryBorder} sceneSettings={sceneSettings}/>
        <ArcgisLayerManager activeLayers={activeLayers} />
        <CountryMaskLayer
          countryISO={countryISO}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <TerrainExaggerationLayer exaggeration={20}/>
        <LabelsLayer />
        {localSceneActiveTab === LOCAL_SCENE_TABS.MAP &&
          <Legend
            hideTutorial
            hideCloseButton
            activeLayers={activeLayers}
            isFullscreenActive={isFullscreenActive}
          />
        }
        <Widgets
          hideSearch
          isHEModalOpen={isHEModalOpen}
          isFullscreenActive={isFullscreenActive}
        />
      </Scene>
      <LocalSceneSidebar
        countryISO={countryISO}
        countryName={countryName}
        activeLayers={activeLayers}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
      />
      <LocalSceneModeSwitch
        className={styles.modeSwitch}
        handleModeChange={handleModeChange}
        localSceneActiveTab={localSceneActiveTab}
      />
      <div className={cx(
        styles.challengesViewContainer,
        {[styles.challengesSelected]: localSceneActiveTab === LOCAL_SCENE_TABS.CHALLENGES }
      )}>
        <CountryChallengesChart
          countryISO={countryISO}
          className={styles.challengesChart}
          localSceneActiveTab={localSceneActiveTab}
          countryChallengesSelectedKey={countryChallengesSelectedKey}
        />
      </div>
      {hasMetadata && <InfoModal />}
      {!isOnMobile && <About />}
    </>
  )
}

export default CountrySceneComponent;
