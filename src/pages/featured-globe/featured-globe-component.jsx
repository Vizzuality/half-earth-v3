import React, { useState } from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import Globe from 'components/globe';

// Managers
import LandscapeViewManager from 'components/landscape-view-manager';
import GlobeEventsManager from 'components/globe-events-manager';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import FeaturedPlaceViewManager from 'components/featured-place-view-manager';
import ProtectedAreasTooltips from 'components/protected-areas-tooltips';

import { loadModules } from '@esri/react-arcgis';

import { MobileOnly, isMobile } from 'constants/responsive';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';
import Switcher from 'components/switcher';
import Slider from 'components/slider';
import FeaturedMapsList from 'components/featured-maps-list';
import FeaturedTaxaSelector from 'components/featured-taxa-selector';
import SelectedFeaturedMapCard from 'components/featured-map-card';
import SelectedFeaturedMapLayer from 'components/featured-places-layer';
import Spinner from 'components/spinner';
import About from 'components/about';
import uiStyles from 'styles/ui.module.scss';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import LabelsLayer from 'components/labels-layer';
import Legend from 'components/legend';
import TutorialModal from 'components/tutorial/tutorial-modal';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';

const InfoModal = loadable(() => import('components/modal-metadata'));
const FeaturedPlaceCard = loadable(() => import('components/featured-place-card'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const GridLayer = loadable(() => import('components/grid-layer'));
const PriorityPlacesPolygonsLayer = loadable(() => import('components/priority-places-polygons-layer'));

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({
  onLoad,
  sceneSettings,
  rasters,
  activeLayers,
  selectedSpecies,
  featuredPlacesLayer,
  selectedTaxa,
  selectedSidebar,
  selectedFeaturedMap,
  selectedFeaturedPlace,
  hasMetadata,
  isLandscapeMode,
  isGlobeUpdating,
  isFullscreenActive,
  setRasters,
  setLayerOrder,
  setLayerOpacity,
  setLayerVisibility,
  handleZoomChange,
  handleLayerToggle,
  handleGlobeUpdating,
  customFunctions,
  clickCallbacksArray,
  mouseMoveCallbacksArray,
  activeOption,
  isLandscapeSidebarCollapsed,
 }) => {
  const isMapsList = selectedSidebar === 'featuredMapsList';
  const isFeaturedPlaceCard = selectedFeaturedPlace && !isLandscapeMode;
  const [handle, setHandle] = useState(null);

  const isOnMobile = isMobile();
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard || isOnMobile;

  const spinGlobe = (view) => {
    loadModules(["esri/core/scheduling"]).then(([scheduling]) => {
      const camera = view.camera.clone();
      const spinningGlobe = scheduling.addFrameTask({
        update: function() {
          camera.position.longitude -= 0.2;
          view.camera = camera;
        }
      });
      setHandle(spinningGlobe);
    })
  }

  return (
    <>
      <div style={{ pointerEvents: (isMapsList || isFeaturedPlaceCard) && !isOnMobile ? 'none' : '' }}>
        <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
          <GlobeEventsManager clickCallbacksArray={clickCallbacksArray} mouseMoveCallbacksArray={mouseMoveCallbacksArray} />
          <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />
          {isGlobeUpdating && <Spinner floating />}
          <MobileOnly>
            <MenuFooter featured selectedSidebar={selectedSidebar} selectedFeaturedMap={selectedFeaturedMap} activeOption={activeOption} isLandscapeMode={isLandscapeMode} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} />
            <MenuSettings activeOption={activeOption} isLandscapeMode={isLandscapeMode} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} />
            <Slider />
          </MobileOnly>
          <ArcgisLayerManager activeLayers={activeLayers} customFunctions={customFunctions} />
          <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
          <LocationWidget hidden={esriWidgetsHidden} />
          {!esriWidgetsHidden && <ToggleUiWidget isFullscreenActive={isFullscreenActive} />}
          <ZoomWidget hidden={esriWidgetsHidden} />
          {!esriWidgetsHidden && <MinimapWidget />}
          {!esriWidgetsHidden && <SearchWidget />}
          {!isMapsList && !isOnMobile && <Switcher />}
          <SelectedFeaturedMapCard
            className={uiStyles.uiTopLeft}
            activeOption={activeOption}
            selectedFeaturedMap={selectedFeaturedMap}
            selectedSidebar={selectedSidebar}
            isFullscreenActive={isFullscreenActive}
            isLandscapeMode={isLandscapeMode}
            selectedFeaturedPlace={selectedFeaturedPlace}
            spinGlobe={spinGlobe}
            handle={handle}
          />
          <SelectedFeaturedMapLayer
            selectedFeaturedMap={selectedFeaturedMap}
            selectedTaxa={selectedTaxa}
            featuredPlacesLayer={featuredPlacesLayer}
            isLandscapeMode={isLandscapeMode}
            isFullscreenActive={isFullscreenActive}
            handleLayerToggle={handleLayerToggle}
          />
          {!isLandscapeMode &&
            <PriorityPlacesPolygonsLayer
              selectedFeaturedMap={selectedFeaturedMap}
              selectedTaxa={selectedTaxa}
              isLandscapeMode={isLandscapeMode}
            />
          }
          <FeaturedTaxaSelector
            selectedTaxa={selectedTaxa}
            isMapsList={isMapsList}
            selectedFeaturedMap={selectedFeaturedMap}
            isFullscreenActive={isFullscreenActive}
            isLandscapeMode={isLandscapeMode}
            selectedFeaturedPlace={selectedFeaturedPlace}
          />
          <FeaturedPlaceViewManager
            selectedFeaturedPlace={selectedFeaturedPlace}
            featuredPlacesLayer={featuredPlacesLayer}
          />
          <FeaturedPlaceCard
            isFullscreenActive={isFullscreenActive}
            isLandscapeMode={isLandscapeMode}
            selectedFeaturedPlace={selectedFeaturedPlace}
            selectedFeaturedMap={selectedFeaturedMap}
            featuredPlacesLayer={featuredPlacesLayer}
            selectedTaxa={selectedTaxa}
          />
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
            isFullscreenActive={isFullscreenActive}
            handleGlobeUpdating={handleGlobeUpdating}
            activeLayers={activeLayers}
            isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
            activeOption={activeOption}
            rasters={rasters}
            setRasters={setRasters}
            handleLayerToggle={handleLayerToggle}
            setLayerVisibility={setLayerVisibility}
            selectedSpecies={selectedSpecies}
          />
          <TutorialModal />
        </Globe>
      </div>
      <FeaturedMapsList
        selectedSidebar={selectedSidebar}
        selectedFeaturedMap={selectedFeaturedMap}
        isFullscreenActive={isFullscreenActive}
        activeOption={activeOption}
        isLandscapeMode={isLandscapeMode}
        handle={handle}
      />
      {hasMetadata && <InfoModal />}
      {!selectedFeaturedPlace && !isOnMobile && <About />}
    </>
  )
};

export default FeaturedGlobeComponent;