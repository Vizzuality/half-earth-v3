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

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';
import Switcher from 'components/switcher';
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

const InfoModal = loadable(() => import('components/modal-metadata'));
const FeaturedPlaceCard = loadable(() => import('components/featured-place-card'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const GridLayer = loadable(() => import('components/grid-layer'));

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({
  hasMetadata,
  sceneSettings,
  selectedSidebar,
  onLoad,
  isFullscreenActive,
  handleZoomChange,
  isLandscapeMode,
  selectedFeaturedMap,
  selectedFeaturedPlace,
  selectedTaxa,
  featuredPlacesLayer,
  clickCallbacksArray,
  mouseMoveCallbacksArray,
  activeLayers,
  rasters,
  setRasters,
  setLayerVisibility,
  handleGlobeUpdating,
  setLayerOpacity,
  setLayerOrder,
  isGlobeUpdating,
  customFunctions,
  selectedSpecies,
  handleLayerToggle
 }) => {
  const isMapsList = selectedSidebar === 'featuredMapsList';
  const [handle, setHandle] = useState(null);
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
      <div style={{ pointerEvents: isMapsList ? 'none' : '' }}>
        <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
          <GlobeEventsManager clickCallbacksArray={clickCallbacksArray} mouseMoveCallbacksArray={mouseMoveCallbacksArray} />
          <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />
          {isGlobeUpdating && <Spinner floating />}
          <ArcgisLayerManager activeLayers={activeLayers} customFunctions={customFunctions} />
          <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
          <LocationWidget isNotMapsList={!isMapsList} />
          {!isMapsList && <ToggleUiWidget isFullscreenActive={isFullscreenActive} />}
          <ZoomWidget isNotMapsList={!isMapsList} />
          {!isMapsList && <MinimapWidget />}
          {!isMapsList && <SearchWidget />}
          {!isMapsList && <Switcher />}
          <SelectedFeaturedMapCard
            className={uiStyles.uiTopLeft}
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
            handleLayerToggle={handleLayerToggle}
          />
          <FeaturedTaxaSelector
            selectedTaxa={selectedTaxa}
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
          />
          {isLandscapeMode &&
            <Legend
              isFullscreenActive={isFullscreenActive}
              setLayerOpacity={setLayerOpacity}
              setLayerVisibility={setLayerVisibility}
              setLayerOrder={setLayerOrder}
            />}
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
      </div>
      <FeaturedMapsList
        className={uiStyles.uiTopLeft}
        selectedSidebar={selectedSidebar}
        isFullscreenActive={isFullscreenActive}
        isLandscapeMode={isLandscapeMode}
        handle={handle}
      />
      {hasMetadata && <InfoModal />}
      {!selectedFeaturedPlace && <About />}
    </>
  )
};

export default FeaturedGlobeComponent;