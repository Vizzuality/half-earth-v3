import React from 'react';
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import GridLayer from 'components/grid-layer';
import Legend from 'components/legend';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;
const DataGlobeComponent = ({
  activeLayers,
  isLandscapeMode,
  sceneSettings,
  onLoad,
  handleZoomChange
}) => {
  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
      <ArcgisLayerManager activeLayers={activeLayers}/>
      <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
      <Legend />
      {isLandscapeMode && <GridLayer />}
    </Globe>
  )
};

export default DataGlobeComponent;
