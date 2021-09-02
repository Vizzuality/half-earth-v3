import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';

import Scene from 'components/scene';
import Widgets from 'components/widgets';
import LandscapeViewManager from 'components/landscape-view-manager';
import GlobeEventsManager from 'components/globe-events-manager';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import Spinner from 'components/spinner';
import FeaturedPlaceViewManager from 'components/featured-place-view-manager';
import SelectedFeaturedMapCard from 'components/featured-map-card';
import FeaturedTaxaSelector from 'components/featured-taxa-selector';
import FeaturedPlacesLayer from 'components/featured-places-layer';
import HalfEarthLogo from 'components/half-earth-logo';

import { MobileOnly, useMobile } from 'constants/responsive';

import Slider from 'components/slider';
import FeaturedMapsList from 'components/featured-maps-list';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));
const FeaturedPlaceCard = loadable(() => import('components/featured-place-card'));
const About = loadable(() => import('components/about'));


const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const DataGlobeComponent = ({
  sceneSettings,
  isFullscreenActive,
  selectedFeaturedMap,
  selectedSpecies,
  selectedSidebar,
  isLandscapeMode,
  selectedFeaturedPlace,
  isGlobeUpdating,
  isMapsList,
  hasMetadata,
  activeLayers,
  selectedTaxa,
  onMapLoad,
  handleLayerToggle,
  spinGlobeHandle,
  spinGlobe,
  customFunctions,
  clickCallbacksArray,
  mouseMoveCallbacksArray,
  activeOption,
  openedModal,
  userConfig
}) => {
  const isFeaturedPlaceCard = selectedFeaturedPlace && !isLandscapeMode;
  const isOnMobile = useMobile();
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard || isOnMobile;

  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft}/> 
      <Scene
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
        interactionsDisabled={
          (isMapsList || isFeaturedPlaceCard) && !isOnMobile
        }
        urlParamsUpdateDisabled
      >
        {isGlobeUpdating && <Spinner floating />}
        <MobileOnly>
          <MenuFooter
            featured
            selectedSidebar={selectedSidebar}
            selectedFeaturedMap={selectedFeaturedMap}
            activeOption={activeOption}
            isLandscapeMode={isLandscapeMode}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
          <Slider />
        </MobileOnly>
        <ArcgisLayerManager
          activeLayers={activeLayers}
          userConfig={userConfig}
          customFunctions={customFunctions}
        />
        <GlobeEventsManager
          clickCallbacksArray={clickCallbacksArray}
          mouseMoveCallbacksArray={mouseMoveCallbacksArray}
        />
        <LandscapeViewManager
          zoomLevelTrigger={ZOOM_LEVEL_TRIGGER}
          isLandscapeMode={isLandscapeMode}
        />
        <FeaturedPlaceViewManager
          selectedFeaturedPlace={selectedFeaturedPlace}
          isLandscapeMode={isLandscapeMode}
        />
        <Widgets
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
          hidden={esriWidgetsHidden}
          openedModal={openedModal}
          disableSettings
        />
        {selectedFeaturedMap && (
          <SelectedFeaturedMapCard
            className={uiStyles.uiTopLeft}
            activeOption={activeOption}
            selectedFeaturedMap={selectedFeaturedMap}
            selectedSidebar={selectedSidebar}
            isFullscreenActive={isFullscreenActive}
            isLandscapeMode={isLandscapeMode}
            selectedFeaturedPlace={selectedFeaturedPlace}
            spinGlobe={spinGlobe}
            handle={spinGlobeHandle}
          />
        )}
        <FeaturedPlacesLayer
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
          isLandscapeMode={isLandscapeMode}
          handleLayerToggle={handleLayerToggle}
        />
        <FeaturedTaxaSelector
          selectedTaxa={selectedTaxa}
          isMapsList={isMapsList}
          selectedFeaturedMap={selectedFeaturedMap}
          isFullscreenActive={isFullscreenActive}
          isLandscapeMode={isLandscapeMode}
          selectedFeaturedPlace={selectedFeaturedPlace}
          activeOption={activeOption}
        />
        <FeaturedPlaceCard
          isFullscreenActive={isFullscreenActive}
          isLandscapeMode={isLandscapeMode}
          selectedFeaturedPlace={selectedFeaturedPlace}
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
          activeOption={activeOption}
        />
      </Scene>
      <FeaturedMapsList
        selectedSidebar={selectedSidebar}
        selectedFeaturedMap={selectedFeaturedMap}
        selectedFeaturedPlace={selectedFeaturedPlace}
        isFullscreenActive={isFullscreenActive}
        activeOption={activeOption}
        isLandscapeMode={isLandscapeMode}
        handle={spinGlobeHandle}
      />
      {hasMetadata && <InfoModal />}
      {!selectedFeaturedPlace && !isOnMobile && <About />}
    </>
  );
}

export default DataGlobeComponent;