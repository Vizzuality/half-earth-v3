import React from 'react';
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import Scene from 'components/scene';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import GridLayer from 'components/grid-layer';
import Legend from 'components/legend';

const { REACT_APP_STAGING_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;
const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env;

const DataGlobeComponent = ({
  activeLayers,
  isLandscapeMode,
  sceneSettings,
  onLoad,
  handleZoomChange
}) => {
  return (
    <Scene
      sceneId='e96f61b2e79442b698ec2cec68af6db9'
      onViewLoad={onLoad}
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    >
      <ArcgisLayerManager activeLayers={activeLayers}/>
      <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
      <Legend activeLayers={activeLayers} />
      {isLandscapeMode && <GridLayer />}
    </Scene>
  )
};

export default DataGlobeComponent;
