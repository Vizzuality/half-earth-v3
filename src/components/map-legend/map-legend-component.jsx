import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import ToggleOpacityContainer from 'components/toggle-opacity';

import {
  LAYER_OPTIONS,
  REGION_OPTIONS,
} from 'constants/dashboard-constants.js';

import ArrowUpIcon from 'icons/dashboard/arrow_icon.svg?react';

import SHILegendImage from 'images/dashboard/shi_legend.png';
import SPILegendImage from 'images/dashboard/spi_legend.png';
import HabitatLegendImage from 'images/hab_change_colorRamp.png';

import styles from './map-legend-component-styles.module.scss';

function MapLegendComponent(props) {
  const { mapLegendLayers, map, setMapLegendLayers, countryISO } = props;
  const t = useT();
  const [leftPosition, setLeftPosition] = useState(0);

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

    if (layer.id === LAYER_OPTIONS.HABITAT) {
      return (
        <img src={HabitatLegendImage} width="100%" height={20} alt="Habitat" />
      );
    }
    if (layer.id === REGION_OPTIONS.PROVINCES) {
      return (
        <div className={styles.mapLegend}>
          <img src={SPILegendImage} width="100%" height={20} alt="SPI" />
          <div className={styles.legendValues}>
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      );
    }
    if (layer.id === `${countryISO}-outline`) {
      return (
        <div className={styles.mapLegend}>
          <img src={SHILegendImage} width="100%" height={20} alt="SHI" />
          <div className={styles.legendValues}>
            <span>0</span>
            <span>100</span>
          </div>
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
      (l) => l.id.toUpperCase() === layer.id.toUpperCase()
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

  const hideArrows = (layer) => {
    if (
      layer.id === REGION_OPTIONS.PROVINCES ||
      layer.id === `${countryISO}-outline`
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const sidebar = document.getElementById('dashboard-sidebar');

    const rect = sidebar.getBoundingClientRect();
    const style = window.getComputedStyle(sidebar);
    const left = style.getPropertyValue('left');

    setLeftPosition(`${rect.width + parseInt(left, 10) + 10}px`);
  }, []);

  return (
    <div className={styles.container} style={{ left: leftPosition }}>
      <span className={styles.title}>{t('Map Legend')}asdfsdf</span>
      <ul className={styles.layers}>
        {Object.values(mapLegendLayers).map((layer, index) => (
          <li key={`${layer.id}-${layer.label}`}>
            <div className={styles.info}>
              <b>{layer.label?.toUpperCase()}</b>
              {layer.parent && <span>{layer.parent}</span>}
              {getLayerIcon(layer)}
            </div>
            <ToggleOpacityContainer layer={layer} {...props} />
            {!hideArrows(layer) && (
              <>
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
                  className={cx(styles.arrows, styles.down, {
                    [styles.disabled]: index === mapLegendLayers.length - 1,
                  })}
                  aria-label={t('Move layer down')}
                  onClick={() => moveLayerDown(layer)}
                  disabled={index === mapLegendLayers.length - 1}
                >
                  <ArrowUpIcon />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapLegendComponent;
