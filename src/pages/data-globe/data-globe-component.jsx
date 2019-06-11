import React from 'react';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
import BiodiversityLayers from 'components/biodiversity-layers';
import LandscapeSidebar from 'components/landscape-sidebar';
import About from 'components/about/about';
import HumanImpactLayers from 'components/human-impact-layers';
import ProtectedAreasLayers from 'components/protected-areas-layers';
import Legend from 'components/legend';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';
import InfoModal from 'components/modal-metadata';

const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;
const DataGlobeComponent = ({
  activeLayers,
  rasters,
  setRasters,
  activeCategory,
  isLandscapeMode,
  isFullscreenActive,
  isSidebarOpen,
  handleZoomChange,
  handleLayerToggle,
  setLayerVisibility,
  sceneSettings,
  exclusiveLayerToggle,
  onLoad,
  setLayerOpacity
}) => {
  const isBiodiversityActive = activeCategory === 'Biodiversity';
  const isHumanPressuresActive = activeCategory === 'Human pressures';
  const isProtectedAreasActive = activeCategory === 'Existing protection';

  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
      <ArcgisLayerManager activeLayers={activeLayers}/>
      <LandscapeViewManager zoomLevelTrigger={8} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
      <LocationWidget />
      <ToggleUiWidget isFullscreenActive={isFullscreenActive} />
      <ZoomWidget />
      <MinimapWidget />
      <SearchWidget />
      <EntryBoxes isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode} />
      <Sidebar isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode}>
        {isBiodiversityActive && (
          biodiversityCategories.map(cat => (
            <BiodiversityLayers
              key={cat.name}
              title={cat.name}
              description={cat.description}
              subcategories={cat.subcategories}
              options={cat.taxa}
              activeLayers={activeLayers}
              exclusiveLayerToggle={exclusiveLayerToggle}
              handleLayerToggle={handleLayerToggle}
            />
          ))
        )}
        {isHumanPressuresActive && (
          <HumanImpactLayers
            setLayerVisibility={setLayerVisibility}
            activeLayers={activeLayers}
            rasters={rasters}
            setRasters={setRasters}
          />
        )}
        {isProtectedAreasActive && (
          <ProtectedAreasLayers
            handleLayerToggle={handleLayerToggle}
            activeLayers={activeLayers}
          />
        )}
      </Sidebar>
      <LandscapeSidebar isLandscapeMode={isLandscapeMode} isFullscreenActive={isFullscreenActive} />
      <About />
      <Legend 
        isFullscreenActive={isFullscreenActive}
        setLayerOpacity={setLayerOpacity}
        setLayerVisibility={setLayerVisibility}
      />
      <InfoModal />
    </Globe>
  )
};

export default DataGlobeComponent;
