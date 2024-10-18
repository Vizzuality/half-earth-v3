import React, { useEffect, useRef, useState } from 'react';

import loadable from '@loadable/component';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import SideMenu from 'containers/menus/sidemenu';
import { LightModeProvider } from '../../../context/light-mode';
import MapView from 'components/map-view';
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";

import DashboardSidebarContainer from 'containers/sidebars/dashboard-sidebar'
import TopMenuContainer from '../../../components/top-menu';
import { LAYER_OPTIONS, NAVIGATION } from '../../../utils/dashboard-utils';

const { VITE_APP_ARGISJS_API_VERSION: API_VERSION } = import.meta.env;
const LabelsLayer = loadable(() => import('containers/layers/labels-layer'));


let highlight;

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
    selectedIndex,
    setSelectedIndex,
    setSelectedRegion,
    selectedRegion,
    setTaxaList,
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [regionLayers, setRegionLayers] = useState({});
  const [mapViewSettings, setMapViewSettings] = useState(viewSettings);
  const [clickedRegion, setClickedRegion] = useState();
  const [tabOption, setTabOption] = useState(2);
  const [selectedRegionOption, setSelectedRegionOption] = useState('');
  const [layerView, setLayerView] = useState();
  let hoverHighlight;

  useEffect(async () => {
    if (view && Object.keys(regionLayers).length) {
      const layer = await getLayerView();
      setLayerView(layer);
    }
  }, [regionLayers, view]);

  useEffect(() => {
    if (!layerView) return;
    view.on('click', (event) => handleRegionClicked(event));
    view.on('pointer-move', handlePointerMove);
  }, [layerView]);

  const getLayerView = async () => {
    return await view.whenLayerView(regionLayers[LAYER_OPTIONS.PROVINCES] || regionLayers[LAYER_OPTIONS.PROTECTED_AREAS]);
  }

  const handleRegionClicked = async (event) => {
    event.stopPropagation();
    let hits;
    try {
      highlight?.remove();
      hoverHighlight?.remove();

      if (selectedIndex !== NAVIGATION.BIO_IND) {
        hits = await hitTest(event);
        if (hits) {
          switch (selectedIndex) {
            case NAVIGATION.REGION:
              setTaxaList([]);
              const { WDPA_PID, GID_1 } = hits.attributes;
              setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
              if (WDPA_PID) {
                setSelectedRegion({ WDPA_PID });
              }

              if (GID_1) {
                setSelectedRegion({ GID_1 });
              }
              break;
            case NAVIGATION.TRENDS:
              setClickedRegion(hits.attributes);
              break;
          }

          highlight = layerView.highlight(hits.graphic);
        }
      }
    } catch { }
  }

  const handlePointerMove = async (event) => {
    let hits;
    try {
      if (selectedIndex !== NAVIGATION.BIO_IND) {
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

  const handleRegionSelected = (foundRegion) => {
    highlight?.remove();
    highlight = layerView.highlight(foundRegion.graphic);
  }

  const hitTest = promiseUtils.debounce(async (event) => {
    const { results } = await view.hitTest(event);
    if (results.length) {
      const { graphic } = results.find(x => x.graphic.attributes.OBJECTID || x.graphic.attributes.WDPA_PID);
      const { attributes } = graphic;
      if (attributes.hasOwnProperty('region_name') || attributes.hasOwnProperty('WDPA_PID')) {
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
          selectedRegionOption={selectedRegionOption}
          setSelectedRegionOption={setSelectedRegionOption}
          layerView={layerView}
          selectedRegion={selectedRegion}
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
