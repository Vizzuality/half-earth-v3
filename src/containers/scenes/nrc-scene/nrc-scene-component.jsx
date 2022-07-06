// Dependencies
import React from 'react';

// Components
import Scene from 'components/scene';
import CountryEntryTooltip from 'components/country-entry-tooltip';
import AOIEntryTooltip from 'components/aoi-entry-tooltip';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
import OnboardingTooltip from 'containers/onboarding/tooltip';
import Widgets from 'containers/widgets';
import LabelsLayer from 'containers/layers/labels-layer';
import CountryMaskLayer from 'containers/layers/country-mask-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import LocalSceneViewManager from 'containers/managers/local-scene-view-manager';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import SoundButton from 'containers/onboarding/sound-btn';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';
// Constants
import {
  HALF_EARTH_FUTURE_TILE_LAYER,
  EEZ_MARINE_BORDERS,
} from 'constants/layers-slugs';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const CountrySceneComponent = ({
  onMapLoad,
  isVisible,
  countryISO,
  countryName,
  openedModal,
  activeLayers,
  countryBorder,
  sceneSettings,
  isFullscreenActive,
  handleAreaClick,
  countryTooltipDisplayFor,
  aoiTooltipInfo,
  setTooltipInfo,
  onboardingType,
  countryData,
}) => {
  return (
    <Scene
      sceneName={'nrc-scene'}
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
      disabled={!!onboardingType}
    >
      {onboardingType && <SoundButton />}
      {countryData && <OnboardingTooltip />}
      <LocalSceneViewManager localGeometry={countryBorder} />
      <ArcgisLayerManager activeLayers={activeLayers} />
      <CountryMaskLayer
        countryISO={countryISO}
        spatialReference={LOCAL_SPATIAL_REFERENCE}
      />
      <FeatureHighlightLayer
        featureLayerSlugs={[EEZ_MARINE_BORDERS, HALF_EARTH_FUTURE_TILE_LAYER]}
        onFeatureClick={handleAreaClick}
      />
      <CountryEntryTooltip
        countryTooltipDisplayFor={countryTooltipDisplayFor}
        countryName={countryName}
      />
      <AOIEntryTooltip
        tooltipInfo={aoiTooltipInfo}
        setTooltipInfo={setTooltipInfo}
      />
      <CountryLabelsLayer activeLayers={activeLayers} countryISO={countryISO} />

      <TerrainExaggerationLayer />
      <LabelsLayer activeLayers={activeLayers} countryISO={countryISO} />
      {isVisible && (
        <Widgets
          activeLayers={activeLayers}
          openedModal={openedModal}
          isFullscreenActive={isFullscreenActive}
        />
      )}
      <PdfNationalReport onMapLoad={onMapLoad} countryISO={countryISO} />
    </Scene>
  );
};

export default CountrySceneComponent;
