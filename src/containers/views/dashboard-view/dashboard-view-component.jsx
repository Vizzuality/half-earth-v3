import React, { useEffect, useState } from 'react';

import { DASHBOARD } from 'router';

import loadable from '@loadable/component';

import * as promiseUtils from '@arcgis/core/core/promiseUtils.js';
import { LightModeProvider } from 'context/light-mode';

import CountryLabelsLayer from 'containers/layers/country-labels-layer';
import RegionsLabelsLayer from 'containers/layers/regions-labels-layer';
import SideMenu from 'containers/menus/sidemenu';
import DashboardSidebarContainer from 'containers/sidebars/dashboard-sidebar';

import MapView from 'components/map-view';
import TopMenuContainer from 'components/top-menu';

import {
  LAYER_OPTIONS,
  NAVIGATION,
  REGION_OPTIONS,
} from 'constants/dashboard-constants.js';

import { TABS } from '../../sidebars/dashboard-trends-sidebar/dashboard-trends-sidebar-component';

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
    setTaxaList,
    browsePage,
    scientificName,
    regionLayers,
    setRegionLayers,
    tabOption,
    setSelectedProvince,
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [mapViewSettings, setMapViewSettings] = useState(viewSettings);
  const [clickedRegion, setClickedRegion] = useState();
  const [layerView, setLayerView] = useState();
  const [onClickHandler, setOnClickHandler] = useState(null);
  const [onPointerMoveHandler, setOnPointerMoveHandler] = useState(null);
  // const [showTopNav, setShowTopNav] = useState(true);
  let hoverHighlight;

  const getLayerView = async () => {
    return view.whenLayerView(
      regionLayers[LAYER_OPTIONS.PROVINCES] ||
        regionLayers[LAYER_OPTIONS.PROTECTED_AREAS] ||
        regionLayers[LAYER_OPTIONS.FORESTS] ||
        regionLayers[`${countryISO}-outline`]
    );
  };

  const hitTest = promiseUtils.debounce(async (event) => {
    const { results } = await view.hitTest(event);
    if (results.length) {
      const foundLayer = results.find(
        (x) =>
          x.graphic.attributes.NAME_1 ||
          x.graphic.attributes.WDPA_PID ||
          x.graphic.attributes.territoire
      );
      if (foundLayer) {
        const { graphic } = foundLayer;
        const { attributes } = graphic;
        if (
          Object.prototype.hasOwnProperty.call(attributes, 'NAME_1') ||
          Object.prototype.hasOwnProperty.call(attributes, 'WDPA_PID') ||
          Object.prototype.hasOwnProperty.call(attributes, 'territoire')
        ) {
          return { graphic, attributes };
        }
        return null;
      }
      return null;
    }
    return null;
  });

  const handleRegionClicked = async (event) => {
    event.stopPropagation();
    setSelectedProvince(null);
    let hits;
    try {
      highlight?.remove();
      hoverHighlight?.remove();

      if (selectedIndex !== NAVIGATION.BIO_IND) {
        hits = await hitTest(event);
        if (hits) {
          switch (selectedIndex) {
            case NAVIGATION.REGION:
              {
                setTaxaList([]);

                const { WDPA_PID, GID_1, mgc } = hits.attributes;
                setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
                if (selectedRegionOption === REGION_OPTIONS.PROTECTED_AREAS) {
                  setSelectedRegion({ WDPA_PID });
                }

                if (selectedRegionOption === REGION_OPTIONS.PROVINCES) {
                  setSelectedRegion({ GID_1 });
                }

                if (selectedRegionOption === REGION_OPTIONS.FORESTS) {
                  setSelectedRegion({ mgc });
                }
              }
              break;
            case NAVIGATION.TRENDS:
              {
                const al = Object.keys(regionLayers);
                browsePage({
                  type: DASHBOARD,
                  payload: { iso: countryISO.toLowerCase() },
                  query: {
                    scientificName,
                    selectedIndex,
                    regionLayers: al,
                    selectedRegion: hits.attributes.NAME_1,
                  },
                });
                setClickedRegion(hits.attributes);
              }
              break;
            default:
              break;
          }

          highlight = layerView.highlight(hits.graphic);
        }
      }
    } catch (error) {
      throw Error(error);
    }
  };

  const handlePointerMove = async (event) => {
    let hits;

    try {
      if (
        selectedIndex !== NAVIGATION.BIO_IND &&
        selectedIndex !== NAVIGATION.DATA_LAYER
      ) {
        hits = await hitTest(event);
        hoverHighlight?.remove();
        view.closePopup();

        if (hits) {
          let regionName;
          if (selectedRegionOption === REGION_OPTIONS.PROTECTED_AREAS) {
            if (hits.attributes.ISO3 === countryISO) {
              regionName = hits.attributes.NAME;
            }
          } else if (selectedRegionOption === REGION_OPTIONS.PROVINCES) {
            if (hits.attributes.GID_0 === countryISO) {
              regionName =
                hits.attributes.NAME_1 ?? hits.attributes.region_name;
            }
          } else if (selectedRegionOption === REGION_OPTIONS.FORESTS) {
            regionName = hits.attributes.territoire;
          }

          if (regionName) {
            hoverHighlight = layerView.highlight(hits.graphic);
            view.openPopup({
              // Set the popup's title to the coordinates of the location
              title: `${regionName}`,
              location: view.toMap({ x: event.x, y: event.y }),
            });
          }
        }
      } else {
        view.closePopup();
        hoverHighlight?.remove();
      }
    } catch (error) {
      throw Error(error);
    }
  };

  const handleRegionSelected = (foundRegion) => {
    highlight?.remove();
    highlight = layerView?.highlight(foundRegion.graphic);
  };

  // function isIframe() {
  //   return window.parent !== window;
  // }

  useEffect(() => {
    if (!view) return;
    view.on('click', (event) => {
      event.stopPropagation();
    });
  }, [view]);

  useEffect(async () => {
    let layer;
    if (view && Object.keys(regionLayers).length) {
      if (selectedIndex === NAVIGATION.TRENDS) {
        if (tabOption === TABS.SPI) {
          layer = await view.whenLayerView(
            regionLayers[LAYER_OPTIONS.PROVINCES]
          );
        } else if (tabOption === TABS.SHI) {
          layer = await view.whenLayerView(
            regionLayers[`${countryISO}-outline`]
          );
        }
      } else {
        layer = await getLayerView();
      }
      setLayerView(layer);
    }
  }, [regionLayers, view, tabOption]);

  useEffect(() => {
    if (!layerView) return;

    if (onClickHandler) {
      onClickHandler.remove();
      setOnClickHandler(null);
    }

    if (onPointerMoveHandler) {
      onPointerMoveHandler.remove();
      setOnPointerMoveHandler(null);
    }

    setOnClickHandler(view.on('click', (event) => handleRegionClicked(event)));
    setOnPointerMoveHandler(view.on('pointer-move', handlePointerMove));
  }, [layerView]);

  // useEffect(() => {
  //   if (isIframe()) {
  //     setShowTopNav(false);
  //   } else {
  //     setShowTopNav(true);
  //   }
  // }, []);

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
          setClickedRegion={setClickedRegion}
          handleRegionSelected={handleRegionSelected}
          layerView={layerView}
          selectedRegion={selectedRegion}
          {...props}
        />
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
