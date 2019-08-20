import React from 'react';
import { Helmet } from "react-helmet";
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { DATA_GLOBE_URLS } from 'constants/preload-urls';
import Globe from 'components/globe';

// Managers
import LandscapeViewManager from 'components/landscape-view-manager';
import GlobeEventsManager from 'components/globe-events-manager';
import Legend from 'components/legend';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';
import Switcher from 'components/switcher';
import FeaturedMapsList from 'components/featured-maps-list';
import SelectedFeaturedMapCard from 'components/featured-map-card';
import SelectedFeaturedMapLayer from 'components/featured-places-layer';
import FeaturedPlaceViewManager from 'components/featured-place-view-manager';
import Spinner from 'components/spinner';
import About from 'components/about';
import uiStyles from 'styles/ui.module.scss';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import ArcgisLayerManager from './featured-arcgis-layer-manager.js';

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
  setLayerOrder
 }) => {

  return (
    <>
      <Helmet>
        { DATA_GLOBE_URLS.map(url => <link key="url" rel="preload" crossorigin href={url} as="script" />)}
      </Helmet>
      <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
        <GlobeEventsManager clickCallbacksArray={clickCallbacksArray} mouseMoveCallbacksArray={mouseMoveCallbacksArray} />
        <ArcgisLayerManager activeLayers={activeLayers} isLandscapeMode={isLandscapeMode}/>
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} onZoomChange={handleZoomChange} isLandscapeMode={isLandscapeMode} />
        <LocationWidget />
        <ToggleUiWidget isFullscreenActive={isFullscreenActive} />
        <ZoomWidget />
        <MinimapWidget />
        <SearchWidget />
        <Switcher />
        <FeaturedMapsList
          className={uiStyles.uiTopLeft}
          selectedSidebar={selectedSidebar}
          isFullscreenActive={isFullscreenActive}
          isLandscapeMode={isLandscapeMode}
        />
        <SelectedFeaturedMapCard
          className={uiStyles.uiTopLeft}
          selectedFeaturedMap={selectedFeaturedMap}
          selectedSidebar={selectedSidebar}
          isFullscreenActive={isFullscreenActive}
          isLandscapeMode={isLandscapeMode}
          selectedFeaturedPlace={selectedFeaturedPlace}
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
        {/* {isLandscapeMode && <LabelsLayer />} */}
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
      {hasMetadata && <InfoModal />}
      {!selectedFeaturedPlace && <About />}
    </>
  )
};

export default FeaturedGlobeComponent;