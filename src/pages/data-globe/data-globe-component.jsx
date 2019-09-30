import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import Globe from 'components/globe';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import ProtectedAreasTooltips from 'components/protected-areas-tooltips';
import LabelsLayer from 'components/labels-layer';
import Spinner from 'components/spinner';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';
import Slider from 'components/slider';
import { MobileOnly, isMobile } from 'constants/responsive';

import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
import About from 'components/about';
import Legend from 'components/legend';
import TutorialModal from 'components/tutorial/tutorial-modal';

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
  isLandscapeSidebarCollapsed,
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
  selectedSpecies,
  activeOption
}) => {
  const isBiodiversityActive = activeCategory === 'Biodiversity';
  const isHumanPressuresActive = activeCategory === 'Human pressures';
  const isProtectedAreasActive = activeCategory === 'Existing protection';

  const isOnMobile = isMobile();

  return (
    <>
      <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
        {isGlobeUpdating && <Spinner floating />}
        <MobileOnly>
          <MenuFooter activeOption={activeOption} isSidebarOpen={isSidebarOpen} isLandscapeMode={isLandscapeMode} />
          <MenuSettings activeOption={activeOption} isLandscapeMode={isLandscapeMode} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} />
          <Slider />
        </MobileOnly>
        <ArcgisLayerManager activeLayers={activeLayers}/>
        <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
        {!isOnMobile && <LocationWidget isNotMapsList={true} />}
        {!isOnMobile && <ToggleUiWidget isFullscreenActive={isFullscreenActive} />}
        {!isOnMobile && <ZoomWidget isNotMapsList={true} />}
        {IS_FEATURE_MAPS_ENABLED === 'true' && !isOnMobile && <Switcher />}
        <MinimapWidget />
        {!isOnMobile && <SearchWidget />}
        <EntryBoxes isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} activeOption={activeOption} isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode}/>
        <Sidebar isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode} activeOption={activeOption} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}>
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
          isLandscapeMode={isLandscapeMode}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          activeOption={activeOption}
          setLayerOpacity={setLayerOpacity}
          setLayerVisibility={setLayerVisibility}
          setLayerOrder={setLayerOrder}
        />
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3}/>}
        <LandscapeSidebar
          isLandscapeMode={isLandscapeMode}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          activeOption={activeOption}
          activeLayers={activeLayers}
          rasters={rasters}
          setRasters={setRasters}
          handleLayerToggle={handleLayerToggle}
          setLayerVisibility={setLayerVisibility}
          selectedSpecies={selectedSpecies}
        />
      </Globe>
      {!isOnMobile && <About />}
      {hasMetadata && <InfoModal />}
      <TutorialModal />
    </>
  )
};

export default DataGlobeComponent;

