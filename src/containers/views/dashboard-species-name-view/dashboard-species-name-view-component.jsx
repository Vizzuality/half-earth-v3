import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import SideMenu from 'containers/menus/sidemenu';
import { LightModeProvider } from '../../../context/light-mode';
import MapView from 'components/map-view';

import DashboardSidebarContainer from 'containers/sidebars/dashboard-sidebar'

const { VITE_APP_ARGISJS_API_VERSION: API_VERSION } = import.meta.env;

const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));

function DashboardSpeciesNameViewComponent(props) {
  const {
    activeLayers,
    onMapLoad,
    sceneMode,
    viewSettings,
    countryISO,
    countryName,
    isFullscreenActive,
    openedModal,
    scientificName,
    speciesInfo,
    geometry
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (geometry && view) {
      view.center = [geometry.longitude, geometry.latitude];
    }
  }, [view, geometry]);

  return (
    <MapView
      onMapLoad={onMapLoad}
      mapName="dashboard"
      viewSettings={viewSettings}
      map={map}
      setMap={setMap}
      view={view}
      setView={setView}
      geometry={geometry}
      loaderOptions={{
        url: `https://js.arcgis.com/${API_VERSION}`,
      }}
    >
      <LightModeProvider>
        <DashboardSidebarContainer
          activeLayers={activeLayers}
          map={map}
          view={view}
          speciesInfo={speciesInfo}
          scientificName={scientificName}
          {...props} />
      </LightModeProvider>
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

export default DashboardSpeciesNameViewComponent;
