import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import EntryBoxes from 'components/entry-boxes';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const DataGlobeComponent = ({ sceneLayers, activeLayers, isLandscapeMode, onLoad, isSidebarOpen, isCategoriesBoxesVisible, handleZoomChange, handleLayerToggle, sceneSettings }) => (
  <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
    <ArcgisLayerManager activeLayers={activeLayers}/>
    <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
    <LocationWidget />
    <ToggleUiWidget />
    <ZoomWidget />
    <SearchWidget />
    <EntryBoxes isCategoriesBoxesVisible={isCategoriesBoxesVisible} />
  </Globe>
);

export default DataGlobeComponent;