import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import LabelsLayer from 'components/labels-layer';
import Spinner from 'components/spinner';

import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
import About from 'components/about';
import Legend from 'components/legend';
import Switcher from 'components/switcher';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';

// Lazy load components
const GridLayer = loadable(() => import('components/grid-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const BiodiversityLayers = loadable(() => import('components/biodiversity-layers'));
const HumanImpactLayers = loadable(() => import('components/human-impact-layers'));
const ProtectedAreasLayers = loadable(() => import('components/protected-areas-layers'));
const InfoModal = loadable(() => import('components/modal-metadata'));

// const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;
const { REACT_APP_STAGING_DATA_GLOBE_SCENE_ID: SCENE_ID, REACT_APP_IS_FEATURE_MAPS_ENABLED: IS_FEATURE_MAPS_ENABLED } = process.env;

const DataGlobeComponent = ({
  activeLayers,
  rasters,
  setRasters,
  activeCategory,
  isLandscapeMode,
  isFullscreenActive,
  isSidebarOpen,
  isGlobeUpdating,
  hasMetadata,
  handleZoomChange,
  handleLayerToggle,
  setLayerVisibility,
  sceneSettings,
  handleGlobeUpdating,
  exclusiveLayerToggle,
  onLoad,
  setLayerOpacity,
  setLayerOrder,
  handleSwitch
}) => {
  const isBiodiversityActive = activeCategory === 'Biodiversity';
  const isHumanPressuresActive = activeCategory === 'Human pressures';
  const isProtectedAreasActive = activeCategory === 'Existing protection';

  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
      <TerrainExaggerationLayer exaggeration={3}/>
      <ArcgisLayerManager activeLayers={activeLayers} handleGlobeUpdating={handleGlobeUpdating} />
      <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
      <LocationWidget />
      <ToggleUiWidget isFullscreenActive={isFullscreenActive} />
      <ZoomWidget />
      <MinimapWidget />
      <SearchWidget />
      <EntryBoxes isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode}/>
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
              handleGlobeUpdating={handleGlobeUpdating}
              exclusiveLayerToggle={exclusiveLayerToggle}
              handleLayerToggle={handleLayerToggle}
              activeLayers={activeLayers}
            />
          ))
        )}
        {isHumanPressuresActive && (
          <HumanImpactLayers
            setLayerVisibility={setLayerVisibility}
            handleGlobeUpdating={handleGlobeUpdating}
            isGlobeUpdating={isGlobeUpdating}
            activeLayers={activeLayers}
            rasters={rasters}
            setLayerVisibility={setLayerVisibility}
            setRasters={setRasters}
          />
        )}
        {isProtectedAreasActive && (
          <ProtectedAreasLayers
            handleLayerToggle={handleLayerToggle}
            handleGlobeUpdating={handleGlobeUpdating}
            isGlobeUpdating={isGlobeUpdating}
            activeLayers={activeLayers}
          />
        )}
      </Sidebar>
      {isLandscapeMode && (
        <LandscapeSidebar
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          setLayerOpacity={setLayerOpacity}
          setLayerVisibility={setLayerVisibility}
          setLayerOrder={setLayerOrder}
        />

      )}
      <About />
      <Legend
        isFullscreenActive={isFullscreenActive}
        setLayerOpacity={setLayerOpacity}
        setLayerVisibility={setLayerVisibility}
        setLayerOrder={setLayerOrder}
      />
      {isLandscapeMode && <GridLayer />}
      {hasMetadata && <InfoModal />}
      <LabelsLayer />
      {isGlobeUpdating && <Spinner floating />}
    </Globe>
  )
};

export default DataGlobeComponent;
