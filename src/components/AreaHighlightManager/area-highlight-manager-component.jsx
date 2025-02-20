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
  PROVINCE_TREND,
  TABS,
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
      regionLayers[LAYER_OPTIONS.PROVINCES] ||
        regionLayers[LAYER_OPTIONS.ADMINISTRATIVE_LAYERS] ||
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

                // eslint-disable-next-line camelcase
                setRegionName(NAME || NAME_1 || region_name || territoire);
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

          handleRegionSelected(hits);
          // highlight = layerView.highlight(hits.graphic);
        }
      }
    } catch (error) {
      throw Error(error);
    }
  };

  const handlePointerMove = async (event) => {
    let hits;

    try {
      hits = await hitTest(event);

      if (hits) {
        let name;
        // eslint-disable-next-line camelcase
        const { NAME, NAME_1, territoire, region_name, DESIG } =
          hits.attributes;

        const countryMatch =
          hits.attributes.ISO3 === countryISO ||
          hits.attributes.GID_0 === countryISO;

        if (countryMatch) {
          // eslint-disable-next-line camelcase
          name = NAME || NAME_1 || region_name;
        } else {
          name = territoire;
        }

        if (name) {
          if (name !== prevHoverName) {
            prevHoverName = name;
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
              title: `${name}`,
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
      throw Error(error);
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
          layer = await view.whenLayerView(
            regionLayers[LAYER_OPTIONS.PROVINCES]
          );
        } else if (tabOption === TABS.SHI) {
          layer = await view.whenLayerView(
            regionLayers[`${countryISO}-outline`]
          );
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
      if (tabOption === TABS.SPI && activeTrend === PROVINCE_TREND) {
        setOnClickHandler(
          view.on('click', (event) => handleRegionClicked(event))
        );
        setOnPointerMoveHandler(view.on('pointer-move', handlePointerMove));
      } else if (tabOption === TABS.SHI && shiActiveTrend === PROVINCE_TREND) {
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
