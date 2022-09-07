import React, { useMemo } from 'react';

import loadable from '@loadable/component';

import cx from 'classnames';

import useIsCursorBottom from 'hooks/use-cursor-bottom';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import GlobePageIndicator from 'containers/menus/globe-page-indicator';
import GlobesMenu from 'containers/menus/globes-menu';
import SideMenu from 'containers/menus/sidemenu';
import SoundButton from 'containers/onboarding/sound-btn';
import OnboardingTooltip from 'containers/onboarding/tooltip';
import DataGlobalSidebar from 'containers/sidebars/data-global-sidebar';
import Widgets from 'containers/widgets';

import MapTooltip from 'components/map-tooltip';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';
import Scene from 'components/scene';

import { WDPA_OECM_FEATURE_LAYER } from 'constants/layers-slugs';
import { ONBOARDING_TYPE_CENTER } from 'constants/onboarding-constants';
import { MobileOnly, useMobile } from 'constants/responsive';

import animationStyles from 'styles/common-animations.module.scss';
import uiStyles from 'styles/ui.module';

import styles from './data-scene-styles.module.scss';

const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const {
  REACT_APP_ARGISJS_API_VERSION: API_VERSION,
  REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS,
} = process.env;

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
  aoiId,
  speciesData,
  browsePage,
  updatedActiveLayers,
}) {
  const isMobile = useMobile();
  const cursorBottom = useIsCursorBottom({ });
  const sidebarHidden = isLandscapeMode || isFullscreenActive || isMobile;
  const isProtectedArea = selectedAnalysisLayer
  && selectedAnalysisLayer.slug === WDPA_OECM_FEATURE_LAYER;
  const updatedSceneSettings = useMemo(
    () => ({
      ...sceneSettings,
      center:
        onboardingType === 'priority-places'
          ? ONBOARDING_TYPE_CENTER['priority-places']
          : sceneSettings.center,
      ...(isMobile && { padding: { left: 0 } }),
    }),
    [isMobile, onboardingType],
  );

  return (
    <Scene
      onMapLoad={onMapLoad}
      sceneName="data-scene"
      sceneSettings={updatedSceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      initialRotation
      disabled={!!onboardingType}
      className={cx({
        [uiStyles.blurScene]: cursorBottom && !onboardingType && FEATURE_NEW_MENUS,
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
        isLandscapeMode={isLandscapeMode}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        isBiodiversityActive={isBiodiversityActive}
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
        aoiId={aoiId}
        className={cx({
          [styles.sidebarContainer]: FEATURE_NEW_MENUS,
          [styles.sidebarContainerOLD]: !FEATURE_NEW_MENUS,
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
        activeLayers={updatedActiveLayers}
        isLandscapeMode={isLandscapeMode}
      />

      {selectedAnalysisLayer && (
        <FeatureHighlightLayer
          featureLayerSlugs={selectedAnalysisLayer.slug}
          onFeatureClick={handleHighlightLayerFeatureClick}
        />
      )}

      {FEATURE_NEW_MENUS && !isMobile && !onboardingType && (
        <SideMenu
          openedModal={openedModal}
          activeLayers={updatedActiveLayers}
          isFullscreenActive={isFullscreenActive}
          onboardingStep={onboardingStep}
          blur={cursorBottom}
        />
      )}

      {FEATURE_NEW_MENUS && !isMobile && (
        <GlobePageIndicator />
      )}

      {(!FEATURE_NEW_MENUS || isMobile) && (
        <Widgets
          openedModal={openedModal}
          activeLayers={updatedActiveLayers}
          isFullscreenActive={isFullscreenActive}
          onboardingStep={onboardingStep}
        />
      )}

      <MapTooltip
        onActionButtonClick={handleTooltipActionButtonClick}
        speciesData={speciesData}
        isProtectedArea={isProtectedArea}
      />

      <LabelsLayer activeLayers={updatedActiveLayers} />

      {FEATURE_NEW_MENUS && cursorBottom && !isMobile && !onboardingType && (
        <GlobesMenu browsePage={browsePage} />
      )}

    </Scene>
  );
}

export default DataSceneComponent;
