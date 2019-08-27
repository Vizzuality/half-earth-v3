import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import Globe from 'components/globe';
import LandscapeViewManager from 'components/landscape-view-manager';
import Switcher from 'components/switcher';
import About from 'components/about';

// WIDGETS
import LocationWidget from 'components/widgets/location-widget';
import ZoomWidget from 'components/widgets/zoom-widget';
import ToggleUiWidget from 'components/widgets/toggle-ui-widget';
import SearchWidget from 'components/widgets/search-widget';
import MinimapWidget from 'components/widgets/minimap-widget';
import FeaturedMapsList from 'components/featured-maps-list';
import SelectedFeaturedMapCard from 'components/featured-map-card';
import SelectedFeaturedMapLayer from 'components/featured-places-layer';
import FeaturedPlaceCard from 'components/featured-place-card';
import FeaturedPlaceViewManager from 'components/featured-place-view-manager';
import Spinner from 'components/spinner';
import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

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
  featuredPlacesLayer
 }) => {

  return (
    <>
      <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad} loadElement={<Spinner spinnerWithOverlay />}>
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
      </Globe>
      {hasMetadata && <InfoModal />}
      {!selectedFeaturedPlace && <About />}
    </>
  )
};

export default FeaturedGlobeComponent;