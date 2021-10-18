// Dependencies
import React from 'react';
import loadable from '@loadable/component'
// Components
import Scene from 'components/scene';
import Legend from 'components/legend';
import Widgets from 'components/widgets';
import ArcgisLayerManager from 'components/arcgis-layer-manager';
import CountryLabelsLayer from 'components/country-labels-layer';
import CountriesBordersLayer from 'components/countries-borders-layer';
import CountryEntryTooltip from 'components/country-entry-tooltip';
// Constants
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
// Dynamic imports
const Spinner = loadable(() => import('components/spinner'));
const LabelsLayer = loadable(() => import('components/labels-layer'));

const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

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
}) => {
  return (
    <>
      <Scene
        sceneName={'nrc-landing-scene'}
        sceneSettings={sceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
        onMapLoad={onMapLoad}
      >
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
        />
        <CountryEntryTooltip
          countryISO={countryISO}
          countryName={countryName}
          sceneMode={sceneMode}
        />
        <LabelsLayer activeLayers={activeLayers} />
      </Scene>
    </>
  );
}

export default NrcLandingComponent;
