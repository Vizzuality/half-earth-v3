import React, { useState, useMemo } from 'react';

import loadable from '@loadable/component';

import cx from 'classnames';

import CountriesBordersLayer from 'containers/layers/countries-borders-layer';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import GlobePageIndicator from 'containers/menus/globe-page-indicator';
import GlobesMenu from 'containers/menus/globes-menu';
import SideMenu from 'containers/menus/sidemenu';
import SoundButton from 'containers/onboarding/sound-btn';
import OnboardingTooltip from 'containers/onboarding/tooltip';
import NRCLandingSidebar from 'containers/sidebars/nrc-landing-sidebar';

import CountryEntryTooltip from 'components/country-entry-tooltip';
import Scene from 'components/scene';

import { MARINE_SPI_FEATURE_LAYER } from 'constants/layers-slugs';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

import uiStyles from 'styles/ui.module';

import styles from './nrc-landing-scene-styles.module.scss';

const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function NrcLandingComponent({
  map,
  sceneMode,
  onMapLoad,
  countryISO,
  countryName,
  openedModal,
  activeLayers,
  sceneSettings,
  isGlobeUpdating,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  browsePage,
  changeUI,
}) {
  const [activeGlobesMenu, setActiveGlobesMenu] = useState(false);
  const displayMarineOutline = useMemo(
    () => activeLayers.some((l) => l.title === MARINE_SPI_FEATURE_LAYER),
    [activeLayers]
  );

  // Change specific onboarding step
  if (
    onboardingType &&
    onboardingStep === 1 &&
    waitingInteraction &&
    !!countryISO
  ) {
    changeUI({
      onboardingStep: 2,
      waitingInteraction: false,
      onboardingTooltipTop: null,
      onboardingTooltipLeft: null,
    });
  }

  return (
    <Scene
      sceneName="nrc-landing-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
      initialRotation
      disabled={
        !!onboardingType &&
        !(onboardingStep === 2 || (onboardingStep === 1 && waitingInteraction))
      }
      blur={activeGlobesMenu}
      className={cx({
        [uiStyles.blurScene]: activeGlobesMenu && !onboardingType,
      })}
    >
      {onboardingType && <SoundButton />}

      <OnboardingTooltip className={styles.onboardingTooltip} />

      <ArcgisLayerManager activeLayers={activeLayers} />

      {isGlobeUpdating && <Spinner floating />}

      <CountryLabelsLayer
        activeLayers={activeLayers}
        countryISO={countryISO}
        countryName={countryName}
        sceneMode={sceneMode}
      />
      <RegionsLabelsLayer sceneMode={sceneMode} activeLayers={activeLayers} />

      <CountriesBordersLayer
        countryISO={countryISO}
        countryName={countryName}
        spatialReference={LOCAL_SPATIAL_REFERENCE}
        displayMarineOutline={displayMarineOutline}
      />

      {!onboardingType && (
        <SideMenu
          activeLayers={activeLayers}
          openedModal={openedModal}
          onboardingStep={onboardingStep}
          blur={activeGlobesMenu}
        />
      )}

      <GlobePageIndicator onMouseEnter={() => setActiveGlobesMenu(true)} />

      <CountryEntryTooltip
        countryISO={countryISO}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />

      <NRCLandingSidebar
        activeLayers={activeLayers}
        map={map}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
        className={cx({
          [uiStyles.blur]: activeGlobesMenu && !onboardingType,
        })}
      />

      <LabelsLayer activeLayers={activeLayers} />

      {activeGlobesMenu && !onboardingType && (
        <GlobesMenu
          browsePage={browsePage}
          onMouseLeave={() => setActiveGlobesMenu(false)}
        />
      )}
    </Scene>
  );
}

export default NrcLandingComponent;
