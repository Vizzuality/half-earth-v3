/* eslint-disable max-len */
import React, { useMemo, useState, useEffect } from 'react';

import loadable from '@loadable/component';

import cx from 'classnames';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import GlobePageIndicator from 'containers/menus/globe-page-indicator';
import GlobesMenu from 'containers/menus/globes-menu';
import SideMenu from 'containers/menus/sidemenu';
import SoundButton from 'containers/onboarding/sound-btn';
import OnboardingTooltip from 'containers/onboarding/tooltip';
import DataGlobalSidebar from 'containers/sidebars/data-global-sidebar';

import MapTooltip from 'components/map-tooltip';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';
import Scene from 'components/scene';

import { ONBOARDING_TYPE_CENTER } from 'constants/onboarding-constants';
import { MobileOnly, useMobile } from 'constants/responsive';
import { getSidebarTabs } from 'constants/ui-params';

import animationStyles from 'styles/common-animations.module.scss';
import uiStyles from 'styles/ui.module';

import styles from './data-scene-styles.module.scss';

const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function DataSceneComponent({
  sceneMode,
  onMapLoad,
  countryISO,
  countryName,
  openedModal,
  activeOption,
  sceneSettings,
  isSidebarOpen,
  activeCategory,
  isGlobeUpdating,
  isFullscreenActive,
  handleGlobeUpdating,
  isBiodiversityActive,
  selectedAnalysisLayer,
  handleTooltipActionButtonClick,
  handleHighlightLayerFeatureClick,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  aoiId,
  speciesData,
  browsePage,
  updatedActiveLayers,
  mapTooltipData,
  sidebarTabActive,
  setSidebarTabActive,
  selectedAnalysisTab,
}) {
  const isMobile = useMobile();
  const [mapLayersTab, analyzeAreasTab] = getSidebarTabs();
  const [activeGlobesMenu, setActiveGlobesMenu] = useState(false);
  const analysisLayerHighlightEnabled =
    selectedAnalysisLayer &&
    selectedAnalysisTab === 'click' &&
    sidebarTabActive === analyzeAreasTab.slug;
  const sidebarHidden = isFullscreenActive || isMobile;
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

  // Always show the first tab on onboarding mode
  useEffect(() => {
    if (onboardingType) {
      setSidebarTabActive(mapLayersTab.slug);
    }
  }, [onboardingType]);

  return (
    <Scene
      onMapLoad={onMapLoad}
      sceneName="data-scene"
      sceneSettings={updatedSceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      initialRotation
      blur={activeGlobesMenu}
      className={cx({
        [uiStyles.blurScene]: activeGlobesMenu && !onboardingType,
      })}
    >
      {!!onboardingType && <SoundButton />}
      <OnboardingTooltip />

      <ArcgisLayerManager activeLayers={updatedActiveLayers} />

      {isGlobeUpdating && <Spinner floating />}

      <DataGlobalSidebar
        activeLayers={updatedActiveLayers}
        activeOption={activeOption}
        isSidebarOpen={isSidebarOpen}
        activeCategory={activeCategory}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        isBiodiversityActive={isBiodiversityActive}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
        aoiId={aoiId}
        className={cx(styles.sidebarContainer, {
          [animationStyles.leftHidden]: sidebarHidden,
          [uiStyles.blur]: activeGlobesMenu && !onboardingType,
        })}
      />

      <MobileOnly>
        <MenuFooter activeOption={activeOption} isSidebarOpen={isSidebarOpen} />
        <MenuSettings activeOption={activeOption} openedModal={openedModal} />
      </MobileOnly>

      <CountryLabelsLayer
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        activeLayers={updatedActiveLayers}
      />

      {analysisLayerHighlightEnabled && (
        <FeatureHighlightLayer
          featureLayerSlugs={selectedAnalysisLayer}
          onFeatureClick={handleHighlightLayerFeatureClick}
        />
      )}

      {!isMobile && !onboardingType && (
        <SideMenu
          openedModal={openedModal}
          activeLayers={updatedActiveLayers}
          isFullscreenActive={isFullscreenActive}
          onboardingStep={onboardingStep}
          blur={activeGlobesMenu}
        />
      )}

      {!isMobile && (
        <GlobePageIndicator onMouseEnter={() => setActiveGlobesMenu(true)} />
      )}

      <MapTooltip
        onActionButtonClick={handleTooltipActionButtonClick}
        speciesData={speciesData}
        precalculatedLayerSlug={
          mapTooltipData && mapTooltipData.precalculatedLayerSlug
        }
      />

      <LabelsLayer activeLayers={updatedActiveLayers} />

      {activeGlobesMenu && !isMobile && !onboardingType && (
        <GlobesMenu
          browsePage={browsePage}
          onMouseLeave={() => setActiveGlobesMenu(false)}
        />
      )}
    </Scene>
  );
}

export default DataSceneComponent;
