// Dependencies
import React, { useMemo, useRef } from 'react';
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
import OnboardingTooltip from 'containers/onboarding/tooltip';
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
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) => {
  const isMobile = useMobile();
  const sidebarHidden = isLandscapeMode || isFullscreenActive || isMobile;
  const updatedSceneSettings = useMemo(
    () => ({ ...sceneSettings, ...(isMobile && { padding: { left: 0 } }) }),
    [isMobile]
  );

  const tooltipPlacement = useMemo(() => {
    if (onboardingStep === 0)
      return {
        // Biodiversity card
        left: '470px',
        top: '222px',
      };
    if (onboardingStep === 1)
      return {
        // Richness
        left: '308px',
        top: '378px',
      };
    if (onboardingStep === 2)
      return {
        // Rarity
        left: '438px',
        top: '378px',
      };
    if (onboardingStep === 3)
      return {
        // Protection
        left: '470px',
        top: '354px',
      };
    if (onboardingStep === 4)
      return {
        // Human Pressures
        display: 'none',
      };
    return null;
  }, [onboardingStep]);

  return (
    <>
      <Scene
        onMapLoad={onMapLoad}
        sceneName={'data-scene'}
        sceneSettings={updatedSceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        initialRotation
        disabled={!!onboardingType}
      >
        {!!onboardingType && <SoundButton />}

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
          onboardingStep={onboardingStep}
          onboardingType={onboardingType}
          waitingInteraction={waitingInteraction}
          className={cx(styles.sidebarContainer, {
            [animationStyles.leftHidden]: sidebarHidden,
          })}
        />

        <OnboardingTooltip tooltipPlacement={tooltipPlacement} />
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
          onboardingStep={onboardingStep}
        />
        <MapTooltip onActionButtonClick={handleTooltipActionButtonClick} />
        <LabelsLayer activeLayers={activeLayers} />
      </Scene>
    </>
  );
};

export default DataSceneComponent;
