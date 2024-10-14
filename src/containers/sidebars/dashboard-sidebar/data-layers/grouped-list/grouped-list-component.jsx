import React, { useContext, useState } from 'react';
import cx from 'classnames';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowIcon from 'icons/arrow_right.svg?react';
import EsriFeatureService from 'services/esri-feature-service';

import styles from './grouped-list-styles.module.scss';
import { useT } from '@transifex/react';
import { LightModeContext } from '../../../../../context/light-mode';

function GroupedListComponent(props) {
  const { dataPoints, setDataPoints, map, speciesInfo, regionLayers, setRegionLayers } = props;
  const t = useT();
  const { lightMode } = useContext(LightModeContext);

  const expertRangeMapIds = ['ec694c34-bddd-4111-ba99-926a5f7866e8',
    '0ed89f4f-3ed2-41c2-9792-7c7314a55455',
    '98f229de-6131-41ef-aff1-7a52212b5a15',
    'd542e050-2ae5-457e-8476-027741538965']

  const displayChildren = (key) => {
    const showChildren = !dataPoints[key].showChildren;

    setDataPoints({
      ...dataPoints,
      [key]: {
        ...dataPoints[key],
        showChildren: showChildren,
      }
    });
  };

  const protectedAreasURL = 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/DRC_WDPA_all/VectorTileServer';
  const vtLayer = EsriFeatureService.getVectorTileLayer(protectedAreasURL);

  const administrativeLayerURL = `https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/DRC_provinces_spi_oct4/MapServer`;
  const administrativeLayer = EsriFeatureService.getTileLayer(administrativeLayerURL);

  // update value of all children
  const updateChildren = (item) => {
    const isActive = !dataPoints[item].isActive;

    const typeItems = dataPoints[item].items;

    typeItems.map(item => {
      findLayerToShow(item);
      item.isActive = isActive;
    });

    setDataPoints({
      ...dataPoints,
      [item]: {
        ...dataPoints[item],
        isActive: isActive,
        items: [
          ...typeItems
        ]
      }
    });
  }

  const displaySingleLayer = (item) => {
    if (dataPoints[item]?.items.length === 0) {
      setDataPoints({
        ...dataPoints, [item]: { ...dataPoints[item], isActive: !dataPoints[item].isActive }
      });
    } else {
      setDataPoints({
        ...dataPoints,
        [item.type_title]: {
          ...dataPoints[item.type_title],
          items: [
            ...dataPoints[item.type_title].items.map(point => {
              return point?.dataset_id === item.dataset_id ? { ...point, isActive: !point.isActive } : point
            }),
          ]
        }
      });
    }

    if (typeof item === 'string') {
      if (item.toUpperCase() === 'AIRES PROTÉGÉES' || item.toUpperCase() === 'PROTECTED AREAS') {
        if (!dataPoints[item].isActive) {
          setRegionLayers({ ...regionLayers, [item.toUpperCase()]: vtLayer });
          map.add(vtLayer);
        } else {
          const layer = regionLayers[item.toUpperCase()];
          const { [item.toUpperCase()]: name, ...rest } = regionLayers;
          setRegionLayers(rest);
          map.remove(layer);
        }
      } else if (item.toUpperCase() === 'AIRES PROTÉGÉES' || item.toUpperCase() === 'ADMINISTRATIVE LAYERS') {
        if (!dataPoints[item].isActive) {
          setRegionLayers({ ...regionLayers, [item.toUpperCase()]: administrativeLayer });
          map.add(administrativeLayer);
        } else {
          const layer = regionLayers[item.toUpperCase()];
          const { [item.toUpperCase()]: name, ...rest } = regionLayers;
          setRegionLayers(rest);
          map.remove(layer);
        }
      }
    }
  };

  const findLayerToShow = (item) => {
    const layerParent = item.type_title.toUpperCase();
    const layerName = item.dataset_title.toUpperCase();

    if (layerParent === 'POINT OBSERVATIONS') {
      if (!item.isActive) {
        const jsonLayer = EsriFeatureService.getGeoJsonLayer(speciesInfo.scientificname.replace(' ', '_'));
        setRegionLayers({ ...regionLayers, [layerName]: jsonLayer });
        map.add(jsonLayer);
      } else {
        const layer = regionLayers[layerName];
        const { [layerName]: name, ...rest } = regionLayers;
        setRegionLayers(rest);
        map.remove(layer);
      }
    }

    if (layerParent === 'EXPERT RANGE MAPS') {
      if (!item.isActive) {
        const webTileLayer = EsriFeatureService.getXYZLayer(speciesInfo.scientificname.replace(' ', '_'));
        webTileLayer.then(layer => {
          setRegionLayers({ ...regionLayers, [layerName]: layer });
          map.add(layer);
        });
      } else {
        const { [layerName]: name, ...rest } = regionLayers;
        setRegionLayers(rest);
        map.remove(regionLayers[layerName]);
      }
    }

    if (layerParent === 'REGIONAL CHECKLISTS') {
      if (!item.isActive) {
        const webTileLayer = EsriFeatureService.getMVTSource();

        setRegionLayers({ ...regionLayers, [layerName]: webTileLayer });

        map.addSource('mapTiles', {
          type: 'vector',
          tiles: [
            'https://production-dot-tiler-dot-map-of-life.appspot.com/0.x/tiles/regions/regions/{proj}/{z}/{x}/{y}.pbf?region_id=1673cab0-c717-4367-9db0-5c63bf26944d'
          ]
        });


        map.add({
          id: 'mvt-fill',
          type: 'fill',
          source: 'mapTiles'
        });

      } else {
        const { [layerName]: name, ...rest } = regionLayers;
        setRegionLayers(rest);
        map.remove(regionLayers[layerName]);
      }
    }

    displaySingleLayer(item)
  }

  // check if some but not all children are selected
  const checkIfSomeChecked = (key) => {
    const items = dataPoints[key].items
    const typeItems = items.some(item => item.isActive === true) && !items.every(item => item.isActive === true);
    return typeItems;
  }

  // check if all children are selected
  const checkIfAllChecked = (key) => {
    const items = dataPoints[key].items
    const typeItems = items.every(item => item.isActive === true);
    dataPoints[key].isActive = typeItems;
    return typeItems;
  }

  const getCheckbox = (item) => {
    let control = <FormControlLabel
      label={t(item.dataset_title)}
      control={<Checkbox onClick={() => findLayerToShow(item)} checked={item.isActive} />}
    />

    if (item.type_title.toUpperCase() === 'EXPERT RANGE MAPS') {
      if (!expertRangeMapIds.find((id) => id === item.dataset_id)) {
        control = <FormControlLabel
          label={t(item.dataset_title)}
          disabled
          control={<Checkbox disabled className={styles.disabled} />}
        />
      }
    }

    return control;
  }

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {Object.keys(dataPoints).map((key) => (
        <div key={key}>
          {dataPoints[key].items.length > 0 &&
            <>
              <div className={styles.parent}>
                <button onClick={() => displayChildren(key)}>
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
                <img className={styles.productTypeLogo}
                  src={`https://cdn.mol.org/static/images/legends/datatypes/${(dataPoints[key].items[0]?.product_type === 'points' ? 'points_agg' : dataPoints[key].items[0]?.product_type)}.png`} />
                <span>{dataPoints[key].total_no_rows}</span>
              </div>
              {dataPoints[key].showChildren && <ul>
                {dataPoints[key].items.map((item) => (
                  <li key={item.dataset_id} className={styles.children}>
                    {getCheckbox(item)}

                    <span></span>
                    <span>{item.no_rows}</span>
                  </li>
                ))}
              </ul>
              }
            </>
          }
          {dataPoints[key].items.length === 0 && <div className={styles.children} onClick={() => displaySingleLayer(key)}>
            <FormControlLabel
              label={t(key)}
              control={<Checkbox checked={dataPoints[key].isActive} />}
            />
            <span></span>
            <span>{dataPoints[key].total_no_rows}</span>
          </div>
          }
        </div>
      ))}
    </div>
  );
}

export default GroupedListComponent;
