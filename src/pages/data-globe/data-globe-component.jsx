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
const Switcher = loadable(() => import('components/switcher'));

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
    <>
      <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
        {isGlobeUpdating && <Spinner floating />}
        <ArcgisLayerManager activeLayers={activeLayers}/>
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
        <LocationWidget />
        <ToggleUiWidget isFullscreenActive={isFullscreenActive} />
        <ZoomWidget />
        {IS_FEATURE_MAPS_ENABLED === 'true' && <Switcher handleClick={handleSwitch} />}
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
              />
            ))
          )}
          {isHumanPressuresActive && (
            <HumanImpactLayers
              setLayerVisibility={setLayerVisibility}
              handleGlobeUpdating={handleGlobeUpdating}
              activeLayers={activeLayers}
              rasters={rasters}
              setRasters={setRasters}
            />
          )}
          {isProtectedAreasActive && (
            <ProtectedAreasLayers
              handleLayerToggle={handleLayerToggle}
              handleGlobeUpdating={handleGlobeUpdating}
              activeLayers={activeLayers}
            />
          )}
        </Sidebar>
        <Legend
          isFullscreenActive={isFullscreenActive}
          setLayerOpacity={setLayerOpacity}
          setLayerVisibility={setLayerVisibility}
          setLayerOrder={setLayerOrder}
        />
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3}/>}
        {isLandscapeMode && (
          <LandscapeSidebar
            isLandscapeMode={isLandscapeMode}
            isFullscreenActive={isFullscreenActive}
            handleGlobeUpdating={handleGlobeUpdating}
            activeLayers={activeLayers}
            rasters={rasters}
            setRasters={setRasters}
            setLayerVisibility={setLayerVisibility}
          />
        )}
      </Globe>
      <About />
      {hasMetadata && <InfoModal />}
    </>
  )
};

export default DataGlobeComponent;

