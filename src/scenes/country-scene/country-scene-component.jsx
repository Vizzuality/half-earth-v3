// Dependencies
import React from 'react';
import loadable from '@loadable/component'
// Components
import Scene from 'components/scene';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LocalSceneViewManager from 'components/local-scene-view-manager';
import LocalSceneSidebar from 'components/local-scene-sidebar';
import CountryBorderLayer from 'components/country-border-layer';
import Widgets from 'components/widgets';
import LocalSceneModeSwitch from 'components/local-scene-mode-switch';
import CountryMaskLayer from 'components/mask-country-manager';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import About from 'components/about';
import LabelsLayer from 'components/labels-layer';
// Utils
import {  useMobile } from 'constants/responsive';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

const InfoModal = loadable(() => import('components/modal-metadata'));
const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env
const CountrySceneComponent = ({
  sceneMode,
  onMapLoad,
  countryISO,
  countryName,
  hasMetadata,
  activeLayers,
  countryExtent,
  sceneSettings,
  isHEModalOpen,
  isFullscreenActive,
  handleGlobeUpdating,
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
        <LocalSceneSidebar
          countryISO={countryISO}
          countryName={countryName}
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
        />
        <CountryBorderLayer
          countryISO={countryISO}
          sceneMode={sceneMode}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <CountryMaskLayer
          extent={countryExtent}
          countryISO={countryISO}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <Widgets
          hideSearch
          isHEModalOpen={isHEModalOpen}
          isFullscreenActive={isFullscreenActive}
        />
        <LocalSceneModeSwitch />
        <TerrainExaggerationLayer exaggeration={20}/>
        <LabelsLayer />
      </Scene>
      {hasMetadata && <InfoModal />}
      {!isOnMobile && <About />}
    </>
  )
}

export default CountrySceneComponent;
