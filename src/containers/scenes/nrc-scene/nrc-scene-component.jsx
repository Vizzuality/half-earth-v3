// Dependencies
import React from 'react';
// Components
import Scene from 'components/scene';
import CountryEntryTooltip from 'components/country-entry-tooltip';
import AOIEntryTooltip from 'components/aoi-entry-tooltip';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
import Widgets from 'containers/widgets';
import LabelsLayer from 'containers/layers/labels-layer';
import CountryMaskLayer from 'containers/layers/country-mask-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import FeatureHighlightLayer from 'containers/layers/feature-highlight-layer';
import LocalSceneViewManager from 'containers/managers/local-scene-view-manager';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';
// Constants
import {
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER as bordersLayerTitle,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/layers-slugs';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const CountrySceneComponent = ({
  onMapLoad,
  isVisible,
  countryISO,
  userConfig,
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
  onBoardingType,
  onBoardingStep,
}) => {

  return (
    <Scene
      sceneName={'nrc-scene'}
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
    >
      <LocalSceneViewManager localGeometry={countryBorder} />
      <ArcgisLayerManager activeLayers={activeLayers} userConfig={userConfig} />
      <CountryMaskLayer
        countryISO={countryISO}
        spatialReference={LOCAL_SPATIAL_REFERENCE}
      />
      <FeatureHighlightLayer
        featureLayerSlugs={[bordersLayerTitle, HALF_EARTH_FUTURE_TILE_LAYER]}
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
  )
};

export default CountrySceneComponent;
