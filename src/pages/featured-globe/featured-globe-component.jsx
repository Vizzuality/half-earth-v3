import React from 'react';
import loadable from '@loadable/component';
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';

import Scene from 'components/scene';
import Widgets from 'containers/widgets';
import LandscapeViewManager from 'containers/managers/landscape-view-manager';
import GlobeEventsManager from 'containers/managers/globe-events-manager';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import LabelsLayer from 'containers/layers/labels-layer';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';
import Spinner from 'components/spinner';
import FeaturedPlaceViewManager from 'containers/managers/featured-place-view-manager';
import SelectedFeaturedMapCard from 'containers/sidebars/featured-map-card';
import FeaturedTaxaSelector from 'components/featured-taxa-selector';
import FeaturedPlacesLayer from 'containers/layers/featured-places-layer';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';

import { MobileOnly, useMobile } from 'constants/responsive';

import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';

import uiStyles from 'styles/ui.module.scss';

const GridLayer = loadable(() => import('components/grid-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const InfoModal = loadable(() => import('components/modal-metadata'));
const FeaturedPlaceCard = loadable(() =>
  import('containers/sidebars/featured-place-card')
);
const ProtectedAreasTooltips = loadable(() =>
  import('components/protected-areas-tooltips')
);

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

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
  isLandscapeSidebarCollapsed,
  hasMetadata,
  activeLayers,
  selectedTaxa,
  onMapLoad,
  handleLayerToggle,
  handleGlobeUpdating,
  spinGlobeHandle,
  spinGlobe,
  customFunctions,
  clickCallbacksArray,
  mouseMoveCallbacksArray,
  activeOption,
  openedModal,
}) => {
  const isFeaturedPlaceCard = selectedFeaturedPlace && !isLandscapeMode;
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
            isLandscapeMode={isLandscapeMode}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
        </MobileOnly>
        <ArcgisLayerManager
          activeLayers={activeLayers}
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
        {isLandscapeMode && (
          <LandscapeSidebar
            activeLayers={activeLayers}
            activeOption={activeOption}
            selectedSpecies={selectedSpecies}
            isLandscapeMode={isLandscapeMode}
            isFullscreenActive={isFullscreenActive}
            handleGlobeUpdating={handleGlobeUpdating}
            isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          />
        )}
        {isLandscapeMode && (
          <GridLayer handleGlobeUpdating={handleGlobeUpdating} />
        )}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3} />}
        {isLandscapeMode && <LabelsLayer activeLayers={activeLayers} />}
        {isLandscapeMode && (
          <ProtectedAreasTooltips
            activeLayers={activeLayers}
            isLandscapeMode={isLandscapeMode}
          />
        )}
      </Scene>
      {hasMetadata && <InfoModal />}
    </>
  );
};

export default DataGlobeComponent;
