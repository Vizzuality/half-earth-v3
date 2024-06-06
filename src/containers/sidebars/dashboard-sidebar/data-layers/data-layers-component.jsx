import React from 'react';

import LayerToggle from 'components/layer-toggle';

import { FUTURE_PLACES_SLUG } from 'constants/analyze-areas-constants';

import styles from './data-layers-styles.module.scss';

function DataLayerComponent(props) {
  const { map, activeLayers, handleLayerToggle, showProgress } = props;
  const speciesLayers = [];
  return (
    <section className={styles.container}>
      <button type="button">Download Data</button>
      <input type="search" placeholder="SEARCH FOR A DATASET" />
      {speciesLayers.map((layer) => (
        <LayerToggle
          map={map}
          option={layer}
          type="checkbox"
          variant="light"
          key={layer.value}
          showProgress={showProgress}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          themeCategorySlug={FUTURE_PLACES_SLUG}
        />
      ))}
    </section>
  );
}

export default DataLayerComponent;
