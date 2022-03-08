import React from 'react';
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import Scene from 'components/scene';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import LandscapeViewManager from 'containers/managers/landscape-view-manager';
import PostRobotManager from 'containers/managers/post-robot-manager';
import ConstantContactLayers from 'containers/layers/constant-contact-layers';

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env;

const DataGlobeComponent = ({
  activeLayers,
  isLandscapeMode,
  sceneSettings,
  onLoad,
  listeners,
  handleZoomChange,
  handlePostRobotUpdates,
  userConfig
}) => (
  <Scene
    onViewLoad={onLoad}
    sceneSettings={sceneSettings}
    loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
  >
    <ArcgisLayerManager activeLayers={activeLayers} userConfig={userConfig} />
    <PostRobotManager
      activeLayers={activeLayers}
      handlePostRobotUpdates={handlePostRobotUpdates}
      listeners={listeners}
    />
    <LandscapeViewManager
      zoomLevelTrigger={ZOOM_LEVEL_TRIGGER}
      onZoomChange={handleZoomChange}
      isLandscapeMode={isLandscapeMode}
    />
    <ConstantContactLayers activeLayers={activeLayers} />
  </Scene>
);

export default DataGlobeComponent;
