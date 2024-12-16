import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import { PROVINCE_FEATURE_GLOBAL_OUTLINE_ID } from 'utils/dashboard-utils';

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
    speciesInfo,
    regionLayers,
    setRegionLayers,
    setShowHabitatChart,
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
    const showChildren = !dataPoints[key].showChildren;

    setDataPoints({
      ...dataPoints,
      [key]: {
        ...dataPoints[key],
        showChildren,
      },
    });
  };

  const displaySingleLayer = (item) => {
    if (dataPoints[item]?.items.length === 0) {
      setDataPoints({
        ...dataPoints,
        [item]: { ...dataPoints[item], isActive: !dataPoints[item].isActive },
      });
    } else {
      setDataPoints({
        ...dataPoints,
        [item.type_title]: {
          ...dataPoints[item.type_title],
          items: [
            ...dataPoints[item.type_title].items.map((point) => {
              return point?.dataset_id === item.dataset_id
                ? { ...point, isActive: !point.isActive }
                : point;
            }),
          ],
        },
      });
    }

    if (typeof item === 'string') {
      if (
        item.toUpperCase() === 'AIRES PROTÉGÉES' ||
        item.toUpperCase() === 'PROTECTED AREAS'
      ) {
        if (!dataPoints[item].isActive) {
          const layers = EsriFeatureService.addProtectedAreaLayer(
            null,
            countryISO
          );

          setRegionLayers((rl) => ({
            ...rl,
            [LAYER_OPTIONS.PROTECTED_AREAS]: layers,
          }));
          map.add(layers);
        } else {
          setRegionLayers((rl) => {
            const { [LAYER_OPTIONS.PROTECTED_AREAS]: name, ...rest } = rl;
            return rest;
          });
        }
      } else if (
        item.toUpperCase() === 'AIRES PROTÉGÉES' ||
        item.toUpperCase() === 'ADMINISTRATIVE LAYERS'
      ) {
        if (!dataPoints[item].isActive) {
          const layer = EsriFeatureService.getFeatureLayer(
            PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
            countryISO,
            item.toUpperCase()
          );

          setRegionLayers((rl) => ({
            ...rl,
            [item.toUpperCase()]: layer,
          }));
          map.add(layer);
        } else {
          const layer = regionLayers[item.toUpperCase()];
          setRegionLayers((rl) => {
            const { [item.toUpperCase()]: name, ...rest } = rl;
            return rest;
          });
          map.remove(layer);
        }
      } else if (
        item.toUpperCase() === "PERTE/GAIN D'HABITAT" ||
        item.toUpperCase() === 'HABITAT LOSS/GAIN'
      ) {
        const layerName = item.toUpperCase();
        if (!dataPoints[item].isActive) {
          setShowHabitatChart(true);
          const webTileLayer = EsriFeatureService.getXYZLayer(
            speciesInfo.scientificname.replace(' ', '_'),
            layerName,
            LAYER_TITLE_TYPES.TREND
          );

          let layerIndex = searchForLayers('HABITAT LOSS/GAIN') - 1;

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
          });
        } else {
          setShowHabitatChart(false);
          setRegionLayers((rl) => {
            const { [layerName]: name, ...rest } = rl;
            return rest;
          });
          map.remove(regionLayers[layerName]);
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

          let layerIndex = searchForLayers('HABITAT LOSS/GAIN') - 1;

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
          } else if (layerName.match(/GBIF/)) {
            name = `gbif_${speciesInfo.scientificname.replace(' ', '_')}`;
          }

          layer = EsriFeatureService.getGeoJsonLayer(
            name,
            layerName,
            countryISO
          );
          setRegionLayers((rl) => ({
            ...rl,
            [layerName]: layer,
          }));

          let layerIndex = searchForLayers('HABITAT LOSS/GAIN');

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
    const isActive = !dataPoints[item].isActive;

    const typeItems = dataPoints[item].items;

    typeItems.map((i) => {
      findLayerToShow(i);
      i.isActive = isActive;
    });

    setDataPoints({
      ...dataPoints,
      [item]: {
        ...dataPoints[item],
        isActive,
        items: [...typeItems],
      },
    });
  };

  // check if some but not all children are selected
  const checkIfSomeChecked = (key) => {
    const { items } = dataPoints[key];
    const typeItems =
      items.some((item) => item.isActive === true) &&
      !items.every((item) => item.isActive === true);
    return typeItems;
  };

  // check if all children are selected
  const checkIfAllChecked = (key) => {
    const { items } = dataPoints[key];
    const typeItems = items.every((item) => item.isActive === true);
    dataPoints[key].isActive = typeItems;
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

    if (item.type_title.toUpperCase() === LAYER_TITLE_TYPES.EXPERT_RANGE_MAPS) {
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

    if (
      item.type_title.toUpperCase() === LAYER_TITLE_TYPES.POINT_OBSERVATIONS
    ) {
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
      {Object.keys(dataPoints).map((key) => (
        <div key={key}>
          {dataPoints[key].items.length > 0 && (
            <>
              <div className={styles.parent}>
                <button type="button" onClick={() => displayChildren(key)}>
                  <ArrowIcon
                    className={cx(styles.arrowIcon, {
                      [styles.isOpened]: dataPoints[key].showChildren,
                    })}
                  />
                </button>
                <FormControlLabel
                  label={t(key)}
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
                <span>{dataPoints[key].total_no_rows}</span>
              </div>
              {dataPoints[key].showChildren && (
                <ul>
                  {dataPoints[key].items.map((item) => (
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
          {dataPoints[key].items.length === 0 && (
            <div
              className={styles.children}
              onClick={() => displaySingleLayer(key)}
            >
              <FormControlLabel
                label={t(key)}
                control={<Checkbox checked={dataPoints[key].isActive} />}
              />
              <span />
              <span>{dataPoints[key].total_no_rows}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupedListComponent;
