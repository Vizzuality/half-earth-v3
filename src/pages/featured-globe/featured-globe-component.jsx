import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';

import Scene from 'components/scene';
import Widgets from 'components/widgets';
import LandscapeViewManager from 'components/landscape-view-manager';
import MainMenu from 'components/main-menu';
import GlobeEventsManager from 'components/globe-events-manager';
import Legend from 'components/legend';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LabelsLayer from 'components/labels-layer';
import Spinner from 'components/spinner';
import FeaturedPlaceViewManager from 'components/featured-place-view-manager';
import SelectedFeaturedMapCard from 'components/featured-map-card';
import FeaturedTaxaSelector from 'components/featured-taxa-selector';
import FeaturedPlacesLayer from 'components/featured-places-layer';
import HalfEarthLogo from 'components/half-earth-logo';

import { MobileOnly, useMobile } from 'constants/responsive';

import Slider from 'components/slider';
import FeaturedMapsList from 'components/featured-maps-list';
import TutorialModal from 'components/tutorial/tutorial-modal';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));
const GridLayer = loadable(() => import('components/grid-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const PriorityPlacesPolygonsLayer = loadable(() => import('components/priority-places-polygons-layer'));
const FeaturedPlaceCard = loadable(() => import('components/featured-place-card'));
const About = loadable(() => import('components/about'));
const ProtectedAreasTooltips = loadable(() => import('components/protected-areas-tooltips'));


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
  handleGlobeUpdating,
  spinGlobeHandle,
  spinGlobe,
  customFunctions,
  clickCallbacksArray,
  mouseMoveCallbacksArray,
  activeOption,
  isLandscapeSidebarCollapsed,
  openedModal,
  userConfig
}) => {
  const isFeaturedPlaceCard = selectedFeaturedPlace && !isLandscapeMode;
  const isOnMobile = useMobile();
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard || isOnMobile;

  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft}/> 
      <MainMenu />
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
        {!isLandscapeMode && (
          <PriorityPlacesPolygonsLayer
            selectedFeaturedMap={selectedFeaturedMap}
            selectedTaxa={selectedTaxa}
            isLandscapeMode={isLandscapeMode}
            isFullscreenActive={isFullscreenActive}
            handleLayerToggle={handleLayerToggle}
          />
        )}
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
        <Legend
          showLegend={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
          activeOption={activeOption}
        />
        <TutorialModal />
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
    </>
  );
}

export default DataGlobeComponent;