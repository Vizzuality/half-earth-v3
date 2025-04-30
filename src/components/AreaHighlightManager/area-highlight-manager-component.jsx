import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { DASHBOARD } from 'router';

import * as promiseUtils from '@arcgis/core/core/promiseUtils.js';

import DashboardPopupComponent from 'components/dashboard-popup/dashboard-popup-component';

import {
  LAYER_OPTIONS,
  NAVIGATION,
  REGION_OPTIONS,
} from 'constants/dashboard-constants.js';

import {
  NATIONAL_TREND,
  TABS,
  PROVINCE_TREND,
} from '../../containers/sidebars/dashboard-trends-sidebar/dashboard-trends-sidebar-component';

let highlight;

function AreaHighlightManagerComponent(props) {
  const {
    setSelectedIndex,
    setSelectedRegion,
    setExploreAllSpecies,
    selectedRegionOption,
    setTaxaList,
    mapLegendLayers,
    browsePage,
    scientificName,
    setSelectedProvince,
    view,
    selectedIndex,
    tabOption,
    regionLayers,
    countryISO,
    activeTrend,
    shiActiveTrend,
    layerView,
    setLayerView,
    setRegionName,
    setClickedRegion,
    handleRegionSelected,
  } = props;

  let hoverHighlight;
  let prevHoverName = '';
  const [onClickHandler, setOnClickHandler] = useState(null);
  const [onPointerMoveHandler, setOnPointerMoveHandler] = useState(null);

  const getLayerView = async () => {
    return view.whenLayerView(
      regionLayers[`${countryISO}`] ||
        regionLayers[`${countryISO}-zone3-spi`] ||
        regionLayers[`${countryISO}-zone5-spi`] ||
        regionLayers[`${countryISO}-zone3-shi`] ||
        regionLayers[`${countryISO}-zone5-shi`] ||
        regionLayers[LAYER_OPTIONS.RAPID_INVENTORY_32] ||
        regionLayers[LAYER_OPTIONS.PROVINCES] ||
        regionLayers[LAYER_OPTIONS.ADMINISTRATIVE_LAYERS] ||
        regionLayers[LAYER_OPTIONS.PROTECTED_AREAS] ||
        regionLayers[LAYER_OPTIONS.FORESTS] ||
        regionLayers[LAYER_OPTIONS.DISSOLVED_NBS] ||
        regionLayers[`${countryISO}-outline`]
    );
  };

  const hitTest = promiseUtils.debounce(async (event) => {
    const { results } = await view.hitTest(event);
    if (results.length) {
      const foundLayer = results.find(
        (x) =>
          x.graphic.attributes.name ||
          x.graphic.attributes.NAME_1 ||
          x.graphic.attributes.WDPA_PID ||
          x.graphic.attributes.territoire ||
          x.graphic.attributes.Int_ID
      );
      if (foundLayer) {
        const { graphic } = foundLayer;
        const { attributes } = graphic;
        if (
          Object.prototype.hasOwnProperty.call(attributes, 'name') ||
          Object.prototype.hasOwnProperty.call(attributes, 'NAME_1') ||
          Object.prototype.hasOwnProperty.call(attributes, 'WDPA_PID') ||
          Object.prototype.hasOwnProperty.call(attributes, 'territoire') ||
          Object.prototype.hasOwnProperty.call(attributes, 'Int_ID')
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
            case NAVIGATION.EXPLORE_SPECIES:
              {
                setTaxaList([]);
                setExploreAllSpecies(false);

                // eslint-disable-next-line camelcase
                const {
                  WDPA_PID,
                  GID_1,
                  mgc,
                  NAME,
                  NAME_1,
                  region_name,
                  territoire,
                  Int_ID,
                  region_key,
                  Intrvnt,
                  iso3,
                  name,
                } = hits.attributes;
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

                if (selectedRegionOption === REGION_OPTIONS.DISSOLVED_NBS) {
                  setSelectedRegion({ iso3, name, region_key });
                }

                if (
                  selectedRegionOption === REGION_OPTIONS.ZONE_3 ||
                  selectedRegionOption === REGION_OPTIONS.ZONE_5 ||
                  selectedRegionOption === REGION_OPTIONS.RAPID_INVENTORY_32
                ) {
                  setSelectedRegion({ region_key });
                }

                // eslint-disable-next-line camelcase
                setRegionName(
                  NAME || NAME_1 || region_name || territoire || Intrvnt
                );
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
                    selectedRegion:
                      hits.attributes.NAME_1 || hits.attributes.name,
                  },
                });
                setClickedRegion(hits.attributes);
              }
              break;
            default:
              break;
          }

          handleRegionSelected(hits);
          // highlight = layerView.highlight(hits.graphic);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePointerMove = async (event) => {
    let hits;

    try {
      hits = await hitTest(event);

      if (hits) {
        let hoverName;
        // eslint-disable-next-line camelcase
        const {
          name,
          NAME,
          NAME_1,
          territoire,
          region_name,
          DESIG,
          Int_ID,
          Intrvnt,
        } = hits.attributes;

        const countryMatch =
          hits.attributes.ISO3 === countryISO ||
          hits.attributes.GID_0 === countryISO;

        if (countryMatch) {
          // eslint-disable-next-line camelcase
          hoverName = NAME || NAME_1 || region_name;
        } else {
          hoverName = name || territoire || Intrvnt;
        }

        if (hoverName) {
          if (hoverName !== prevHoverName) {
            prevHoverName = hoverName;
            hoverHighlight?.remove();
            view.closePopup();

            hoverHighlight = layerView.highlight(hits.graphic);
            view.popup.dockEnabled = false;
            view.popup.dockOptions = {
              buttonEnabled: false,
              position: 'auto',
            };

            if (DESIG) {
              const container = document.createElement('div');
              view.popup.content = container;
              ReactDOM.render(
                <DashboardPopupComponent {...hits.attributes} />,
                container
              );
            } else {
              view.popup.content = '';
            }

            view.openPopup({
              // Set the popup's title to the coordinates of the location
              title: `${hoverName}`,
              location: view.toMap({ x: event.x, y: event.y }),
              includeDefaultActions: false,
            });
          }
        } else {
          prevHoverName = '';
          hoverHighlight?.remove();
          view.closePopup();
        }
      } else {
        prevHoverName = '';
        hoverHighlight?.remove();
        view.closePopup();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          if (countryISO.toLowerCase() === 'eewwf') {
            layer = await getLayerView();
          } else if (activeTrend !== PROVINCE_TREND) {
            layer = await getLayerView();
          } else {
            layer = await view.whenLayerView(
              regionLayers[LAYER_OPTIONS.PROVINCES]
            );
          }
        } else if (tabOption === TABS.SHI) {
          if (countryISO.toLowerCase() === 'eewwf') {
            layer = await getLayerView();
          } else if (shiActiveTrend !== PROVINCE_TREND) {
            layer = await getLayerView();
          } else {
            layer = await view.whenLayerView(
              regionLayers[`${countryISO}-outline`]
            );
          }
        }
      } else if (selectedIndex === NAVIGATION.DATA_LAYER) {
        const topLayer = mapLegendLayers[0];
        if (topLayer) {
          layer = await view.whenLayerView(regionLayers[topLayer.id]);
        }
      } else {
        layer = await getLayerView();
      }

      setLayerView(layer);
    }
  }, [regionLayers, view, tabOption, mapLegendLayers]);

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

    highlight?.remove();
    hoverHighlight?.remove();

    if (selectedIndex === NAVIGATION.TRENDS) {
      if (tabOption === TABS.SPI && activeTrend !== NATIONAL_TREND) {
        setOnClickHandler(
          view.on('click', (event) => handleRegionClicked(event))
        );
        setOnPointerMoveHandler(view.on('pointer-move', handlePointerMove));
      } else if (tabOption === TABS.SHI && shiActiveTrend !== NATIONAL_TREND) {
        setOnClickHandler(
          view.on('click', (event) => handleRegionClicked(event))
        );
        setOnPointerMoveHandler(view.on('pointer-move', handlePointerMove));
      }
    } else {
      setOnClickHandler(
        view.on('click', (event) => handleRegionClicked(event))
      );
      setOnPointerMoveHandler(view.on('pointer-move', handlePointerMove));
    }
  }, [layerView, tabOption, activeTrend, shiActiveTrend]);
  return <div />;
}

export default AreaHighlightManagerComponent;
