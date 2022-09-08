import React, { useMemo, useState } from 'react';

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
  activeLayers,
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
  speciesData,
  browsePage,
}) {
  const isMobile = useMobile();

  const [activeGlobesMenu, setActiveGlobesMenu] = useState(false);

  const sidebarHidden = isFullscreenActive || isMobile;
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
      blur={activeGlobesMenu}
      className={cx({
        [uiStyles.blurScene]:
          activeGlobesMenu && !onboardingType && FEATURE_NEW_MENUS,
      })}
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
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        isBiodiversityActive={isBiodiversityActive}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
        className={cx(styles.sidebarContainer, {
          [animationStyles.leftHidden]: sidebarHidden,
          [uiStyles.blur]:
            activeGlobesMenu && !onboardingType && FEATURE_NEW_MENUS,
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
        activeLayers={activeLayers}
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
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
          onboardingStep={onboardingStep}
          blur={activeGlobesMenu}
        />
      )}

      {FEATURE_NEW_MENUS && !isMobile && (
        <GlobePageIndicator onMouseEnter={() => setActiveGlobesMenu(true)} />
      )}

      {(!FEATURE_NEW_MENUS || isMobile) && (
        <Widgets
          openedModal={openedModal}
          activeLayers={activeLayers}
          isFullscreenActive={isFullscreenActive}
          onboardingStep={onboardingStep}
        />
      )}

      <MapTooltip
        onActionButtonClick={handleTooltipActionButtonClick}
        speciesData={speciesData}
        isProtectedArea={isProtectedArea}
      />

      <LabelsLayer activeLayers={activeLayers} />

      {FEATURE_NEW_MENUS
        && activeGlobesMenu
        && !isMobile
        && !onboardingType && (
          <GlobesMenu
            browsePage={browsePage}
            onMouseLeave={() => setActiveGlobesMenu(false)}
          />
      )}
    </Scene>
  );
}

export default DataSceneComponent;
