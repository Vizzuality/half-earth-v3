import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import SideMenu from 'containers/menus/sidemenu';

import EsriFeatureService from 'services/esri-feature-service';

import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';

import MapView from '../../../components/map-view';
import DashboardSidebar from '../../sidebars/dashboard-sidebar/dashboard-sidebar-component';

const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

function DashboardViewComponent(props) {
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

  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    }).then(
      (features) => {
        const { geometry } = features[0];
        if (geometry) {
          view.center = [geometry.longitude, geometry.latitude];
        }
      },
      [view, countryISO]
    );
  });

  return (
    <MapView
      onMapLoad={onMapLoad}
      mapName="dashboard"
      viewSettings={viewSettings}
      map={map}
      setMap={setMap}
      view={view}
      setView={setView}
    >
      <ArcgisLayerManager activeLayers={activeLayers} />

      <DashboardSidebar activeLayers={activeLayers} map={map} view={view} />

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

export default DashboardViewComponent;
