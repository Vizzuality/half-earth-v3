// Dependencies
import React, { useMemo } from 'react';
import cx from 'classnames';
import loadable from '@loadable/component';
// Components
import Scene from 'components/scene';
import Widgets from 'containers/widgets';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import MapTooltip from 'components/map-tooltip';
import MenuFooter from 'components/mobile-only/menu-footer';
import DataGlobalSidebar from 'containers/sidebars/data-global-sidebar';
import MenuSettings from 'components/mobile-only/menu-settings';
// Constants
import { MobileOnly, useMobile } from 'constants/responsive';

import styles from './data-scene-styles.module.scss';
import animationStyles from 'styles/common-animations.module.scss';

// Dynamic imports
const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const DataSceneComponent = ({
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
  isGlobeUpdating,
  isFullscreenActive,
  handleGlobeUpdating,
  countedActiveLayers,
  isBiodiversityActive,
  selectedAnalysisLayer,
  isLandscapeSidebarCollapsed,
  handleTooltipActionButtonClick,
  handleHighlightLayerFeatureClick,
}) => {
  const isMobile = useMobile();
  const sidebarHidden = isFullscreenActive || isMobile;
  const updatedSceneSettings = useMemo(
    () => ({ ...sceneSettings, ...(isMobile && { padding: { left: 0 } }) }),
    [isMobile]
  );
  return (
    <>
      <Scene
        onMapLoad={onMapLoad}
        sceneName={'data-scene'}
        sceneSettings={updatedSceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        initialRotation
      >
        <ArcgisLayerManager
          userConfig={userConfig}
          activeLayers={activeLayers}
        />
        {isGlobeUpdating && <Spinner floating />}
        <DataGlobalSidebar
          activeLayers={activeLayers}
          activeOption={activeOption}
          isSidebarOpen={isSidebarOpen}
          activeCategory={activeCategory}
          isFullscreenActive={isFullscreenActive}
          countedActiveLayers={countedActiveLayers}
          handleGlobeUpdating={handleGlobeUpdating}
          isBiodiversityActive={isBiodiversityActive}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          className={cx(styles.sidebarContainer, {
            [animationStyles.leftHidden]: sidebarHidden,
          })}
        />
        <MobileOnly>
          <MenuFooter
            activeOption={activeOption}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
        </MobileOnly>
        <CountryLabelsLayer
          sceneMode={sceneMode}
          countryISO={countryISO}
          countryName={countryName}
          activeLayers={activeLayers}
        />
        {selectedAnalysisLayer && (
          <FeatureHighlightLayer
            featureLayerSlugs={selectedAnalysisLayer.slug}
            onFeatureClick={handleHighlightLayerFeatureClick}
          />
        )}
        <Widgets
          openedModal={openedModal}
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
        />
        <MapTooltip onActionButtonClick={handleTooltipActionButtonClick} />
        <LabelsLayer activeLayers={activeLayers} />
      </Scene>
    </>
  );
};

export default DataSceneComponent;
