import React from 'react';
import Scene from 'components/scene';
import Widgets from 'components/widgets';
import DataGlobalSidebar from 'components/data-global-sidebar';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import Spinner from 'components/spinner';

import sceneSettings from './scene-settings.js';

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const DataGlobeComponentSimple = ({
  isFullscreenActive,
  isSidebarOpen,
  activeCategory,
  isLandscapeMode,
  isBiodiversityActive,
  isGlobeUpdating,
  activeLayers,
  rasters,
  handleMapLoad,
  handleGlobeUpdating,
  setRasters
}) => {
  return (
    <Scene
      sceneId='e96f61b2e79442b698ec2cec68af6db9'
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onLoad={(map, view) => handleMapLoad(map, activeLayers)}
    >
      {isGlobeUpdating && <Spinner floating />}
      <ArcgisLayerManager activeLayers={activeLayers}/>
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
    </Scene>
  )
}

export default DataGlobeComponentSimple;