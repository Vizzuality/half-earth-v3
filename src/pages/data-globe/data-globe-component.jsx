import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
import BiodiversityLayers from 'components/biodiversity-layers';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const DataGlobeComponent = ({ sceneLayers, activeLayers, activeCategory, isLandscapeMode, isSidebarOpen, handleZoomChange, handleLayerToggle, sceneSettings, speciesCategories, onLoad, setSpeciesLoading, setSpecies, setSpeciesError }) => {
  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
      <ArcgisLayerManager activeLayers={activeLayers}/>
      <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
      <LocationWidget />
      <ToggleUiWidget />
      <ZoomWidget />
      <SearchWidget />
      <EntryBoxes isSidebarOpen={isSidebarOpen} activeCategory={activeCategory} />
      <Sidebar isSidebarOpen={isSidebarOpen} activeCategory={activeCategory}>
        {
          sceneLayers &&
          sceneLayers.map(l => (
              <button key={l.id} data-layer-id={l.id} onClick={handleLayerToggle}>{l.title}</button>
          ))
        }
        {speciesCategories && <BiodiversityLayers 
          title='Terrestrial Species'
          description='Global km'
          options={speciesCategories.terrestrial} 
        />}
      </Sidebar>
    </Globe>
  )
};

export default DataGlobeComponent;