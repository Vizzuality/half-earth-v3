import React from 'react';

import cx from 'classnames';

import Button from 'components/button';
import LayerToggle from 'components/layer-toggle';
// import SearchInput from 'components/search-input';

import {
  PROTECTION_SLUG,
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG,
} from 'constants/analyze-areas-constants';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import { ReactComponent as ArrowIcon } from 'icons/arrow_right.svg';

import styles from './data-layers-styles.module.scss';

function DataLayerComponent(props) {
  const { map, activeLayers, handleLayerToggle, showProgress } = props;
  const speciesPublicLayers = [
    {
      name: 'Point Observations',
      value: 'countries_labels_layer',
    },
    {
      name: 'Habitat Suitable Range',
      value: 'protected_areas_vector_tile_layer',
    },
    {
      name: 'Local Inventories',
      value: 'regions_labels_layer',
    },
    {
      name: 'Expert Range Maps',
      value: 'countries_data_layer',
    },
    {
      name: 'Regional Checklists',
      value: 'community_areas_vector_tile_layer',
    },
  ];

  const speciesPrivateLayers = [
    {
      name: 'Point Observations',
      value: 'PointObservations6',
    },
  ];

  const speciesRegionsLayers = [
    {
      name: 'Protected Areas',
      value: 'PointObservations7',
    },
    {
      name: 'Proposed Protected',
      value: 'PointObservations8',
    },
    {
      name: 'Administrative Layers',
      value: 'PointObservations9',
    },
  ];

  const isOpened = true;

  return (
    <section className={styles.container}>
      <Button
        type="rectangular"
        className={styles.saveButton}
        label="download data"
      />
      {/* <SearchInput placeholder="Search a dataset" /> */}
      <hr className={hrTheme.dark} />
      <button className={styles.sectionTitle} type="button" onClick={() => {}}>
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: isOpened,
          })}
        />
        <span>Distribute Data: Public</span>
      </button>

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
          themeCategorySlug={PROTECTION_SLUG}
        />
      ))}
      <hr className={hrTheme.dark} />
      <button className={styles.sectionTitle} type="button" onClick={() => {}}>
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: isOpened,
          })}
        />
        <span>Distribute Data: Private</span>
      </button>
      {speciesPrivateLayers.map((layer) => (
        <LayerToggle
          map={map}
          option={layer}
          type="checkbox"
          variant="light"
          key={layer.value}
          showProgress={showProgress}
          activeLayers={activeLayers}
          themeCategorySlug={LAND_HUMAN_PRESSURES_SLUG}
          onChange={handleLayerToggle}
        />
      ))}
      <hr className={hrTheme.dark} />
      <button className={styles.sectionTitle} type="button" onClick={() => {}}>
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: isOpened,
          })}
        />
        <span>Regions Data</span>
      </button>
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
          themeCategorySlug={BIODIVERSITY_SLUG}
        />
      ))}
    </section>
  );
}

export default DataLayerComponent;
