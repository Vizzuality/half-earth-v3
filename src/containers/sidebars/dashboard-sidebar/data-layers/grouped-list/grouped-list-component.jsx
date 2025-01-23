import React, { useContext, useEffect } from 'react';

import { useT } from '@transifex/react';

import {
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  SPECIES_LAYER_IDS,
  GBIF_OCCURENCE_URL,
} from 'utils/dashboard-utils';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import ToggleLayerInfoContainer from 'components/toggle-layer-info';
import ToggleOpacityContainer from 'components/toggle-opacity';

import EsriFeatureService from 'services/esri-feature-service';

import {
  LAYER_TITLE_TYPES,
  LAYER_OPTIONS,
} from 'constants/dashboard-constants.js';

import ArrowIcon from 'icons/arrow_right.svg?react';

import styles from './grouped-list-styles.module.scss';

function GroupedListComponent(props) {
  const {
    dataPoints,
    countryISO,
    setDataPoints,
    map,
    view,
    speciesInfo,
    regionLayers,
    setRegionLayers,
    setShowHabitatChart,
    setIsHabitatChartLoading,
    isPrivate,
    setMapLegendLayers,
  } = props;
  const t = useT();
  const { lightMode } = useContext(LightModeContext);

  const expertRangeMapIds = [
    'ec694c34-bddd-4111-ba99-926a5f7866e8',
    '0ed89f4f-3ed2-41c2-9792-7c7314a55455',
    '98f229de-6131-41ef-aff1-7a52212b5a15',
    'd542e050-2ae5-457e-8476-027741538965',
  ];

  const pointObservationIds = [
    '9905692e-6a28-4310-b01e-476a471e5bf8',
    '794adb49-7458-41c4-a1c0-56537fdbec1d',
  ];

  const searchForLayers = (layerName) => {
    return map.layers.items.findIndex((item) => item.id === layerName);
  };

  const displayChildren = (key) => {
    const showChildren = !key.showChildren;

    const updatedDataPoints = dataPoints.map((dp) => {
      if (dp.id === key.id) {
        return { ...dp, showChildren };
      }
      return dp;
    });
    setDataPoints(updatedDataPoints);
  };

  const getLayerIcon = (layer, item) => {
    view.whenLayerView(layer).then(() => {
      const { renderer } = layer; // Get the renderer

      if (renderer) {
        const { symbol, uniqueValueGroups } = renderer;

        if (symbol) {
          const { url, outline } = symbol;

          if (url) {
            item.imageUrl = url;
          }

          if (outline) {
            item.outline = outline;
          }
        } else if (uniqueValueGroups) {
          item.classes = uniqueValueGroups[0].classes;
        }
      }

      setMapLegendLayers((ml) => [item, ...ml]);
    });
  };

  const displaySingleLayer = async (item) => {
    let updatedDataPoints = [];

    if (item.items?.length === 0) {
      updatedDataPoints = dataPoints.map((dp) => {
        if (dp.id === item.id) {
          return { ...dp, isActive: !dp.isActive };
        }
        return dp;
      });
    } else {
      updatedDataPoints = dataPoints.map((dp) => {
        if (dp.id === item.parentId) {
          return {
            ...dp,
            items: [
              ...dp.items.map((point) => {
                return point?.dataset_id === item.dataset_id
                  ? { ...point, isActive: !point.isActive }
                  : point;
              }),
            ],
          };
        }
        return dp;
      });
    }

    setDataPoints(updatedDataPoints);

    const id = item.id ?? item.parentId;
    let layer;

    if (id === LAYER_OPTIONS.PROTECTED_AREAS) {
      if (!item.isActive) {
        layer = await EsriFeatureService.addProtectedAreaLayer(
          null,
          countryISO
        );
      }
    } else if (id === LAYER_OPTIONS.ADMINISTRATIVE_LAYERS) {
      if (!item.isActive) {
        layer = await EsriFeatureService.getFeatureLayer(
          PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
          countryISO,
          id
        );
      }
    } else if (id === LAYER_OPTIONS.HABITAT) {
      if (!item.isActive) {
        setIsHabitatChartLoading(true);
        layer = await EsriFeatureService.getXYZLayer(
          speciesInfo.scientificname.replace(' ', '_'),
          id,
          LAYER_TITLE_TYPES.TREND
        );

        let layerIndex = searchForLayers(LAYER_OPTIONS.HABITAT) - 1;

        if (layerIndex < 0) {
          layerIndex = searchForLayers('GBIF (2023)') - 1;
        }

        if (layerIndex < 0) {
          layerIndex = map.layers.items.length;
        }

        view.whenLayerView(layer).then((layerView) => {
          layerView.watch('updating', (val) => {
            if (!val) {
              setIsHabitatChartLoading(false);
              setShowHabitatChart(true);
            }
          });
        });
      } else {
        setShowHabitatChart(false);
      }
    } else if (id === LAYER_OPTIONS.POINT_OBSERVATIONS) {
      if (isPrivate) {
        if (!item.isActive) {
          let url;

          switch (speciesInfo.scientificname.toLowerCase()) {
            case 'myotis bocagii':
              url = SPECIES_LAYER_IDS.Myotis_bocagii;
              break;
            case 'hyperolius castaneus':
              url = SPECIES_LAYER_IDS.Hyperolius_castaneus;
              break;
            case 'chiromantis rufescens':
              url = SPECIES_LAYER_IDS.Chiromantis_rufescens;
              break;
            default:
              break;
          }
          layer = await EsriFeatureService.getFeatureLayer(url, null, id);
        }
      }
    }

    // check if item is active to add/remove from Map Legend
    if (!item.isActive) {
      getLayerIcon(layer, item);

      setRegionLayers((rl) => ({
        ...rl,
        [id]: layer,
      }));
      map.add(layer);
    } else {
      setMapLegendLayers((ml) => {
        const filtered = ml.filter(
          (l) => l.id !== item.id || l.parentId !== item.parentId
        );
        return filtered;
      });

      // remove layer from map
      const layerToRemove = regionLayers[id];
      setRegionLayers((rl) => {
        const { [id]: name, ...rest } = rl;
        return rest;
      });
      map.remove(layerToRemove);
    }
  };

  const findLayerToShow = async (item) => {
    const layerParent = item.type_title.toUpperCase();
    const layerName = item.dataset_title.toUpperCase();
    let layer;
    let layerIndex = searchForLayers(layerName);

    if (layerParent === LAYER_TITLE_TYPES.EXPERT_RANGE_MAPS) {
      if (!item.isActive || layerIndex < 0) {
        if (expertRangeMapIds.find((id) => id === item.dataset_id)) {
          layer = await EsriFeatureService.getXYZLayer(
            speciesInfo.scientificname.replace(' ', '_'),
            layerName,
            LAYER_TITLE_TYPES.EXPERT_RANGE_MAPS
          );

          layerIndex = searchForLayers(LAYER_OPTIONS.HABITAT) - 1;

          if (layerIndex < 0) {
            layerIndex = searchForLayers('GBIF (2023)') - 1;
          }

          if (layerIndex < 0) {
            layerIndex = map.layers.items.length;
          }

          item.isActive = true;
          setRegionLayers((rl) => ({
            ...rl,
            [layerName]: layer,
          }));
          map.add(layer, layerIndex);

          setMapLegendLayers((ml) => [item, ...ml]);
        }
      } else {
        item.isActive = false;
        setRegionLayers((rl) => {
          const { [layerName]: name, ...rest } = rl;
          return rest;
        });
        map.remove(regionLayers[layerName]);

        setMapLegendLayers((ml) => {
          const filtered = ml.filter(
            (l) => l.id !== item.id || l.parentId !== item.parentId
          );
          return filtered;
        });
      }
    }

    if (layerParent === LAYER_TITLE_TYPES.POINT_OBSERVATIONS) {
      if (!item.isActive || layerIndex < 0) {
        if (pointObservationIds.find((id) => id === item.dataset_id)) {
          let name;

          if (layerName.match(/EBIRD/)) {
            name = `ebird_${speciesInfo.scientificname.replace(' ', '_')}`;

            layer = await EsriFeatureService.getGeoJsonLayer(
              name,
              layerName,
              countryISO
            );
          } else if (layerName.match(/GBIF/)) {
            name = `gbif_${speciesInfo.scientificname.replace(' ', '_')}`;

            layer = await EsriFeatureService.getFeatureOccurenceLayer(
              GBIF_OCCURENCE_URL,
              speciesInfo.scientificname,
              layerName
            );
          }

          layerIndex = searchForLayers(LAYER_OPTIONS.HABITAT);

          if (layerIndex < 0) {
            layerIndex = map.layers.items.length;
          }

          layerIndex += 1;
          item.isActive = true;
          setRegionLayers((rl) => ({
            ...rl,
            [layerName]: layer,
          }));
          map.add(layer, layerIndex);

          getLayerIcon(layer, item);
        }
      } else {
        item.isActive = false;
        setRegionLayers((rl) => {
          const { [layerName]: name, ...rest } = rl;
          return rest;
        });
        map.remove(regionLayers[layerName]);

        setMapLegendLayers((ml) => {
          const filtered = ml.filter(
            (l) => l.id !== item.id || l.parentId !== item.parentId
          );
          return filtered;
        });
      }
    }

    if (layerParent === LAYER_TITLE_TYPES.REGIONAL_CHECKLISTS) {
      if (!item.isActive) {
        layer = await EsriFeatureService.getMVTSource();

        setRegionLayers((rl) => ({
          ...rl,
          [layerName]: layer,
        }));
        map.add(layer, layerIndex);

        map.addSource('mapTiles', {
          type: 'vector',
          tiles: [
            'https://production-dot-tiler-dot-map-of-life.appspot.com/0.x/tiles/regions/regions/{proj}/{z}/{x}/{y}.pbf?region_id=1673cab0-c717-4367-9db0-5c63bf26944d',
          ],
        });

        map.add({
          id: 'mvt-fill',
          type: 'fill',
          source: 'mapTiles',
        });
      } else {
        setRegionLayers((rl) => {
          const { [layerName]: name, ...rest } = rl;
          return rest;
        });
        map.remove(regionLayers[layerName]);
      }
    }
  };

  // update value of all children
  const updateChildren = (item) => {
    const isActive = !item.isActive;

    const typeItems = item.items;

    // eslint-disable-next-line array-callback-return
    typeItems.map((i) => {
      findLayerToShow(i);
      i.isActive = isActive;
    });

    const updatedDataPoints = dataPoints.map((dp) => {
      if (dp.id === item.id) {
        return { ...dp, isActive, items: [...typeItems] };
      }
      return dp;
    });
    setDataPoints(updatedDataPoints);
  };

  // check if some but not all children are selected
  const checkIfSomeChecked = (key) => {
    const { items } = key;
    const typeItems =
      items.some((item) => item.isActive === true) &&
      !items.every((item) => item.isActive === true);
    return typeItems;
  };

  // check if all children are selected
  const checkIfAllChecked = (key) => {
    const { items } = key;
    const typeItems = items.every((item) => item.isActive === true);
    key.isActive = typeItems;
    return typeItems;
  };

  const getCheckbox = (item) => {
    let control = (
      <FormControlLabel
        label={t(item.dataset_title)}
        style={{
          textTransform: item.dataset_title.match(/(jetz|ebird)/i)
            ? 'none'
            : '',
        }}
        control={
          <Checkbox
            onClick={() => findLayerToShow(item)}
            checked={item.isActive}
          />
        }
      />
    );

    if (item.parentId === LAYER_OPTIONS.EXPERT_RANGE_MAPS) {
      if (!expertRangeMapIds.find((id) => id === item.dataset_id)) {
        control = (
          <FormControlLabel
            label={t(item.dataset_title)}
            disabled
            control={<Checkbox disabled className={styles.disabled} />}
          />
        );
      }
    }

    if (item.parentId === LAYER_OPTIONS.POINT_OBSERVATIONS) {
      if (!pointObservationIds.find((id) => id === item.dataset_id)) {
        control = (
          <FormControlLabel
            label={t(item.dataset_title)}
            disabled
            control={<Checkbox disabled className={styles.disabled} />}
          />
        );
      }
    }

    return control;
  };

  const activateDefault = () => {
    if (!map) return;
    const defaultLayers = dataPoints.filter((dp) => dp.isActive);
    defaultLayers.forEach((item) => {
      if (item.items?.length > 0) {
        item.items.forEach((point) => {
          findLayerToShow(point);
        });
      } else {
        displaySingleLayer(item);
      }
    });
  };

  useEffect(() => {
    activateDefault();
  }, [map]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {dataPoints.map((key) => (
        <div key={key.label}>
          {key.items?.length > 0 && (
            <>
              <div className={styles.parent}>
                <button
                  type="button"
                  onClick={() => displayChildren(key)}
                  aria-label="Toggle children visibility"
                >
                  <ArrowIcon
                    className={cx(styles.arrowIcon, {
                      [styles.isOpened]: key.showChildren,
                    })}
                  />
                </button>
                <FormControlLabel
                  label={t(key.label)}
                  control={
                    <Checkbox
                      indeterminate={checkIfSomeChecked(key)}
                      checked={checkIfAllChecked(key)}
                      onChange={() => updateChildren(key)}
                    />
                  }
                />
                <span>{key.total_no_rows}</span>
                <span />
                <ToggleLayerInfoContainer layer={key} {...props} />
              </div>
              {key.showChildren && (
                <ul>
                  {key.items.map((item) => (
                    <li key={item.dataset_id} className={styles.children}>
                      {getCheckbox(item)}
                      <span>{item.no_rows}</span>
                      {item.isActive && (
                        <ToggleOpacityContainer layer={item} {...props} />
                      )}
                      {!item.isActive && <span />}
                      <ToggleLayerInfoContainer layer={item} {...props} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {key.items?.length === 0 && (
            <div className={cx(styles.children)}>
              <FormControlLabel
                label={t(key.label)}
                control={
                  <Checkbox
                    onChange={() => displaySingleLayer(key)}
                    checked={key.isActive}
                  />
                }
              />
              <span />
              {key.isActive && (
                <ToggleOpacityContainer layer={key} {...props} />
              )}
              {!key.isActive && <span />}
              <ToggleLayerInfoContainer layer={key} {...props} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupedListComponent;
