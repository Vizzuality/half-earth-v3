import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import { LAYER_OPTIONS } from 'constants/dashboard-constants.js';

import ArrowDownIcon from 'icons/arrow-down-solid.svg?react';
import ArrowUpIcon from 'icons/arrow-up-solid.svg?react';

import styles from './map-legend-component-styles.module.scss';

function MapLegendComponent(props) {
  const { mapLegendLayers, map, setMapLegendLayers } = props;
  const t = useT();

  const getLayerIcon = (layer) => {
    if (layer.parentId === LAYER_OPTIONS.EXPERT_RANGE_MAPS) {
      return (
        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
          <div
            className={styles.box}
            style={{
              backgroundColor: 'rgb(23, 40, 135)',
            }}
          />
        </div>
      );
    }
    if (layer.imageUrl) {
      // Use layer image, (Point observations)
      return <img src={layer.imageUrl} width={20} height={20} alt="Point" />;
    }

    // Use layer outline styles (Administrative Layers)
    if (layer.outline) {
      const { color } = layer.outline;
      const outline = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      return (
        <div className={styles.wrapper}>
          <div
            className={styles.box}
            style={{
              borderColor: outline,
            }}
          />
        </div>
      );
    }

    // Use layer styling classes (Protected Areas)
    if (layer.classes) {
      return (
        <div className={cx(styles.wrapper, styles.column)}>
          {layer.classes.map((item) => {
            const { color } = item.symbol;
            const backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
            return (
              <div style={{ display: 'flex', gap: '5px' }}>
                <div className={styles.box} style={{ backgroundColor }} />
                {t(item.label)}
              </div>
            );
          })}
        </div>
      );
    }
    return '❓'; // Default icon for unknown layer types
  };

  const moveItem = (arr, fromIndex, toIndex) => {
    const removedItem = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex, 0, removedItem);
    return arr;
  };

  const findLayerOnMap = (layer) => {
    // find layer to move on map
    const layerIndex = map.layers.items.findIndex(
      (l) => l.id.toUpperCase() === layer.label.toUpperCase()
    );
    const foundObject = map.layers.items[layerIndex];

    return { layerIndex, foundObject };
  };

  const findLayerInLegend = (layer) => {
    const newLayers = [...mapLegendLayers];
    const newLayerIndex = newLayers.findIndex(
      (l) => l.label.toUpperCase() === layer.label.toUpperCase()
    );
    return { newLayerIndex, newLayers };
  };

  const moveLayerUp = (layer) => {
    const { foundObject, layerIndex } = findLayerOnMap(layer);
    map.layers.reorder(foundObject, layerIndex + 1);

    // find layer to move in legend
    const { newLayerIndex, newLayers } = findLayerInLegend(layer);
    const updateLayers = moveItem(newLayers, newLayerIndex, newLayerIndex - 1);
    setMapLegendLayers(updateLayers);
  };

  const moveLayerDown = (layer) => {
    const { foundObject, layerIndex } = findLayerOnMap(layer);
    map.layers.reorder(foundObject, layerIndex - 1);

    const { newLayerIndex, newLayers } = findLayerInLegend(layer);
    const updateLayers = moveItem(newLayers, newLayerIndex, newLayerIndex + 1);
    setMapLegendLayers(updateLayers);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>{t('Map Legend')}</span>
      <ul className={styles.layers}>
        {Object.values(mapLegendLayers).map((layer, index) => (
          <li key={`${layer.id}-${layer.label}`}>
            <button
              type="button"
              className={cx(styles.arrows, {
                [styles.disabled]: index === 0,
              })}
              aria-label={t('Move layer up')}
              onClick={() => moveLayerUp(layer)}
              disabled={index === 0}
            >
              <ArrowUpIcon />
            </button>
            <button
              type="button"
              className={cx(styles.arrows, {
                [styles.disabled]: index === mapLegendLayers.length - 1,
              })}
              aria-label={t('Move layer down')}
              onClick={() => moveLayerDown(layer)}
              disabled={index === mapLegendLayers.length - 1}
            >
              <ArrowDownIcon />
            </button>
            <div className={styles.info}>
              <b>{layer.label?.toLowerCase()}</b>
              <span>{layer.parent}</span>
              {getLayerIcon(layer)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapLegendComponent;
