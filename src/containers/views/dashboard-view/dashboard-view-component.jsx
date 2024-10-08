import React, { useEffect, useState } from 'react';

import loadable from '@loadable/component';
import { NAVIGATION } from 'utils/dashboard-utils.js';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import SideMenu from 'containers/menus/sidemenu';
import { LightModeProvider } from '../../../context/light-mode';
import MapView from 'components/map-view';
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";

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
  const [tabOption, setTabOption] = useState(2);

  let highlight;
  let hoverHighlight;

  useEffect(() => {
    if (geometry && view) {
      view.center = [geometry.longitude, geometry.latitude];

      view.on('click', handleRegionClicked);

      view.on('pointer-move', handlePointerMove);
    }
  }, [view, geometry]);

  useEffect(() => {
    if (tabOption === 2) {
      view?.on('click', handleRegionClicked)
    }
  }, [tabOption, view]);


  const handleRegionClicked = async (event) => {
    let hits;
    try {
      if (selectedIndex === NAVIGATION.TRENDS) {
        let layerView = await view.whenLayerView(regionLayers['SPI REGIONS']);
        hits = await hitTest(event);

        if (hits) {
          setClickedRegion(hits.attributes);

          highlight?.remove();
          hoverHighlight?.remove();

          highlight = layerView.highlight(hits.graphic);
        }
      }
    } catch { }
  }

  const handlePointerMove = async (event) => {
    let hits;
    try {
      if (selectedIndex === NAVIGATION.TRENDS) {
        let layerView = await view.whenLayerView(regionLayers['SPI REGIONS']);
        hits = await hitTest(event);

        if (hits) {
          hoverHighlight?.remove();
          hoverHighlight = layerView.highlight(hits.graphic);
        } else {
          hoverHighlight?.remove();
        }
      }
    } catch { }
  }

  const handleRegionSelected = async (foundRegion) => {
    let layerView = await view.whenLayerView(regionLayers['SPI REGIONS']);

    highlight?.remove();
    hoverHighlight?.remove();

    highlight = layerView.highlight(foundRegion.graphic);
  }

  const hitTest = promiseUtils.debounce(async (event) => {
    const { results } = await view.hitTest(event);
    if (results.length) {
      const { graphic } = results.find(x => x.graphic.attributes.OBJECTID);
      const { attributes } = graphic;
      if (attributes.hasOwnProperty('region_name')) {
        return { graphic, attributes }
      } else {
        return null;
      }
    } else {
      return null;
    }
  });

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
          tabOption={tabOption}
          setTabOption={setTabOption}
          handleRegionSelected={handleRegionSelected}
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
