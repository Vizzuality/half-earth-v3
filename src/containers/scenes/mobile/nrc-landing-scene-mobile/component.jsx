import React from 'react';

import loadable from '@loadable/component';

import CountriesBordersLayer from 'containers/layers/countries-borders-layer';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import NRCLandingSidebar from 'containers/sidebars/nrc-landing-sidebar';

import CountryEntryTooltip from 'components/country-entry-tooltip';
import Scene from 'components/scene';

import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function NrcLandingComponent({
  map,
  sceneMode,
  onMapLoad,
  countryISO,
  countryName,
  activeLayers,
  sceneSettings,
  isGlobeUpdating,
}) {
  return (
    <Scene
      sceneName="nrc-landing-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onMapLoad={onMapLoad}
      initialRotation
    >
      <haeder
        style={{
          border: '1px solid red',
          position: 'absolute',
          zIndex: 10,
          top: 0,
        }}
      >
        National resports cards
      </haeder>
      <ArcgisLayerManager activeLayers={activeLayers} />

      {isGlobeUpdating && <Spinner floating />}

      <CountryLabelsLayer
        activeLayers={activeLayers}
        countryISO={countryISO}
        countryName={countryName}
        sceneMode={sceneMode}
      />

      <CountriesBordersLayer
        countryISO={countryISO}
        spatialReference={LOCAL_SPATIAL_REFERENCE}
      />

      <CountryEntryTooltip countryISO={countryISO} countryName={countryName} />

      <NRCLandingSidebar activeLayers={activeLayers} map={map} />

      <LabelsLayer activeLayers={activeLayers} />
    </Scene>
  );
}

export default NrcLandingComponent;
