import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';

import Legend from 'components/legend';
import Sidebar from 'components/sidebar';
import EntryBoxes from 'components/entry-boxes';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({ sceneLayers, activeLayers, activeCategory, isLandscapeMode, isSidebarOpen, handleLayerToggle, handleZoomChange, sceneSettings }) => {
  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} >
      <ArcgisLayerManager activeLayers={activeLayers}/>
      <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
      <EntryBoxes isSidebarOpen={isSidebarOpen} activeCategory={activeCategory} />
      <LocationWidget />
      <ToggleUiWidget />
      <ZoomWidget />
      <SearchWidget />
      <Sidebar isSidebarOpen={isSidebarOpen} activeCategory={activeCategory}>
        {
          sceneLayers &&
          sceneLayers.map(l => (
              <button key={l.id} data-layer-id={l.id} onClick={() => handleLayerToggle(l.id)}>{l.title}</button>
          ))
        }
      </Sidebar>
      <Legend />
    </Globe>
  )
};

export default FeaturedGlobeComponent;