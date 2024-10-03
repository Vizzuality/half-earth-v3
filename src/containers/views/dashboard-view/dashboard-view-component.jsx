import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';
import { NAVIGATION } from 'utils/dashboard-utils.js';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import SideMenu from 'containers/menus/sidemenu';
import { LightModeProvider } from '../../../context/light-mode';
import MapView from 'components/map-view';

import DashboardSidebarContainer from 'containers/sidebars/dashboard-sidebar'
import TopMenuContainer from '../../../components/top-menu';

const { VITE_APP_ARGISJS_API_VERSION: API_VERSION } = import.meta.env;

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
    geometry,
    selectedIndex
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [regionLayers, setRegionLayers] = useState({});
  const [mapViewSettings, setMapViewSettings] = useState(viewSettings);
  const [clickedRegion, setClickedRegion] = useState();

  useEffect(() => {
    if (geometry && view) {
      view.center = [geometry.longitude, geometry.latitude];

      view.on('click', (event) => {
        if (selectedIndex === NAVIGATION.TRENDS)
          view.hitTest(event).then(function (response) {
            if (response.results.length) {
              const graphic = response.results[0].graphic;
              const attributes = graphic.attributes;
              console.log(attributes);
              setClickedRegion(attributes);
            }
          });
      })
    }
  }, [view, geometry]);

  return (
    <MapView
      onMapLoad={onMapLoad}
      mapName="dashboard"
      viewSettings={mapViewSettings}
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
        <TopMenuContainer />
        <DashboardSidebarContainer
          map={map}
          view={view}
          setMapViewSettings={setMapViewSettings}
          regionLayers={regionLayers}
          setRegionLayers={setRegionLayers}
          clickedRegion={clickedRegion}
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

export default DashboardViewComponent;
