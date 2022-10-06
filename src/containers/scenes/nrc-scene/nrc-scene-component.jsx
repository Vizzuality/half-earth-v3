import React from 'react';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import CountryMaskLayer from 'containers/layers/country-mask-layer';
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import LabelsLayer from 'containers/layers/labels-layer';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import ZoomIntoGeometryManager from 'containers/managers/zoom-into-geometry-manager';
import SideMenu from 'containers/menus/sidemenu';
import SoundButton from 'containers/onboarding/sound-btn';
import OnboardingTooltip from 'containers/onboarding/tooltip';

import CountryEntryTooltip from 'components/country-entry-tooltip';
import FuturePlaceTooltip from 'components/future-place-tooltip';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
import Scene from 'components/scene';

import {
  HALF_EARTH_FUTURE_TILE_LAYER,
  EEZ_MARINE_BORDERS,
} from 'constants/layers-slugs';
import { useMobile } from 'constants/responsive';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function CountrySceneComponent({
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
  futurePlaceTooltipInfo,
  setTooltipInfo,
  onboardingType,
  countryData,
}) {
  const isMobile = useMobile();
  return (
    <Scene
      sceneName="nrc-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
      disabled={!!onboardingType}
    >
      {onboardingType && <SoundButton />}
      {countryData && <OnboardingTooltip />}
      <ZoomIntoGeometryManager localGeometry={countryBorder} />
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
      <FuturePlaceTooltip
        tooltipInfo={futurePlaceTooltipInfo}
        setTooltipInfo={setTooltipInfo}
      />
      <CountryLabelsLayer activeLayers={activeLayers} countryISO={countryISO} />

      <TerrainExaggerationLayer />
      <LabelsLayer activeLayers={activeLayers} countryISO={countryISO} />
      {isVisible && !isMobile && !onboardingType && (
        <SideMenu
          activeLayers={activeLayers}
          openedModal={openedModal}
          isFullscreenActive={isFullscreenActive}
        />
      )}
      <PdfNationalReport onMapLoad={onMapLoad} countryISO={countryISO} />
    </Scene>
  );
}

export default CountrySceneComponent;
