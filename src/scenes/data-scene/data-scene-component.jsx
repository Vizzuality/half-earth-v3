// Dependencies
import React from 'react';
import loadable from '@loadable/component'
// Components
import Scene from 'components/scene';
import Legend from 'components/legend';
import Slider from 'components/slider';
import Widgets from 'components/widgets';
import Switcher from 'components/switcher';
import MenuFooter from 'components/mobile-only/menu-footer';
import TutorialModal from 'components/tutorial/tutorial-modal';
import DataGlobalSidebar from 'components/data-global-sidebar';
import MenuSettings from 'components/mobile-only/menu-settings';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import CountryLabelsLayer from 'components/country-labels-layer';
import CountryBorderLayer from 'components/country-border-layer';
import LandscapeViewManager from 'components/landscape-view-manager';
import TerrainExaggerationLayer from 'components/terrain-exaggeration-layer';
// Constants
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
// Utils
import { MobileOnly, useMobile } from 'constants/responsive';
// Dynamic imports
const About = loadable(() => import('components/about'));
const Spinner = loadable(() => import('components/spinner'));
const GridLayer = loadable(() => import('components/grid-layer'));
const InfoModal = loadable(() => import('components/modal-metadata'));
const LabelsLayer = loadable(() => import('components/labels-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const ProtectedAreasTooltips = loadable(() => import('components/protected-areas-tooltips'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const CountrySceneComponent = ({
  sceneMode,
  onMapLoad,
  countryISO,
  countryName,
  hasMetadata,
  activeLayers,
  activeOption,
  sceneSettings,
  isSidebarOpen,
  isHEModalOpen,
  activeCategory,
  isLandscapeMode,
  isGlobeUpdating,
  selectedSpecies,
  isFullscreenActive,
  countedActiveLayers,
  handleGlobeUpdating,
  isBiodiversityActive,
  isLandscapeSidebarCollapsed,
}) => {
  const isOnMobile = useMobile();
  return (
    <>
      <Scene
        sceneId='e96f61b2e79442b698ec2cec68af6db9'
        sceneName={'data-scene'}
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
      >
        {isGlobeUpdating && <Spinner floating />}
        {!isOnMobile && <Switcher />}
        <MobileOnly>
          <MenuFooter activeOption={activeOption} isSidebarOpen={isSidebarOpen} isLandscapeMode={isLandscapeMode} />
          <MenuSettings activeOption={activeOption} isHEModalOpen={isHEModalOpen} />
          <Slider />
        </MobileOnly>
        <LandscapeViewManager zoomLevelTrigger={ZOOM_LEVEL_TRIGGER} isLandscapeMode={isLandscapeMode} countryISO={countryISO}/>
        <CountryLabelsLayer countryISO={countryISO} isLandscapeMode={isLandscapeMode} countryName={countryName} sceneMode={sceneMode}/>
        <ArcgisLayerManager activeLayers={activeLayers} />
        <CountryBorderLayer
          sceneMode={sceneMode}
          countryISO={countryISO}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <DataGlobalSidebar
          activeLayers={activeLayers}
          activeOption={activeOption}
          isSidebarOpen={isSidebarOpen}
          activeCategory={activeCategory}
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          countedActiveLayers={countedActiveLayers}
          handleGlobeUpdating={handleGlobeUpdating}
          isBiodiversityActive={isBiodiversityActive}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        />
        {isLandscapeMode &&
          <LandscapeSidebar
            activeLayers={activeLayers}
            activeOption={activeOption}
            selectedSpecies={selectedSpecies}
            isLandscapeMode={isLandscapeMode}
            isFullscreenActive={isFullscreenActive}
            handleGlobeUpdating={handleGlobeUpdating}
            isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          />
        }
        <Legend
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
        />
        <Widgets isFullscreenActive={isFullscreenActive} isHEModalOpen={isHEModalOpen} />
        <TerrainExaggerationLayer exaggeration={3}/>
        {isLandscapeMode && <LabelsLayer />}
        {isLandscapeMode && <GridLayer handleGlobeUpdating={handleGlobeUpdating}/>}
        {isLandscapeMode && <ProtectedAreasTooltips activeLayers={activeLayers} isLandscapeMode={isLandscapeMode} />}
      </Scene>
      <TutorialModal />
      {hasMetadata && <InfoModal />}
      {!isOnMobile && <About />}
    </>
  )
}

export default CountrySceneComponent;
