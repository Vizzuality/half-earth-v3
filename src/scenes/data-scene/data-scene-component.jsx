// Dependencies
import React from 'react';
import cx from 'classnames';
import loadable from '@loadable/component'
// Components
import Scene from 'components/scene';
import Legend from 'components/legend';
import Widgets from 'components/widgets';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import LandscapeViewManager from 'components/landscape-view-manager';
import MenuFooter from 'components/mobile-only/menu-footer';
import DataGlobalSidebar from 'components/data-global-sidebar';
import MenuSettings from 'components/mobile-only/menu-settings';
import Slider from 'components/slider';
// Constants
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { MobileOnly, useMobile } from 'constants/responsive';

import styles from './data-scene-styles.module.scss';
import animationStyles from 'styles/common-animations.module.scss';
// Dynamic imports
const Spinner = loadable(() => import('components/spinner'));
const GridLayer = loadable(() => import('components/grid-layer'));
const LabelsLayer = loadable(() => import('components/labels-layer'));
const LandscapeSidebar = loadable(() => import('components/landscape-sidebar'));
const ProtectedAreasTooltips = loadable(() => import('components/protected-areas-tooltips'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const CountrySceneComponent = ({
  onMapLoad,
  userConfig,
  countryISO,
  openedModal,
  activeLayers,
  activeOption,
  sceneSettings,
  isSidebarOpen,
  activeCategory,
  isLandscapeMode,
  selectedSpecies,
  isGlobeUpdating,
  isFullscreenActive,
  handleGlobeUpdating,
  countedActiveLayers,
  isBiodiversityActive,
  isLandscapeSidebarCollapsed
}) => {

  const sidebarHidden =  isLandscapeMode || isFullscreenActive || useMobile();
  return (
    <>
      <Scene
        sceneName={'data-scene'}
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
      >
        <ArcgisLayerManager
          activeLayers={activeLayers}
          userConfig={userConfig}
        />
        {isGlobeUpdating && <Spinner floating />}
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
          className={cx(styles.sidebarContainer, {[animationStyles.leftHidden]: sidebarHidden})}
        />
        <MobileOnly>
          <MenuFooter
            activeOption={activeOption}
            isSidebarOpen={isSidebarOpen}
            isLandscapeMode={isLandscapeMode}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
          <Slider />
        </MobileOnly>
        <LandscapeViewManager
          zoomLevelTrigger={ZOOM_LEVEL_TRIGGER}
          isLandscapeMode={isLandscapeMode}
          countryISO={countryISO}
        />
        <Legend
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
        />
        <Widgets
          activeLayers={activeLayers}
          openedModal={openedModal}
        />
        <LabelsLayer activeLayers={activeLayers} />
        {isLandscapeMode && (
          <GridLayer handleGlobeUpdating={handleGlobeUpdating} />
        )}
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
          <ProtectedAreasTooltips
            activeLayers={activeLayers}
            isLandscapeMode={isLandscapeMode}
          />
        )}
      </Scene>
    </>
  );
}

export default CountrySceneComponent;
