import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import Sidebar from 'components/sidebar';
import EntryBoxes from 'components/entry-boxes';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const DataGlobeComponent = ({ sceneLayers, activeLayers, isLandscapeMode, isSidebarOpen, isCategoriesBoxesVisible, handleZoomChange, handleLayerToggle, sceneSettings }) => (
  <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} >
    <ArcgisLayerManager activeLayers={activeLayers}/>
    <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
    <LocationWidget />
    <ToggleUiWidget />
    <ZoomWidget />
    <EntryBoxes isCategoriesBoxesVisible={isCategoriesBoxesVisible} />
    <Sidebar isSidebarOpen={isSidebarOpen}>
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