// Dependencies
import React from 'react';
import loadable from '@loadable/component'
// Components
import Scene from 'components/scene';
import About from 'components/about';
import Legend from 'components/legend';
import Widgets from 'components/widgets';
import LabelsLayer from 'components/labels-layer';
import LocalSceneSidebar from 'components/local-scene-sidebar';
import CountryMaskLayer from 'components/mask-country-manager';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LocalSceneModeSwitch from 'components/local-scene-mode-switch';
import LocalSceneViewManager from 'components/local-scene-view-manager';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
// Utils
import { useMobile } from 'constants/responsive';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import { LOCAL_SCENE_TABS } from 'constants/ui-params';

const InfoModal = loadable(() => import('components/modal-metadata'));
const ScatterPlot = loadable(() => import('components/charts/scatter-plot'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const CountrySceneComponent = ({
  onMapLoad,
  countryISO,
  countryName,
  hasMetadata,
  activeLayers,
  countryExtent,
  sceneSettings,
  isHEModalOpen,
  scatterplotData,
  handleModeChange,
  isFullscreenActive,
  handleGlobeUpdating,
  localSceneActiveTab,
}) => {
  const isOnMobile = useMobile();
  return (
    <>
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneName={'country-scene'}
        sceneSettings={sceneSettings}
        extent={countryExtent}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
      >
        <LocalSceneViewManager extent={countryExtent} sceneSettings={sceneSettings}/>
        <ArcgisLayerManager activeLayers={activeLayers} />
        <CountryMaskLayer
          extent={countryExtent}
          countryISO={countryISO}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <TerrainExaggerationLayer exaggeration={20}/>
        <LabelsLayer />
        <Legend
          hideTutorial
          hideCloseButton
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
        />
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
      <LocalSceneModeSwitch localSceneActiveTab={localSceneActiveTab} handleModeChange={handleModeChange}/>
      {localSceneActiveTab === LOCAL_SCENE_TABS.CHALLENGES &&
        <ScatterPlot
          data={scatterplotData}
          countryISO={countryISO}
          xAxisLabels={INDICATOR_LABELS}
        />
      }
      {hasMetadata && <InfoModal />}
      {!isOnMobile && <About />}
    </>
  )
}

export default CountrySceneComponent;
