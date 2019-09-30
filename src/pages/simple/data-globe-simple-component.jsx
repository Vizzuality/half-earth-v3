import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';


import Scene from 'components/scene';
import Widgets from 'components/widgets';
import DataGlobalSidebar from 'components/data-global-sidebar';
import LandscapeViewManager from 'components/landscape-view-manager';
import Legend from 'components/legend';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import TutorialModal from 'components/tutorial/tutorial-modal';
import Spinner from 'components/spinner';

import sceneSettings from './scene-settings.js';

const InfoModal = loadable(() => import('components/modal-metadata'));
const GridLayer = loadable(() => import('components/grid-layer'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const DataGlobeComponentSimple = ({
  isFullscreenActive,
  isSidebarOpen,
  activeCategory,
  isLandscapeMode,
  isBiodiversityActive,
  isGlobeUpdating,
  isLegendActive,
  hasMetadata,
  activeLayers,
  rasters,
  handleMapLoad,
  handleGlobeUpdating,
  handleZoomChange,
  setRasters
}) => {
  return (
    <>
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onLoad={(map, view) => handleMapLoad(map, activeLayers)}
      >
        {isGlobeUpdating && <Spinner floating />}
        <ArcgisLayerManager activeLayers={activeLayers}/>
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} />
        <Widgets isFullscreenActive={isFullscreenActive}/>
        <DataGlobalSidebar
          isSidebarOpen={isSidebarOpen}
          isFullscreenActive={isFullscreenActive}
          activeCategory={activeCategory}
          isLandscapeMode={isLandscapeMode}
          isBiodiversityActive={isBiodiversityActive}
          activeLayers={activeLayers}
          rasters={rasters}
          handleGlobeUpdating={handleGlobeUpdating}
          setRasters={setRasters}
        />
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3}/>}
      </Scene>
      {isLegendActive && 
        <Legend
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
        />
      }
      <TutorialModal />
      {hasMetadata && <InfoModal />}
    </>
  )
}

export default DataGlobeComponentSimple;