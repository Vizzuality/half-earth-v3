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
  mouseMoveCallbacksArray
 }) => {
  const isMapsList = selectedSidebar === 'featuredMapsList';
  const isFeaturedPlaceCard = selectedFeaturedPlace && !isLandscapeMode;
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard;
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
      <div style={{ pointerEvents: isMapsList || isFeaturedPlaceCard ? 'none' : '' }}>
        <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
          <GlobeEventsManager clickCallbacksArray={clickCallbacksArray} mouseMoveCallbacksArray={mouseMoveCallbacksArray} />
          <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />
          {isGlobeUpdating && <Spinner floating />}
          <ArcgisLayerManager activeLayers={activeLayers} customFunctions={customFunctions} />
          <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
          <LocationWidget hidden={esriWidgetsHidden} />
          {!esriWidgetsHidden && <ToggleUiWidget isFullscreenActive={isFullscreenActive} />}
          <ZoomWidget hidden={esriWidgetsHidden} />
          {!esriWidgetsHidden && <MinimapWidget />}
          {!esriWidgetsHidden && <SearchWidget />}
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
            isLandscapeMode={isLandscapeMode}
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