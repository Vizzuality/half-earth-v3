import React from 'react';

import loadable from '@loadable/component';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import ArcgisLayerManager from 'containers/managers/arcgis-layer-manager';
import SideMenu from 'containers/menus/sidemenu';

import MapView from '../../../components/map-view';
import DashboardSidebar from '../../sidebars/dashboard-sidebar/dashboard-sidebar-component';

const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));
const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function DashboardViewComponent(props) {
  const {
    updatedActiveLayers,
    onMapLoad,
    sceneMode,
    viewSettings,
    countryISO,
    countryName,
    isFullscreenActive,
    openedModal,
  } = props;

  return (
    <MapView
      onMapLoad={onMapLoad}
      mapName="dashboard"
      sceneName="dashboard"
      viewSettings={viewSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    >
      <ArcgisLayerManager activeLayers={updatedActiveLayers} />

      <DashboardSidebar />

      <CountryLabelsLayer
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        activeLayers={updatedActiveLayers}
      />
      <RegionsLabelsLayer
        sceneMode={sceneMode}
        activeLayers={updatedActiveLayers}
      />

      <SideMenu
        openedModal={openedModal}
        activeLayers={updatedActiveLayers}
        isFullscreenActive={isFullscreenActive}
      />

      <LabelsLayer activeLayers={updatedActiveLayers} />
    </MapView>
  );
}

export default DashboardViewComponent;
