import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import {
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  SPECIES_LAYER_IDS,
} from 'utils/dashboard-utils';
import { GBIF_OCCURENCE_URL } from 'utils/dashboard-utils.js';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

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

  const displaySingleLayer = (item) => {
    if (item.items?.length === 0) {
      const updatedDataPoints = dataPoints.map((dp) => {
        if (dp.id === item.id) {
          return { ...dp, isActive: !dp.isActive };
        }
        return dp;
      });
      setDataPoints(updatedDataPoints);
    } else {
      const updatedDataPoints = dataPoints.map((dp) => {
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
      setDataPoints(updatedDataPoints);
    }

    const id = item.id ?? item.parentId;
    if (id === LAYER_OPTIONS.PROTECTED_AREAS) {
      if (!item.isActive) {
        const layers = EsriFeatureService.addProtectedAreaLayer(
          null,
          countryISO
        );

        setRegionLayers((rl) => ({
          ...rl,
          [id]: layers,
        }));
        map.add(layers);
      } else {
        const layer = regionLayers[id];
        setRegionLayers((rl) => {
          const { [id]: name, ...rest } = rl;
          return rest;
        });
        map.remove(layer);
      }
    } else if (id === LAYER_OPTIONS.ADMINISTRATIVE_LAYERS) {
      if (!item.isActive) {
        const layer = EsriFeatureService.getFeatureLayer(
          PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
          countryISO,
          id
        );

        setRegionLayers((rl) => ({
          ...rl,
          [id]: layer,
        }));
        map.add(layer);
      } else {
        const layer = regionLayers[id];
        setRegionLayers((rl) => {
          const { [id]: name, ...rest } = rl;
          return rest;
        });
        map.remove(layer);
      }
    } else if (id === LAYER_OPTIONS.HABITAT) {
      const layerName = id;
      if (!item.isActive) {
        setIsHabitatChartLoading(true);
        const webTileLayer = EsriFeatureService.getXYZLayer(
          speciesInfo.scientificname.replace(' ', '_'),
          layerName,
          LAYER_TITLE_TYPES.TREND
        );

        let layerIndex = searchForLayers(LAYER_OPTIONS.HABITAT) - 1;

        if (layerIndex < 0) {
          layerIndex = searchForLayers('GBIF (2023)') - 1;
        }

        if (layerIndex < 0) {
          layerIndex = map.layers.items.length;
        }

        webTileLayer.then((layer) => {
          setRegionLayers((rl) => ({
            ...rl,
            [layerName]: layer,
          }));
          map.add(layer);

          view.whenLayerView(layer).then((layerView) => {
            layerView.watch('updating', (val) => {
              if (!val) {
                setIsHabitatChartLoading(false);
                setShowHabitatChart(true);
              }
            });
          });
        });
      } else {
        setShowHabitatChart(false);
        setRegionLayers((rl) => {
          const { [layerName]: name, ...rest } = rl;
          return rest;
        });
        map.remove(regionLayers[layerName]);
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
          const layer = EsriFeatureService.getFeatureLayer(url, null, id);

          setRegionLayers((rl) => ({
            ...rl,
            [id]: layer,
          }));
          map.add(layer);
        } else {
          const layer = regionLayers.POINT_OBSERVATIONS;
          setRegionLayers((rl) => {
            const { [id]: name, ...rest } = rl;
            return rest;
          });
          map.remove(layer);
        }
      }
    }
  };

  const findLayerToShow = (item) => {
    const layerParent = item.type_title.toUpperCase();
    const layerName = item.dataset_title.toUpperCase();
    let layer;

    if (layerParent === LAYER_TITLE_TYPES.EXPERT_RANGE_MAPS) {
      if (!item.isActive) {
        if (expertRangeMapIds.find((id) => id === item.dataset_id)) {
          const webTileLayer = EsriFeatureService.getXYZLayer(
            speciesInfo.scientificname.replace(' ', '_'),
            layerName,
            LAYER_TITLE_TYPES.EXPERT_RANGE_MAPS
          );

          let layerIndex = searchForLayers(LAYER_OPTIONS.HABITAT) - 1;

          if (layerIndex < 0) {
            layerIndex = searchForLayers('GBIF (2023)') - 1;
          }

          if (layerIndex < 0) {
            layerIndex = map.layers.items.length;
          }

          webTileLayer.then((l) => {
            setRegionLayers((rl) => ({
              ...rl,
              [layerName]: l,
            }));
            map.add(l, layerIndex);
          });
        }
      } else {
        setRegionLayers((rl) => {
          const { [layerName]: name, ...rest } = rl;
          return rest;
        });
        map.remove(regionLayers[layerName]);
      }
    }

    if (layerParent === LAYER_TITLE_TYPES.POINT_OBSERVATIONS) {
      if (!item.isActive) {
        if (pointObservationIds.find((id) => id === item.dataset_id)) {
          let name;

          if (layerName.match(/EBIRD/)) {
            name = `ebird_${speciesInfo.scientificname.replace(' ', '_')}`;

            layer = EsriFeatureService.getGeoJsonLayer(
              name,
              layerName,
              countryISO
            );
            setRegionLayers((rl) => ({
              ...rl,
              [layerName]: layer,
            }));
          } else if (layerName.match(/GBIF/)) {
            name = `gbif_${speciesInfo.scientificname.replace(' ', '_')}`;

            layer = EsriFeatureService.getFeatureOccurenceLayer(
              GBIF_OCCURENCE_URL,
              speciesInfo.scientificname,
              layerName
            );

            setRegionLayers((rl) => ({
              ...rl,
              [layerName]: layer,
            }));
          }

          let layerIndex = searchForLayers(LAYER_OPTIONS.HABITAT);

          if (layerIndex < 0) {
            layerIndex = map.layers.items.length;
          }
          map.add(layer, layerIndex + 1);
        }
      } else {
        // const { [layerName]: name, ...rest } = regionLayers;
        setRegionLayers((rl) => {
          const { [layerName]: name, ...rest } = rl;
          return rest;
        });

        map.remove(regionLayers[layerName]);
      }
    }

    if (layerParent === LAYER_TITLE_TYPES.REGIONAL_CHECKLISTS) {
      if (!item.isActive) {
        const layer = EsriFeatureService.getMVTSource();

        setRegionLayers((rl) => ({
          ...rl,
          [layerName]: layer,
        }));

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

    displaySingleLayer(item);
  };

  // update value of all children
  const updateChildren = (item) => {
    const isActive = !item.isActive;

    const typeItems = item.items;

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

    // setDataPoints({
    //   ...dataPoints,
    //   [item]: {
    //     ...item,
    //     isActive,
    //     items: [...typeItems],
    //   },
    // });
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

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {dataPoints.map((key) => (
        <div key={key.label}>
          {key.items?.length > 0 && (
            <>
              <div className={styles.parent}>
                <button type="button" onClick={() => displayChildren(key)}>
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
                {/* Place holder, remove span when new icons are available */}
                <span />
                {/* <img className={styles.productTypeLogo}
                  src={`https://cdn.mol.org/static/images/legends/datatypes/${(dataPoints[key].items[0]?.product_type === 'points' ? 'points_agg' : dataPoints[key].items[0]?.product_type)}.png`} /> */}
                <span>{key.total_no_rows}</span>
              </div>
              {key.showChildren && (
                <ul>
                  {key.items.map((item) => (
                    <li key={item.dataset_id} className={styles.children}>
                      {getCheckbox(item)}

                      <span />
                      <span>{item.no_rows}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {key.items?.length === 0 && (
            <button
              type="button"
              className={cx(styles.children, styles.ml40)}
              onClick={() => displaySingleLayer(key)}
            >
              <FormControlLabel
                label={t(key.label)}
                control={<Checkbox checked={key.isActive} />}
              />
              <span />
              <span>{key.total_no_rows}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupedListComponent;
