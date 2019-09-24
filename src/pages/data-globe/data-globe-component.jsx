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
  isEntryBoxesOpen,
  isLegendOpen,
  isSettingsOpen,
  isHalfEarthMeterModalOpen,
  isAboutOpen,
  activeAboutSection,
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
  handleSwitch,
  selectedSpecies
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
          <MenuFooter isEntryBoxesOpen={isEntryBoxesOpen} isLegendOpen={isLegendOpen} isSidebarOpen={isSidebarOpen} isSettingsOpen={isSettingsOpen} isLandscapeMode={isLandscapeMode} />
          <MenuSettings isSettingsOpen={isSettingsOpen} isHalfEarthMeterModalOpen={isHalfEarthMeterModalOpen} isAboutOpen={isAboutOpen} activeAboutSection={activeAboutSection} />
        </MobileOnly>
        <ArcgisLayerManager activeLayers={activeLayers}/>
        <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
        {!isOnMobile && <LocationWidget isNotMapsList={true} />}
        {!isOnMobile && <ToggleUiWidget isFullscreenActive={isFullscreenActive} />}
        {!isOnMobile && <ZoomWidget isNotMapsList={true} />}
        {IS_FEATURE_MAPS_ENABLED === 'true' && <Switcher handleClick={handleSwitch} />}
        <MinimapWidget isHalfEarthMeterModalOpen={isHalfEarthMeterModalOpen} />
        {!isOnMobile && <SearchWidget />}
        <EntryBoxes isSidebarOpen={isSidebarOpen} isEntryBoxesOpen={isEntryBoxesOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode}/>
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
          isLegendOpen={isLegendOpen}
          setLayerOpacity={setLayerOpacity}
          setLayerVisibility={setLayerVisibility}
          setLayerOrder={setLayerOrder}
        />
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3}/>}
        <LandscapeSidebar
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          activeLayers={activeLayers}
          rasters={rasters}
          setRasters={setRasters}
          handleLayerToggle={handleLayerToggle}
          setLayerVisibility={setLayerVisibility}
          selectedSpecies={selectedSpecies}
        />
      </Globe>
      <About isAboutOpen={isAboutOpen} activeSection={activeAboutSection} />
      {hasMetadata && <InfoModal />}
      <TutorialModal />
    </>
  )
};

export default DataGlobeComponent;

