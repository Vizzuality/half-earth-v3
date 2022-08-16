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
import OnboardingTooltip from 'containers/onboarding/tooltip';
import Widgets from 'containers/widgets';
// Constants
import { MobileOnly, useMobile } from 'constants/responsive';
import { ONBOARDING_TYPE_CENTER } from 'constants/onboarding-constants';
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
  isBiodiversityActive,
  selectedAnalysisLayer,
  isLandscapeSidebarCollapsed,
  handleTooltipActionButtonClick,
  handleHighlightLayerFeatureClick,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  speciesData,
}) => {
  const isMobile = useMobile();
  const sidebarHidden = isLandscapeMode || isFullscreenActive || isMobile;
  const updatedSceneSettings = useMemo(
    () => ({
      ...sceneSettings,
      center:
        onboardingType === 'priority-places'
          ? ONBOARDING_TYPE_CENTER['priority-places']
          : sceneSettings.center,
      ...(isMobile && { padding: { left: 0 } }),
    }),
    [isMobile, onboardingType]
  );

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
        <OnboardingTooltip />

        <ArcgisLayerManager activeLayers={activeLayers} />

        {isGlobeUpdating && <Spinner floating />}

        <DataGlobalSidebar
          activeLayers={activeLayers}
          activeOption={activeOption}
          isSidebarOpen={isSidebarOpen}
          activeCategory={activeCategory}
          isLandscapeMode={isLandscapeMode}
          isFullscreenActive={isFullscreenActive}
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
        <MapTooltip
          onActionButtonClick={handleTooltipActionButtonClick}
          speciesData={speciesData}
        />
        <LabelsLayer activeLayers={activeLayers} />
      </Scene>
    </>
  );
};

export default DataSceneComponent;
