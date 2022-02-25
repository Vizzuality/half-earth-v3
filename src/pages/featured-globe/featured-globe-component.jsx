import React from 'react';
import loadable from '@loadable/component';

import Scene from 'components/scene';
import Widgets from 'containers/widgets';
import GlobeEventsManager from 'containers/managers/globe-events-manager';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import Spinner from 'components/spinner';
import FeaturedPlaceViewManager from 'containers/managers/featured-place-view-manager';
import SelectedFeaturedMapCard from 'containers/sidebars/featured-map-card';
import FeaturedTaxaSelector from 'components/featured-taxa-selector';
import FeaturedPlacesLayer from 'containers/layers/featured-places-layer';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';

import { MobileOnly, useMobile } from 'constants/responsive';

import FeaturedMapsList from 'containers/sidebars/featured-maps-list';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));
const FeaturedPlaceCard = loadable(() =>
  import('containers/sidebars/featured-place-card')
);

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const DataGlobeComponent = ({
  sceneSettings,
  isFullscreenActive,
  selectedFeaturedMap,
  selectedSidebar,
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
  userConfig,
}) => {
  const isFeaturedPlaceCard = selectedFeaturedPlace;
  const isOnMobile = useMobile();
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard || isOnMobile;

  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu />
      <Scene
        sceneName="featured-scene"
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
        interactionsDisabled={
          (isMapsList || isFeaturedPlaceCard) && !isOnMobile
        }
        urlParamsUpdateDisabled
        initialRotation
      >
        {isGlobeUpdating && <Spinner floating />}
        <MobileOnly>
          <MenuFooter
            featured
            selectedSidebar={selectedSidebar}
            selectedFeaturedMap={selectedFeaturedMap}
            activeOption={activeOption}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
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
        <FeaturedPlaceViewManager
          selectedFeaturedPlace={selectedFeaturedPlace}
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
            selectedFeaturedPlace={selectedFeaturedPlace}
            spinGlobe={spinGlobe}
            handle={spinGlobeHandle}
          />
        )}
        <FeaturedPlacesLayer
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
          handleLayerToggle={handleLayerToggle}
        />
        <FeaturedTaxaSelector
          selectedTaxa={selectedTaxa}
          isMapsList={isMapsList}
          selectedFeaturedMap={selectedFeaturedMap}
          isFullscreenActive={isFullscreenActive}
          selectedFeaturedPlace={selectedFeaturedPlace}
          activeOption={activeOption}
        />
        <FeaturedPlaceCard
          isFullscreenActive={isFullscreenActive}
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
        handle={spinGlobeHandle}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
};

export default DataGlobeComponent;
