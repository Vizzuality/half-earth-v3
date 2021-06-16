// Dependencies
import React from 'react';
import cx from 'classnames';
import loadable from '@loadable/component'
// Components
import Scene from 'components/scene';
import Legend from 'components/legend';
import Widgets from 'components/widgets';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import CountryLabelsLayer from 'components/country-labels-layer';
import CountriesBordersLayer from 'components/countries-borders-layer';
import LandscapeViewManager from 'components/landscape-view-manager';
import CountryEntryTooltip from 'components/country-entry-tooltip';
import MenuFooter from 'components/mobile-only/menu-footer';
import DataGlobalSidebar from 'components/data-global-sidebar';
import MenuSettings from 'components/mobile-only/menu-settings';
import Slider from 'components/slider';
// Constants
import { ZOOM_LEVEL_TRIGGER } from 'constants/landscape-view-constants';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
import { MobileOnly, useMobile } from 'constants/responsive';

import styles from './data-scene-styles.module.scss';
import animationStyles from 'styles/common-animations.module.scss';
// Dynamic imports
const Spinner = loadable(() => import('components/spinner'));
const GridLayer = loadable(() => import('components/grid-layer'));
const LabelsLayer = loadable(() => import('components/labels-layer'));
const ProtectedAreasTooltips = loadable(() => import('components/protected-areas-tooltips'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const CountrySceneComponent = ({
  view,
  sceneMode,
  onMapLoad,
  userConfig,
  countryISO,
  countryName,
  openedModal,
  activeLayers,
  activeOption,
  sceneSettings,
  isSidebarOpen,
  activeCategory,
  isLandscapeMode,
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
        <CountryLabelsLayer
          activeLayers={activeLayers}
          countryISO={countryISO}
          isLandscapeMode={isLandscapeMode}
          countryName={countryName}
          sceneMode={sceneMode}
        />
        <CountriesBordersLayer
          countryISO={countryISO}
          isLandscapeMode={isLandscapeMode}
          spatialReference={LOCAL_SPATIAL_REFERENCE}
        />
        <Legend
          isFullscreenActive={isFullscreenActive}
          activeLayers={activeLayers}
        />
        <Widgets
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
          openedModal={openedModal}
        />
        <CountryEntryTooltip
          countryISO={countryISO}
          countryName={countryName}
          sceneMode={sceneMode}
        />
        <LabelsLayer activeLayers={activeLayers} />
        {isLandscapeMode && (
          <GridLayer handleGlobeUpdating={handleGlobeUpdating} />
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
