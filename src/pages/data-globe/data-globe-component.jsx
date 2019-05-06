import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/shared/arcgis-layer-manager';
import LandscapeViewManager from 'components/shared/landscape-view-manager';
import sceneSettings from './data-globe-settings.js';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const DataGlobeComponent = ({ updateQueryParam }) => (
  <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} >
    <ArcgisLayerManager />
    <LandscapeViewManager zoomLevelTrigger={10} onZoomChange={updateQueryParam}/>
  </Globe>
);

export default DataGlobeComponent;