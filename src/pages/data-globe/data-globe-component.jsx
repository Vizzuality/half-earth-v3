import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import Sidebar from 'components/sidebar';
import sceneSettings from './data-globe-settings.js';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const DataGlobeComponent = ({ sceneLayers, activeLayers, isLandscapeMode, handleZoomChange, handleLayerToggle }) => (
  <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} >
    <ArcgisLayerManager activeLayers={activeLayers}/>
    <LandscapeViewManager zoomLevelTrigger={10} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
    <Sidebar>
      {
        sceneLayers &&
        sceneLayers.map(l => (
            <button key={l.id} data-layer-id={l.id} onClick={handleLayerToggle}>{l.title}</button>
        ))
      }
    </Sidebar>
  </Globe>
);

export default DataGlobeComponent;