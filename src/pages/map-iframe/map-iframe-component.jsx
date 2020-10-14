import React from 'react';
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import Scene from 'components/scene';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import PostRobotManager from 'components/post-robot-manager';
import ConstantContactLayers from 'components/constant-contact-layers';
import GridLayer from 'components/grid-layer';
import Legend from 'components/legend';

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
    sceneId="e96f61b2e79442b698ec2cec68af6db9"
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
    <Legend activeLayers={activeLayers} />
    {isLandscapeMode && <GridLayer />}
  </Scene>
);

export default DataGlobeComponent;
