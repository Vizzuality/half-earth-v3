// Dependencies
import React, { useMemo } from 'react';
import loadable from '@loadable/component';
// Components
import CountryEntryTooltip from 'components/country-entry-tooltip';
import Scene from 'components/scene';
import CountriesBordersLayer from 'containers/layers/countries-borders-layer';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import SoundButton from 'containers/onboarding/sound-btn';
import NRCLandingSidebar from 'containers/sidebars/nrc-landing-sidebar';
import Widgets from 'containers/widgets';
import OnboardingTooltip from 'containers/onboarding/tooltip';
// Constants
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
// Styles
import styles from './nrc-landing-scene-styles.module.scss';
// Dynamic imports
const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const NrcLandingComponent = ({
  sceneMode,
  onMapLoad,
  userConfig,
  countryISO,
  countryName,
  openedModal,
  activeLayers,
  sceneSettings,
  isLandscapeMode,
  isGlobeUpdating,
  onboardingType,
  onboardingStep,
}) => {
  const tooltipPlacement = useMemo(() => {
    if (onboardingStep === 1)
      return {
        // NATIONAL REPORT CARD
        left: '444px',
        top: '56px',
      };
    if (onboardingStep === 2)
      return {
        // SEARCHER
        left: '422px',
        top: '543px',
      };
    return null;
  }, [onboardingStep, onboardingType]);
  return (
    <>
      <Scene
        sceneName={'nrc-landing-scene'}
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
        initialRotation
        disabled={!!onboardingType && onboardingStep !== 2}
      >
        {onboardingType && <SoundButton />}
        <OnboardingTooltip className={styles.onboardingTooltip} tooltipPlacement={tooltipPlacement} />
        <ArcgisLayerManager
          activeLayers={activeLayers}
          userConfig={userConfig}
        />
        {isGlobeUpdating && <Spinner floating />}
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
        <Widgets
          activeLayers={activeLayers}
          openedModal={openedModal}
          onboardingStep={onboardingStep}
        />
        <CountryEntryTooltip
          countryISO={countryISO}
          countryName={countryName}
          onboardingStep={onboardingStep}
        />
        <NRCLandingSidebar onboardingStep={onboardingStep} />
        <LabelsLayer activeLayers={activeLayers} />
      </Scene>
    </>
  );
};

export default NrcLandingComponent;
