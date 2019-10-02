import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';


import Scene from 'components/scene';
import Widgets from 'components/widgets';
import LandscapeViewManager from 'components/landscape-view-manager';
import Legend from 'components/legend';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LabelsLayer from 'components/labels-layer';
import Spinner from 'components/spinner';
import SelectedFeaturedMapCard from 'components/featured-map-card';
import Switcher from 'components/switcher';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));
const GridLayer = loadable(() => import('components/grid-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));



const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const DataGlobeComponentSimple = ({
  sceneSettings,
  isFullscreenActive,
  selectedFeaturedMap,
  selectedSpecies,
  selectedSidebar,
  isLandscapeMode,
  selectedFeaturedPlace,
  isGlobeUpdating,
  isLegendActive,
  hasMetadata,
  activeLayers,
  rasters,
  onLoad,
  handleGlobeUpdating,
  setRasters
}) => {
  console.log(selectedFeaturedMap)
  return (
    <>
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onLoad={onLoad}
      >
        {isGlobeUpdating && <Spinner floating />}
        <Switcher />
        <ArcgisLayerManager activeLayers={activeLayers} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} />
        <Widgets isFullscreenActive={isFullscreenActive}/>
        {selectedFeaturedMap &&
          <SelectedFeaturedMapCard
            className={uiStyles.uiTopLeft}
            selectedFeaturedMap={selectedFeaturedMap}
            selectedSidebar={selectedSidebar}
            isFullscreenActive={isFullscreenActive}
            isLandscapeMode={isLandscapeMode}
            selectedFeaturedPlace={selectedFeaturedPlace}
          />
        }
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
        {isLegendActive &&
          <Legend
            isFullscreenActive={isFullscreenActive}
            activeLayers={activeLayers}
            rasters={rasters}
          />
        }
      </Scene>
      {hasMetadata && <InfoModal />}
    </>
  )
}

export default DataGlobeComponentSimple;