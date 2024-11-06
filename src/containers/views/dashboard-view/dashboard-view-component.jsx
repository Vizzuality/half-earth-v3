import React, { useEffect, useRef, useState } from 'react';

import loadable from '@loadable/component';
import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import { LightModeProvider } from '../../../context/light-mode';
import MapView from 'components/map-view';
import SideMenu from 'containers/menus/sidemenu';
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";
import { DASHBOARD } from 'router';
import DashboardSidebarContainer from 'containers/sidebars/dashboard-sidebar'
import TopMenuContainer from '../../../components/top-menu';
import { LAYER_OPTIONS, NAVIGATION, REGION_OPTIONS } from '../../../utils/dashboard-utils';

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
    selectedRegionOption,
    setSelectedRegionOption,
    setTaxaList,
    browsePage,
    scientificName,
    regionLayers,
    setRegionLayers,
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [mapViewSettings, setMapViewSettings] = useState(viewSettings);
  const [clickedRegion, setClickedRegion] = useState();
  const [layerView, setLayerView] = useState();
  let hoverHighlight;

  useEffect(() => {
    if (!view) return;
    view.on('click', (event) => {
      event.stopPropagation();
    });
  }, [view]);


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
              if (selectedRegionOption === REGION_OPTIONS.PROTECTED_AREAS) {
                setSelectedRegion({ WDPA_PID });
              }

              if (selectedRegionOption === REGION_OPTIONS.PROVINCES) {
                setSelectedRegion({ GID_1 });
              }
              break;
            case NAVIGATION.TRENDS:
              const activeLayers = Object.keys(regionLayers);
              browsePage({
                type: DASHBOARD,
                payload: { iso: countryISO.toLowerCase() },
                query: {
                  scientificName,
                  selectedIndex: selectedIndex,
                  regionLayers: activeLayers,
                  selectedRegion: (hits.attributes.NAME_1 ?? hits.attributes.region_name)
                },
              });
              setClickedRegion(hits.attributes);
              break;
          }

          if (hits.attributes.GID_0 === countryISO) {
            highlight = layerView.highlight(hits.graphic);
          }
        }
      }
    } catch { }
  }

  const handlePointerMove = async (event) => {
    let hits;
    try {
      if (selectedIndex !== NAVIGATION.BIO_IND && selectedIndex !== NAVIGATION.DATA_LAYER) {
        hits = await hitTest(event);

        if (hits) {
          hoverHighlight?.remove();
          view.closePopup();

          let regionName;
          if (selectedRegionOption === REGION_OPTIONS.PROTECTED_AREAS) {
            if (hits.attributes.ISO3 === countryISO) {
              regionName = hits.attributes.NAME;
            }
          } else if (selectedRegionOption === REGION_OPTIONS.PROVINCES) {
            if (hits.attributes.GID_0 === countryISO) {
              regionName = (hits.attributes.NAME_1 ?? hits.attributes.region_name);
            }
          }

          if (regionName) {
            hoverHighlight = layerView.highlight(hits.graphic);
            view.openPopup({
              // Set the popup's title to the coordinates of the location
              title: `${regionName}`,
              location: view.toMap({ x: event.x, y: event.y })
            });
          }
        }
      } else {
        view.closePopup();
        hoverHighlight?.remove();
      }
    } catch { }
  }

  const handleRegionSelected = (foundRegion) => {
    highlight?.remove();
    highlight = layerView?.highlight(foundRegion.graphic);
  }

  const hitTest = promiseUtils.debounce(async (event) => {
    const { results } = await view.hitTest(event);
    if (results.length) {
      const foundLayer = results.find(x => x.graphic.attributes.NAME_1 || x.graphic.attributes.WDPA_PID);
      if (foundLayer) {
        const { graphic } = foundLayer
        const { attributes } = graphic;
        if (attributes.hasOwnProperty('NAME_1') || attributes.hasOwnProperty('WDPA_PID')) {
          return { graphic, attributes }
        } else {
          return null;
        }
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
        <TopMenuContainer {...props} />
        <DashboardSidebarContainer
          map={map}
          view={view}
          setMapViewSettings={setMapViewSettings}
          regionLayers={regionLayers}
          setRegionLayers={setRegionLayers}
          clickedRegion={clickedRegion}
          handleRegionSelected={handleRegionSelected}
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
