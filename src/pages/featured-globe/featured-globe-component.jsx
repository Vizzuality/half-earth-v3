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
import Switcher from 'components/switcher';
import FeaturedMapsList from 'components/featured-maps-list';

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
  isLegendActive,
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
  mouseMoveCallbacksArray
}) => {
  const isFeaturedPlaceCard = selectedFeaturedPlace && !isLandscapeMode;
  const esriWidgetsHidden = isMapsList || isFeaturedPlaceCard;
  return (
    <>
      <Switcher />
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
        style={{ pointerEvents: isMapsList || isFeaturedPlaceCard ? 'none' : '' }}
      >
        {isGlobeUpdating && <Spinner floating />}
        <ArcgisLayerManager activeLayers={activeLayers} customFunctions={customFunctions}/>
        <GlobeEventsManager clickCallbacksArray={clickCallbacksArray} mouseMoveCallbacksArray={mouseMoveCallbacksArray} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} />
        <FeaturedPlaceViewManager selectedFeaturedPlace={selectedFeaturedPlace} />
        {!esriWidgetsHidden && <Widgets isFullscreenActive={isFullscreenActive}/>}
        {selectedFeaturedMap &&
          <SelectedFeaturedMapCard
            className={uiStyles.uiTopLeft}
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
        <FeaturedPlaceCard
          isFullscreenActive={isFullscreenActive}
          isLandscapeMode={isLandscapeMode}
          selectedFeaturedPlace={selectedFeaturedPlace}
          selectedFeaturedMap={selectedFeaturedMap}
          selectedTaxa={selectedTaxa}
        />
        <LandscapeSidebar
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          activeLayers={activeLayers}
          rasters={rasters}
          setRasters={setRasters}
          selectedSpecies={selectedSpecies}
        />
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3}/>}
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />}
        {isLandscapeMode &&
          <Legend
            isFullscreenActive={isFullscreenActive}
            activeLayers={activeLayers}
            rasters={rasters}
          />
        }
      </Scene>
      <FeaturedMapsList
        className={uiStyles.uiTopLeft}
        selectedSidebar={selectedSidebar}
        isFullscreenActive={isFullscreenActive}
        isLandscapeMode={isLandscapeMode}
        handle={spinGlobeHandle}
      />
      {hasMetadata && <InfoModal />}
      {!selectedFeaturedPlace && <About />}
    </>
  )
}

export default DataGlobeComponent;