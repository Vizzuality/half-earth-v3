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
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';
import Slider from 'components/slider';
import { MobileOnly, isMobile } from 'constants/responsive';
import About from 'components/about';
import UserDataModal from 'components/user-data-modal';

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
  isLandscapeSidebarCollapsed,
  isGlobeUpdating,
  hasMetadata,
  activeLayers,
  handleMapLoad,
  handleGlobeUpdating,
  activeOption,
  isHEModalOpen,
}) => {

  const isOnMobile = isMobile();

  return (
    <>
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      >
        {isGlobeUpdating && <Spinner floating />}
        <MobileOnly>
          <MenuFooter activeOption={activeOption} isSidebarOpen={isSidebarOpen} isLandscapeMode={isLandscapeMode} />
          <MenuSettings activeOption={activeOption} isHEModalOpen={isHEModalOpen} />
          <Slider />
        </MobileOnly>
        {!isOnMobile && <Switcher />}
        <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} />
        <ArcgisLayerManager activeLayers={activeLayers} />
        <Widgets isFullscreenActive={isFullscreenActive} isHEModalOpen={isHEModalOpen} />
        <DataGlobalSidebar
          isSidebarOpen={isSidebarOpen}
          activeOption={activeOption}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          isFullscreenActive={isFullscreenActive}
          activeCategory={activeCategory}
          isLandscapeMode={isLandscapeMode}
          isBiodiversityActive={isBiodiversityActive}
          activeLayers={activeLayers}
          handleGlobeUpdating={handleGlobeUpdating}
        />
        <Legend
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
          activeOption={activeOption}
        />
        <LandscapeSidebar
          isLandscapeMode={isLandscapeMode}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          activeOption={activeOption}
          activeLayers={activeLayers}
          selectedSpecies={selectedSpecies}
        />
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <TerrainExaggerationLayer exaggeration={3}/>}
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />}
      </Scene>
      <TutorialModal />
      {hasMetadata && <InfoModal />}
      {!isOnMobile && <About />}
      <UserDataModal />
    </>
  )
}

export default DataGlobeComponent;