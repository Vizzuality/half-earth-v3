import React from 'react';

import Button from 'components/button';
import LayerToggle from 'components/layer-toggle';
import SearchInput from 'components/search-input';

import { FUTURE_PLACES_SLUG } from 'constants/analyze-areas-constants';

import styles from './data-layers-styles.module.scss';

function DataLayerComponent(props) {
  const { map, activeLayers, handleLayerToggle, showProgress } = props;
  const speciesPublicLayers = [
    {
      name: 'Point Observations',
      value: 'PointObservations',
    },
    {
      name: 'Habitat Suitable Range',
      value: 'PointObservations',
    },
    {
      name: 'Local Inventories',
      value: 'PointObservations',
    },
    {
      name: 'Expert Range Maps',
      value: 'PointObservations',
    },
    {
      name: 'Regional Checklists',
      value: 'PointObservations',
    },
  ];

  const speciesPrivateLayers = [
    {
      name: 'Point Observations',
      value: 'PointObservations',
    },
  ];

  const speciesRegionsLayers = [
    {
      name: 'Protected Areas',
      value: 'PointObservations',
    },
    {
      name: 'Proposed Protected',
      value: 'PointObservations',
    },
    {
      name: 'Administrative Layers',
      value: 'PointObservations',
    },
  ];

  return (
    <section className={styles.container}>
      <Button
        type="rectangular"
        className={styles.saveButton}
        label="download data"
      />
      <SearchInput placeholder="Search a dataset" />
      <h3>Distribute Data: Public</h3>
      {speciesPublicLayers.map((layer) => (
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
      <h3>Distribute Data: Private</h3>
      {speciesPrivateLayers.map((layer) => (
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
      <h3>Regions Data</h3>
      {speciesRegionsLayers.map((layer) => (
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
