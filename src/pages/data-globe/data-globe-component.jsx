import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';


import Scene from 'components/scene';
import Widgets from 'components/widgets';
import DataGlobalSidebar from 'components/data-global-sidebar';
import LandscapeViewManager from 'components/landscape-view-manager';
import Legend from 'components/legend';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import TutorialModal from 'components/tutorial/tutorial-modal';
import LabelsLayer from 'components/labels-layer';
import Spinner from 'components/spinner';
import Switcher from 'components/switcher';
import About from 'components/about';


const InfoModal = loadable(() => import('components/modal-metadata'));
const GridLayer = loadable(() => import('components/grid-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const ProtectedAreasTooltips = loadable(() => import('components/protected-areas-tooltips'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const DataGlobeComponent = ({
  sceneSettings,
  isFullscreenActive,
  isSidebarOpen,
  selectedSpecies,
  activeCategory,
  isLandscapeMode,
  isBiodiversityActive,
  isGlobeUpdating,
  isLegendActive,
  hasMetadata,
  activeLayers,
  rasters,
  handleMapLoad,
  handleGlobeUpdating,
  setRasters
}) => {
  return (
    <>
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      >
        {isGlobeUpdating && <Spinner floating />}
        <Switcher />
        <ArcgisLayerManager activeLayers={activeLayers} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} />
        <Widgets isFullscreenActive={isFullscreenActive}/>
        <DataGlobalSidebar
          isSidebarOpen={isSidebarOpen}
          isFullscreenActive={isFullscreenActive}
          activeCategory={activeCategory}
          isLandscapeMode={isLandscapeMode}
          isBiodiversityActive={isBiodiversityActive}
          activeLayers={activeLayers}
          rasters={rasters}
          handleGlobeUpdating={handleGlobeUpdating}
          setRasters={setRasters}
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
        {isLegendActive &&
          <Legend
            isFullscreenActive={isFullscreenActive}
            activeLayers={activeLayers}
            rasters={rasters}
          />
        }
      </Scene>
      <TutorialModal />
      {hasMetadata && <InfoModal />}
      <About />
    </>
  )
}

export default DataGlobeComponent;