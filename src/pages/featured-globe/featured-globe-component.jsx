import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { DATA_GLOBE_URLS } from 'constants/preload-urls';
import Globe from 'components/globe';

// Managers
import LandscapeViewManager from 'components/landscape-view-manager';
import GlobeEventsManager from 'components/globe-events-manager';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import FeaturedPlaceViewManager from 'components/featured-place-view-manager';

<<<<<<< HEAD
// WIDGETS
=======
import { loadModules } from '@esri/react-arcgis';

>>>>>>> Hide elements on All maps screen, disable interacting with globe, rotate globe on All maps screen
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';
import Switcher from 'components/switcher';
import FeaturedMapsList from 'components/featured-maps-list';
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
  customFunctions
 }) => {
  const isMapsList = selectedSidebar === 'featuredMapsList';
  const [handle, setHandle] = useState(null);

  const spinGlobe = (view) => {
    loadModules(["esri/core/scheduling"]).then(([scheduling]) => {
      const spinningGlobe = scheduling.addFrameTask({
        update: function() {
          const camera = view.camera.clone();
          camera.position.longitude -= 0.2;
          view.camera = camera;
        }
      });
      setHandle(spinningGlobe);
    })
  }

  return (
    <>
      <Helmet>
        { DATA_GLOBE_URLS.map(url => <link key="url" rel="preload" crossorigin href={url} as="script" />)}
      </Helmet>
      <div style={{ pointerEvents: isMapsList ? 'none' : '' }}>
        <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
          <GlobeEventsManager clickCallbacksArray={clickCallbacksArray} mouseMoveCallbacksArray={mouseMoveCallbacksArray} />
          {isGlobeUpdating && <Spinner floating />}
          <ArcgisLayerManager activeLayers={activeLayers} customFunctions={customFunctions} />
          <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
          <LocationWidget />
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
            featuredPlacesLayer={featuredPlacesLayer}
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