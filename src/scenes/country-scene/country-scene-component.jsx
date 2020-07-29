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
import CountryMaskLayer from 'components/mask-country-manager';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';

import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

const InfoModal = loadable(() => import('components/modal-metadata'));
const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env
const CountrySceneComponent = ({
  sceneSettings,
  isFullscreenActive,
  isSidebarOpen,
  selectedSpecies,
  activeCategory,
  isLandscapeMode,
  isBiodiversityActive,
  isLandscapeSidebarCollapsed,
  countedActiveLayers,
  isGlobeUpdating,
  hasMetadata,
  activeLayers,
  handleMapLoad,
  handleGlobeUpdating,
  activeOption,
  isHEModalOpen,
  countryISO,
  countryName,
  sceneMode,
  countryExtent,
  onMapLoad
}) => {
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
        <LocalSceneViewManager extent={countryExtent} />
        <ArcgisLayerManager activeLayers={activeLayers} />
        <LocalSceneSidebar
          countryISO={countryISO}
          countryName={countryName}
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
        />
        <CountryBorderLayer
          extent={countryExtent}
          countryISO={countryISO}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <CountryMaskLayer
          extent={countryExtent}
          countryISO={countryISO}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <Widgets isFullscreenActive={isFullscreenActive} isHEModalOpen={isHEModalOpen} />
        <TerrainExaggerationLayer exaggeration={20}/>
      </Scene>
      {/* {hasMetadata && <InfoModal />} */}
      {/* {!isOnMobile && <About />} */}
    </>
  )
}

export default CountrySceneComponent;
