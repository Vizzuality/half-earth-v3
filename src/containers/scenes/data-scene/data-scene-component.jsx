// Dependencies
import React, { useMemo } from 'react';
import loadable from '@loadable/component';
import cx from 'classnames';
// Components
import Scene from 'components/scene';
import MapTooltip from 'components/map-tooltip';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import SoundButton from 'containers/onboarding/sound-btn';
import DataGlobalSidebar from 'containers/sidebars/data-global-sidebar';
import Tooltip from 'containers/onboarding/tooltip';
import Widgets from 'containers/widgets';
// Constants
import { MobileOnly, useMobile } from 'constants/responsive';
// Styles
import animationStyles from 'styles/common-animations.module.scss';
import styles from './data-scene-styles.module.scss';
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
  isLandscapeMode,
  isGlobeUpdating,
  isFullscreenActive,
  handleGlobeUpdating,
  countedActiveLayers,
  isBiodiversityActive,
  selectedAnalysisLayer,
  isLandscapeSidebarCollapsed,
  handleTooltipActionButtonClick,
  handleHighlightLayerFeatureClick,
  onBoardingType,
  onBoardingStep,
  waitingInteraction,
}) => {
  const isMobile = useMobile();
  const sidebarHidden = isLandscapeMode || isFullscreenActive || isMobile;
  const updatedSceneSettings = useMemo(
    () => ({ ...sceneSettings, ...(isMobile && { padding: { left: 0 } }) }),
    [isMobile]
  );

  const TOOLTIP_PLACEMENT = useMemo(() => {
    if (onBoardingStep === 0)
      return {
        // Biodiversity card
        left: '470px',
        top: '222px',
      };
    if (onBoardingStep === 1)
      return {
        // Richness
        left: '308px',
        top: '378px',
      };
    if (onBoardingStep === 2)
      return {
        // Rarity
        left: '438px',
        top: '378px',
      };
    if (onBoardingStep === 3)
      return {
        // Protection
        left: '470px',
        top: '354px',
      };
    if (onBoardingStep === 4)
      return {
        // Human Pressures
        display: 'none',
      };
    return null;
  }, [onBoardingStep]);

  return (
    <>
      <Scene
        onMapLoad={onMapLoad}
        sceneName={'data-scene'}
        sceneSettings={updatedSceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        initialRotation
        disabled={!!onBoardingType}
      >
        {!!onBoardingType && <SoundButton />}

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
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
          countedActiveLayers={countedActiveLayers}
          handleGlobeUpdating={handleGlobeUpdating}
          isBiodiversityActive={isBiodiversityActive}
          isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
          onBoardingStep={onBoardingStep}
          onBoardingType={onBoardingType}
          waitingInteraction={waitingInteraction}
          className={cx(styles.sidebarContainer, {
            [animationStyles.leftHidden]: sidebarHidden,
          })}
        />

        {typeof onBoardingStep === 'number' && (
          <div className={styles.tooltipPlacement} style={TOOLTIP_PLACEMENT}>
            <Tooltip />
          </div>
        )}

        <MobileOnly>
          <MenuFooter
            activeOption={activeOption}
            isSidebarOpen={isSidebarOpen}
            isLandscapeMode={isLandscapeMode}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
        </MobileOnly>
        <CountryLabelsLayer
          sceneMode={sceneMode}
          countryISO={countryISO}
          countryName={countryName}
          activeLayers={activeLayers}
          isLandscapeMode={isLandscapeMode}
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
          onBoardingStep={onBoardingStep}
        />
        <MapTooltip onActionButtonClick={handleTooltipActionButtonClick} />
        <LabelsLayer activeLayers={activeLayers} />
      </Scene>
    </>
  );
};

export default DataSceneComponent;
