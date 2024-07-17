import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import SideMenu from 'containers/menus/sidemenu';

import MapView from 'components/map-view';

import EsriFeatureService from 'services/esri-feature-service';

import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';

import DashboardTrendsSidebar from '../../sidebars/dashboard-trends-sidebar/dashboard-trends-sidebar-component';

const { VITE_APP_ARGISJS_API_VERSION: API_VERSION } = import.meta.env;

const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

function DashboardTrendsViewComponent(props) {
  const {
    activeLayers,
    onMapLoad,
    sceneMode,
    viewSettings,
    countryISO,
    countryName,
    isFullscreenActive,
    openedModal,
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [geo, setGeo] = useState(null);
  const [countryData, setCountryData] = useState(null);

  const url =
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/SPI_Terrestrial_202403/FeatureServer/0';

  // find and zoom to region
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    }).then((features) => {
      const { geometry, attributes } = features[0];

      if (geometry && view) {
        view.center = [geometry.longitude, geometry.latitude];
        setGeo(geometry);
        setCountryData(attributes);
      }
    });
  }, [view, countryISO]);

  // SPI layer
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    }).then((features) => {
      if (map) {
        const { layer } = features[0];
        map.add(layer);
      }
    });
  }, [map, view]);

  return (
    <MapView
      onMapLoad={onMapLoad}
      mapName="dashboard"
      viewSettings={viewSettings}
      map={map}
      setMap={setMap}
      view={view}
      setView={setView}
      geo={geo}
      loaderOptions={{
        url: `https://js.arcgis.com/${API_VERSION}`,
      }}
    >
      <DashboardTrendsSidebar
        activeLayers={activeLayers}
        map={map}
        view={view}
        countryISO={countryISO}
        countryData={countryData}
      />

      <CountryLabelsLayer
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        activeLayers={activeLayers}
      />

      <RegionsLabelsLayer sceneMode={sceneMode} activeLayers={activeLayers} />

      <SideMenu
        openedModal={openedModal}
        activeLayers={activeLayers}
        isFullscreenActive={isFullscreenActive}
      />

      <LabelsLayer activeLayers={activeLayers} />
    </MapView>
  );
}

export default DashboardTrendsViewComponent;
