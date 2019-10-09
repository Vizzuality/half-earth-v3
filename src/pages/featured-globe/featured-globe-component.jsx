import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';

import Scene from 'components/scene';
import Widgets from 'components/widgets';
import LandscapeViewManager from 'components/landscape-view-manager';
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

import { MobileOnly, isMobile } from 'constants/responsive';

import Switcher from 'components/switcher';
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
  rasters,
  selectedTaxa,
  onMapLoad,
  setRasters,
  handleLayerToggle,
  handleGlobeUpdating,
  spinGlobeHandle,
  spinGlobe,
  customFunctions,
  clickCallbacksArray,
  mouseMoveCallbacksArray,
  activeOption,
  isLandscapeSidebarCollapsed,
}) => {
  const isFeaturedPlaceCard = selectedFeaturedPlace && !isLandscapeMode;
  const isOnMobile = isMobile();
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard || isOnMobile;

  return (
    <>
      {!isMapsList && !isOnMobile && <Switcher />}
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
        style={{ pointerEvents: (isMapsList || isFeaturedPlaceCard) && !isOnMobile ? 'none' : '' }}
      >
        {isGlobeUpdating && <Spinner floating />}
        <MobileOnly>
          <MenuFooter featured selectedSidebar={selectedSidebar} selectedFeaturedMap={selectedFeaturedMap} activeOption={activeOption} isLandscapeMode={isLandscapeMode} />
          <MenuSettings activeOption={activeOption} isLandscapeMode={isLandscapeMode} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} />
          <Slider />
        </MobileOnly>
        <ArcgisLayerManager activeLayers={activeLayers} customFunctions={customFunctions}/>
        <GlobeEventsManager clickCallbacksArray={clickCallbacksArray} mouseMoveCallbacksArray={mouseMoveCallbacksArray} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} />
        <FeaturedPlaceViewManager selectedFeaturedPlace={selectedFeaturedPlace} isLandscapeMode={isLandscapeMode} />
        <Widgets isFullscreenActive={isFullscreenActive} hidden={esriWidgetsHidden}/>
        {selectedFeaturedMap &&
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
        }
        <FeaturedPlacesLayer
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
          isLandscapeMode={isLandscapeMode}
          handleLayerToggle={handleLayerToggle}
        />
        {!isLandscapeMode &&
          <PriorityPlacesPolygonsLayer
            selectedFeaturedMap={selectedFeaturedMap}
            selectedTaxa={selectedTaxa}
            isLandscapeMode={isLandscapeMode}
            isFullscreenActive={isFullscreenActive}
            handleLayerToggle={handleLayerToggle}
          />
        }
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
        <LandscapeSidebar
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          activeLayers={activeLayers}
          rasters={rasters}
          setRasters={setRasters}
          selectedSpecies={selectedSpecies}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          activeOption={activeOption}
        />
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3}/>}
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />}
        <Legend
          showLegend={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
          activeOption={activeOption}
          rasters={rasters}
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
      {!selectedFeaturedPlace && !isOnMobile && <About />}
    </>
  )
}

export default DataGlobeComponent;