import React from 'react';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
import BiodiversityLayers from 'components/biodiversity-layers';
import HumanPressureLayers from 'components/human-pressure-layers';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const checkboxesLandUse = [
  { name: 'Rainfed agriculture' },
  { name: 'Irrigated agriculture' },
  { name: 'Urban pressures' }
];

const checkboxesFishingActivity = [
  { name: 'Drifting longlines' },
  { name: 'Fixed gear' },
  { name: 'Other' },
  { name: 'Purse seins' },
  { name: 'Trawlers' }
]

const DataGlobeComponent = ({ sceneLayers, activeLayers, activeCategory, isLandscapeMode, isSidebarOpen, handleZoomChange, handleLayerToggle, sceneSettings, speciesCategories, onLoad, setSpeciesLoading, setSpecies, setSpeciesError }) => {
  const isBiodiversityActive = activeCategory === 'Biodiversity';
  const isHumanPressuresActive = activeCategory === 'Human pressures';
  const isProtectedAreasActive = activeCategory === 'Existing protection';

  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
      <ArcgisLayerManager activeLayers={activeLayers}/>
      <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode}/>
      <LocationWidget />
      <ToggleUiWidget />
      <ZoomWidget />
      <MinimapWidget />
      <SearchWidget />
      <EntryBoxes isSidebarOpen={isSidebarOpen} activeCategory={activeCategory} />
      <Sidebar isSidebarOpen={isSidebarOpen} activeCategory={activeCategory}>
        {
          sceneLayers &&
          sceneLayers.map(l => (
              <button key={l.id} data-layer-id={l.id} onClick={() => handleLayerToggle(l.id)}>{l.title}</button>
          ))
        }
        {isBiodiversityActive && speciesCategories && (
          <>
            <BiodiversityLayers 
              title='Terrestrial Species'
              description='Global km'
              options={speciesCategories.terrestrial}
              defaultSelection={speciesCategories.terrestrial[0]}
            />
            <BiodiversityLayers 
              title='Marine Species'
              description='Global km'
              options={speciesCategories.marine} 
            />
          </>
        )}
        {isHumanPressuresActive && (
          <>
            <HumanPressureLayers 
              options={checkboxesLandUse} 
              title='Land use pressures'
              description='Human pressures causing habitat loss and accelerating species extinction.'
            />
            <HumanPressureLayers
              options={checkboxesFishingActivity}
              title='marine fishing activity'
              description='Human pressures causing habitat loss and accelerating species extinction.'
            />
          </>
        )}
      </Sidebar>
    </Globe>
  )
};


export default DataGlobeComponent;