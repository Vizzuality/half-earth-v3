import React from 'react';
// Components
import Scene from 'components/scene';
import Widgets from 'containers/widgets';
import LabelsLayer from 'containers/layers/labels-layer';
import CountryMaskLayer from 'containers/layers/country-mask-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import CountryEntryTooltip from 'components/country-entry-tooltip';
import CountriesBordersLayer from 'containers/layers/countries-borders-layer';
import LocalSceneViewManager from 'containers/managers/local-scene-view-manager';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import TerrainExaggerationLayer from 'containers/layers/terrain-exaggeration-layer';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
// Constants
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

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
  countryTooltipDisplayFor,
}) => (
  <Scene
    sceneName={'nrc-scene'}
    sceneSettings={sceneSettings}
    loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    onMapLoad={onMapLoad}
  >
    <LocalSceneViewManager localGeometry={countryBorder} />
    <ArcgisLayerManager
      activeLayers={activeLayers}
      userConfig={userConfig}
    />
    <CountryMaskLayer
      countryISO={countryISO}
      spatialReference={LOCAL_SPATIAL_REFERENCE}
    />
    <CountriesBordersLayer
      countryISO={countryISO}
      spatialReference={LOCAL_SPATIAL_REFERENCE}
    />
    <CountryEntryTooltip
      countryTooltipDisplayFor={countryTooltipDisplayFor}
      countryName={countryName}
    />
    <CountryLabelsLayer
      activeLayers={activeLayers}
      countryISO={countryISO}
    />
    <TerrainExaggerationLayer />
    <LabelsLayer activeLayers={activeLayers} countryISO={countryISO} />
    {isVisible && 
      <Widgets
        activeLayers={activeLayers}
        openedModal={openedModal}
        isFullscreenActive={isFullscreenActive}
      />
    }
    <PdfNationalReport
      onMapLoad={onMapLoad}
      countryISO={countryISO}
    />
  </Scene>
);

export default CountrySceneComponent;
