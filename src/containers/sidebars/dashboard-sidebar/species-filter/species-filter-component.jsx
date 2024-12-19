import React, { useEffect, useState } from 'react';

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
          test: (species) =>
            species.datasetList.map((d) => d.product_type).indexOf('range') >
            -1,
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
          test: (species) =>
            species.datasetList.map((d) => d.product_type).indexOf('points') >
            -1,
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
          test: (species) => species.traits?.threat_status_code === 'CR',
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: 'Endangered',
          result: false,
          active: false,
          test: (species) => species.traits?.threat_status_code === 'EN',
          count: 0,
          type: 'or',
        },
        {
          name: 'Vulnerable',
          active: false,
          test: (species) => species.traits?.threat_status_code === 'VU',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Least Concern',
          active: false,
          test: (species) => species.traits?.threat_status_code === 'LC',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Unknown',
          active: false,
          result: false,
          test: (species) => species.traits?.threat_status_code === undefined,
          count: 0,
          type: 'or',
        },
      ],
    },
  ];

  // const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(filterStart);

  const handleBack = () => {
    setSelectedTaxa(null);
    setSelectedRegionOption(null);
    setSelectedIndex(NAVIGATION.REGION);
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
          {...props}
        />
        <SpeciesListContainer isLoading={speciesListLoading} {...props} />
      </div>
    </div>
  );
}

export default SpeciesFilterComponent;
