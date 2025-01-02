import React, { useState } from 'react';

import { useT } from '@transifex/react';

import Button from 'components/button';
import FilterContainer from 'components/filters';
import SpeciesListContainer from 'components/species-list';

import { NAVIGATION } from 'constants/dashboard-constants.js';

import styles from '../dashboard-sidebar-styles.module.scss';

function SpeciesFilterComponent(props) {
  const t = useT();
  const {
    selectedRegionOption,
    setSelectedRegionOption,
    setSelectedIndex,
    setSelectedTaxa,
    speciesListLoading,
  } = props;

  const filterStart = [
    {
      name: 'dataset',
      title: 'Expected Sources',
      filters: [
        {
          name: 'Refined Range Map',
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
      title: 'Recorded Sources',
      filters: [
        {
          name: 'Occurrence',
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
      title: 'IUCN Status',
      filters: [
        {
          name: 'Critically Endangered',
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'CRITICALLY ENDANGERED',
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: 'Endangered',
          result: false,
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'ENDANGERED',
          count: 0,
          type: 'or',
        },
        {
          name: 'Vulnerable',
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'VULNERABLE',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Least Concern',
          active: false,
          test: (species) =>
            species.threat_status.toUpperCase() === 'LEAST CONCERN',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Unknown',
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

  const handleBack = () => {
    setSelectedTaxa(null);
    setSelectedRegionOption(null);
    setSelectedIndex(NAVIGATION.REGION);
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

  return (
    <div className={styles.wrapper}>
      {selectedRegionOption && (
        <Button
          className={styles.back}
          handleClick={handleBack}
          label={t('Clear region selected')}
        />
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
  );
}

export default SpeciesFilterComponent;
