/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

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
import Scene from 'components/scene';

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
  const [mapLayersTab, analyzeAreasTab] = getSidebarTabs();
  const [activeGlobesMenu, setActiveGlobesMenu] = useState(false);
  const analysisLayerHighlightEnabled =
    selectedAnalysisLayer &&
    selectedAnalysisTab === 'click' &&
    sidebarTabActive === analyzeAreasTab.slug;
  const sidebarHidden = isFullscreenActive;

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
      sceneSettings={sceneSettings}
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

      {!onboardingType && (
        <SideMenu
          openedModal={openedModal}
          activeLayers={updatedActiveLayers}
          isFullscreenActive={isFullscreenActive}
          onboardingStep={onboardingStep}
          blur={activeGlobesMenu}
        />
      )}

      <GlobePageIndicator onMouseEnter={() => setActiveGlobesMenu(true)} />

      <MapTooltip
        onActionButtonClick={handleTooltipActionButtonClick}
        speciesData={speciesData}
        precalculatedLayerSlug={
          mapTooltipData && mapTooltipData.precalculatedLayerSlug
        }
      />

      <LabelsLayer activeLayers={updatedActiveLayers} />

      {activeGlobesMenu && !onboardingType && (
        <GlobesMenu
          browsePage={browsePage}
          onMouseLeave={() => setActiveGlobesMenu(false)}
        />
      )}
    </Scene>
  );
}

export default DataSceneComponent;
