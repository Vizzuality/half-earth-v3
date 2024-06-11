import React from 'react';

import cx from 'classnames';

import Button from 'components/button';
import LayerToggle from 'components/layer-toggle';
import SearchLocation from 'components/search-location';

import EsriFeatureService from 'services/esri-feature-service';

import {
  PROTECTION_SLUG,
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG,
} from 'constants/analyze-areas-constants';
import {
  COUNTRIES_LABELS_FEATURE_LAYER,
  REGIONS_LABELS_LAYER,
  COUNTRIES_DATA_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  FOOBAR,
} from 'constants/layers-slugs.js';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import { ReactComponent as ArrowIcon } from 'icons/arrow_right.svg';

import styles from './data-layers-styles.module.scss';

function DataLayerComponent(props) {
  const {
    map,
    activeLayers,
    handleLayerToggle,
    showProgress,
    view,
    selectedOption,
  } = props;
  const speciesPublicLayers = [
    {
      name: 'Point Observations',
      value: COUNTRIES_LABELS_FEATURE_LAYER,
    },
    {
      name: 'Habitat Suitable Range',
      value: FOOBAR,
    },
    {
      name: 'Local Inventories',
      value: REGIONS_LABELS_LAYER,
    },
    {
      name: 'Expert Range Maps',
      value: COUNTRIES_DATA_FEATURE_LAYER,
    },
    {
      name: 'Regional Checklists',
      value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
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

  const showLayer = () => {
    const taxa = 'mammals';
    const scientificname = 'Syncerus caffer';

    const url =
      'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/occurrence_202301_alltaxa_drc_test/FeatureServer/0';

    EsriFeatureService.getFeatures({
      url,
      whereClause: `taxa = '${taxa}' AND scientificname = '${scientificname}'`,
      returnGeometry: true,
    }).then((features) => {
      const { layer } = features[0];
      map.add(layer);
    });
  };

  return (
    <section className={styles.container}>
      <span className={styles.sectionTitle}>Data Layers</span>
      <hr className={hrTheme.dark} />
      <div className={styles.data}>
        <Button
          type="rectangular"
          className={styles.saveButton}
          label="download data"
        />
        <SearchLocation
          stacked
          searchType={SEARCH_TYPES.full}
          view={view}
          theme="dark"
          width="full"
          parentWidth="380px"
          searchSourceLayerSlug={selectedOption?.slug}
        />
      </div>
      <hr className={hrTheme.dark} />
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => {}}
      >
        <ArrowIcon
          className={cx(styles.arrowIcon, {
            [styles.isOpened]: isOpened,
          })}
        />
        <span>Distribute Data: Public</span>
      </button>

      <button type="button" onClick={showLayer}>
        Show Layer
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
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => {}}
      >
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
      <button
        className={styles.distributionTitle}
        type="button"
        onClick={() => {}}
      >
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
