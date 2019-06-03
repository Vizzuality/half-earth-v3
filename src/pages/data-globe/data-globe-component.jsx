import React from 'react';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
import BiodiversityLayers from 'components/biodiversity-layers';
import MultipleActiveLayers from 'components/multiple-active-layers';
import LandscapeSidebar from 'components/landscape-sidebar';
import About from 'components/about';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

// styles
import styles from './data-globe-styles.module';

// layers
import { humanPressuresLandUse } from 'constants/human-pressures';
import { WDPALayers } from 'constants/protected-areas';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const DataGlobeComponent = ({ sceneLayers, activeLayers, activeCategory, isLandscapeMode, isSidebarOpen, handleZoomChange, handleLayerToggle, sceneSettings, speciesCategories, onLoad, setSpeciesLoading, setSpecies, setSpeciesError }) => {
  const isBiodiversityActive = activeCategory === 'Biodiversity';
  const isHumanPressuresActive = activeCategory === 'Human pressures';
  const isProtectedAreasActive = activeCategory === 'Existing protection';

  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
      <ArcgisLayerManager activeLayers={activeLayers}/>
      <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
      <LocationWidget />
      <ToggleUiWidget />
      <ZoomWidget />
      <MinimapWidget />
      <SearchWidget />
      <EntryBoxes isSidebarOpen={isSidebarOpen} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode} />
      <Sidebar isSidebarOpen={isSidebarOpen} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode}>
        {
          sceneLayers &&
          sceneLayers.map(l => (
              <button key={l.id} data-layer-id={l.id} onClick={() => handleLayerToggle(l.id)}>{l.title}</button>
          ))
        }
        {isBiodiversityActive && (
          biodiversityCategories.map(cat => (
            <BiodiversityLayers
              key={cat.name}
              handleLayerToggle={handleLayerToggle}
              title={cat.name}
              description={cat.description}
              options={cat.taxa}
              defaultSelection={null}
            />
          ))
        )}
        {isHumanPressuresActive && (
          <MultipleActiveLayers 
            options={humanPressuresLandUse} 
            title='Land use pressures'
            description='Human pressures causing habitat loss and accelerating species extinction.'
            activeLayers={activeLayers}
          />
        )}
        {isProtectedAreasActive && (
          <MultipleActiveLayers
            options={WDPALayers}
            title='Conservation areas'
            handleLayerToggle={handleLayerToggle}
            theme={styles.overrideCheckbox}
            description='Protections classified according to their management objectives.'
            activeLayers={activeLayers}
          />
        )}
      </Sidebar>
      <LandscapeSidebar isLandscapeMode={isLandscapeMode}/>
      <About />
    </Globe>
  )
};

export default DataGlobeComponent;