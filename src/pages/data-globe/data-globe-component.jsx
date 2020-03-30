import React from 'react';
import loadable from '@loadable/component'
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';

import DoubleScene from 'components/double-scene';
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
import { LOCAL_SCENE } from 'constants/view-props';
import About from 'components/about';
import UserDataModal from 'components/user-data-modal';
import CountryLabelsLayer from 'components/country-labels-layer';
import CountryBorderLayer from 'components/country-border-layer';

const InfoModal = loadable(() => import('components/modal-metadata'));
const GridLayer = loadable(() => import('components/grid-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const ProtectedAreasTooltips = loadable(() => import('components/protected-areas-tooltips'));
const LocalSceneSidebar = loadable(() => import('components/local-scene-sidebar'));

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
  rasters,
  handleMapLoad,
  handleGlobeUpdating,
  setRasters,
  activeOption,
  isHEModalOpen,
  countryISO,
  countryName,
  sceneMode,
  countryExtent
}) => {
  
  const isOnMobile = isMobile();
  const isCountryMode = sceneMode === LOCAL_SCENE;

  return (
    <>
      <DoubleScene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        sceneMode={sceneMode}
        countryExtent={countryExtent}
      >
        {isGlobeUpdating && <Spinner floating />}
        <MobileOnly>
          <MenuFooter activeOption={activeOption} isSidebarOpen={isSidebarOpen} isLandscapeMode={isLandscapeMode} />
          <MenuSettings activeOption={activeOption} isHEModalOpen={isHEModalOpen} />
          <Slider />
        </MobileOnly>
        {!isOnMobile && <Switcher />}
        <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} countryISO={countryISO}/>
        <ArcgisLayerManager activeLayers={activeLayers} />
        <Widgets isFullscreenActive={isFullscreenActive} isHEModalOpen={isHEModalOpen} />
        <DataGlobalSidebar
          isSidebarOpen={isSidebarOpen}
          activeOption={activeOption}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          isFullscreenActive={isFullscreenActive}
          activeCategory={activeCategory}
          isLandscapeMode={isLandscapeMode}
          isCountryMode={isCountryMode}
          isBiodiversityActive={isBiodiversityActive}
          activeLayers={activeLayers}
          rasters={rasters}
          handleGlobeUpdating={handleGlobeUpdating}
          setRasters={setRasters}
          sceneMode={sceneMode}
          countryISO={countryISO}
          countryName={countryName}
        />
        <Legend
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
          activeOption={activeOption}
          rasters={rasters}
        />
        <LandscapeSidebar
          isLandscapeMode={isLandscapeMode}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          activeOption={activeOption}
          activeLayers={activeLayers}
          rasters={rasters}
          setRasters={setRasters}
          selectedSpecies={selectedSpecies}
        />
        <CountryLabelsLayer countryISO={countryISO} isLandscapeMode={isLandscapeMode}/>
        <CountryBorderLayer countryISO={countryISO}/>
        {isCountryMode && <LocalSceneSidebar countryISO={countryISO} />}
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {(isLandscapeMode || sceneMode === 'local') && <TerrainExaggerationLayer exaggeration={sceneMode === 'local' ? 20 : 3}/>}
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />}
      </DoubleScene>
      <TutorialModal />
      {hasMetadata && <InfoModal />}
      {!isOnMobile && <About />}
      <UserDataModal />
    </>
  )
}

export default DataGlobeComponent;