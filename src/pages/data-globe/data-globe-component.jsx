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
import MaskCountryManager from 'components/mask-country-manager';

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
  countedActiveLayers,
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
          rasters={rasters}
          sceneMode={sceneMode}
          setRasters={setRasters}
          countryName={countryName}
          activeLayers={activeLayers}
          isCountryMode={isCountryMode}
          activeCategory={activeCategory}
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          countedActiveLayers={countedActiveLayers}
          />
        {isCountryMode &&
          <LocalSceneSidebar
            rasters={rasters}
            setRasters={setRasters}
            countryISO={countryISO}
            countryName={countryName}
            activeLayers={activeLayers}
            activeCategory={activeCategory}
            isFullscreenActive={isFullscreenActive}
            handleGlobeUpdating={handleGlobeUpdating}
            countedActiveLayers={countedActiveLayers}
          />
        }
        <LandscapeSidebar
          rasters={rasters}
          setRasters={setRasters}
          activeLayers={activeLayers}
          activeOption={activeOption}
          selectedSpecies={selectedSpecies}
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          handleGlobeUpdating={handleGlobeUpdating}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        />
        <Legend
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
          activeOption={activeOption}
          rasters={rasters}
        />
        <CountryBorderLayer countryISO={countryISO} isCountryMode={isCountryMode}/>
        <CountryLabelsLayer countryISO={countryISO} isCountryMode={isCountryMode} isLandscapeMode={isLandscapeMode} countryName={countryName} countryExtent={countryExtent}/>
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {(isLandscapeMode || isCountryMode) && <TerrainExaggerationLayer exaggeration={isCountryMode ? 20 : 3}/>}
        <LabelsLayer isLandscapeMode={isLandscapeMode} isCountryMode={isCountryMode} countryName={countryName}/>
        <MaskCountryManager countryISO={countryISO} countryExtent={countryExtent} isCountryMode={isCountryMode} sceneMode={sceneMode}/>
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