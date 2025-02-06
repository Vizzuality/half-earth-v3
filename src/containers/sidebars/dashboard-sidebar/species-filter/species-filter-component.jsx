import React, { useContext, useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import {
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  DRC_REGION_FEATURE_ID,
} from 'utils/dashboard-utils';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';
import FilterContainer from 'components/filters';
import SpeciesListContainer from 'components/species-list';

import EsriFeatureService from 'services/esri-feature-service';

import {
  LAYER_OPTIONS,
  NAVIGATION,
  REGION_OPTIONS,
} from 'constants/dashboard-constants.js';

import styles from '../dashboard-sidebar-styles.module.scss';

import filterStyles from './species-filter-styles.module.scss';

function SpeciesFilterComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);

  const {
    selectedRegionOption,
    setSelectedRegionOption,
    setSelectedIndex,
    setSelectedTaxa,
    speciesListLoading,
    selectedRegion,
    setRegionName,
    exploreAllSpecies,
    setSelectedRegion,
    regionName,
    setRegionLayers,
    map,
    countryISO,
  } = props;

  const filterStart = [
    {
      name: 'dataset',
      title: t('Expected Sources'),
      filters: [
        {
          name: t('Refined Range Map'),
          active: false,
          test: (species) => species.source.indexOf('range') > -1,
          count: 0,
          type: 'and',
          result: false,
        },
      ],
    },
    {
      name: 'dataset',
      title: t('Recorded Sources'),
      filters: [
        {
          name: t('Occurrence'),
          active: false,
          test: (species) => species.source.indexOf('GBIF') > -1,
          count: 0,
          result: false,
          type: 'and',
        },
        // {
        //   name: 'Local Inventory',
        //   active: false,
        //   test: (species) =>
        //     species.datasetList.map((d) => d.product_type).indexOf('localinv') >
        //     -1,
        //   result: false,
        //   count: 0,
        //   type: 'and',
        // },
      ],
    },
    {
      name: 'threat',
      title: t('IUCN Status'),
      filters: [
        {
          name: t('Critically Endangered'),
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'CRITICALLY ENDANGERED',
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: t('Endangered'),
          result: false,
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'ENDANGERED',
          count: 0,
          type: 'or',
        },
        {
          name: t('Vulnerable'),
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'VULNERABLE',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Near Threatened'),
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'NEAR THREATENED',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Least Concern'),
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'LEAST CONCERN',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Data Deficient'),
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'DATA DEFICIENT',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Unknown'),
          active: false,
          result: false,
          test: (species) => species.threat_status === undefined,
          count: 0,
          type: 'or',
        },
      ],
    },
  ];

  const [filters, setFilters] = useState(filterStart);
  const [regionLabel, setRegionLabel] = useState();

  const handleBack = () => {
    setSelectedTaxa(null);
    setSelectedRegion(null);
    setRegionName('');
    setSelectedRegionOption(null);
    setSelectedIndex(NAVIGATION.REGION);
  };

  const removeRegionLayers = () => {
    const protectedAreaLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.PROTECTED_AREAS
    );
    const provinceLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.PROVINCES
    );
    const forestLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.FORESTS
    );

    map.remove(protectedAreaLayer);
    map.remove(provinceLayer);
    map.remove(forestLayer);
    setRegionLayers({});
  };

  const displayLayer = async (option) => {
    let featureLayer;
    if (option === REGION_OPTIONS.PROTECTED_AREAS) {
      featureLayer = await EsriFeatureService.addProtectedAreaLayer(
        null,
        countryISO
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROTECTED_AREAS]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.PROVINCES) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
        countryISO
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROVINCES]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.FORESTS) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        DRC_REGION_FEATURE_ID,
        null,
        LAYER_OPTIONS.FORESTS
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.FORESTS]: featureLayer,
      }));
      map.add(featureLayer);
    }
  };

  const updateActiveFilter = (filter) => {
    const newFilters = filters.map((filterGroup) => {
      const newFilterGroup = { ...filterGroup };
      newFilterGroup.filters = filterGroup.filters.map((f) => {
        if (f.name === filter.name) {
          f.active = !f.active;
        }
        return f;
      });
      return newFilterGroup;
    });
    setFilters(newFilters);
  };

  useEffect(() => {
    if (!selectedRegion) return;

    switch (selectedRegionOption) {
      case REGION_OPTIONS.PROTECTED_AREAS:
        setRegionLabel(t('Protected Areas'));
        break;
      case REGION_OPTIONS.PROVINCES:
        setRegionLabel(t('Provinces'));
        break;
      case REGION_OPTIONS.FORESTS:
        setRegionLabel(t('Forest Titles'));
        break;
      default:
        break;
    }

    removeRegionLayers();
    displayLayer(selectedRegionOption);
  }, [selectedRegionOption, selectedRegion]);

  return (
    <section
      className={cx(
        lightMode ? filterStyles.light : '',
        filterStyles.container
      )}
    >
      <div className={styles.wrapper}>
        {selectedRegionOption && !exploreAllSpecies && (
          <div className={filterStyles.selectedRegion}>
            <div className={filterStyles.regionInfo}>
              <h2>{regionName}</h2>
              <span>{regionLabel}</span>
            </div>
            <Button
              className={styles.back}
              handleClick={handleBack}
              label={t('Clear region selected')}
            />
          </div>
        )}
        <div className={styles.filters}>
          <FilterContainer
            filters={filters}
            setFilters={setFilters}
            isLoading={speciesListLoading}
            updateActiveFilter={updateActiveFilter}
            {...props}
          />
          <SpeciesListContainer isLoading={speciesListLoading} {...props} />
        </div>
      </div>
    </section>
  );
}

export default SpeciesFilterComponent;
