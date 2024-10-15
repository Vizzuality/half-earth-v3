import { useEffect, useState } from 'react';
import styles from '../dashboard-sidebar-styles.module.scss';
import { Loading } from 'he-components';
import FilterContainer from '../../../../components/filters';
import SpeciesListContainer from '../../../../components/species-list';

function SpeciesFilterComponent(props) {
  const { taxaList } = props;
  const filterStart = [
    {
      name: 'dataset',
      title: 'Sources prévues',
      filters: [
        {
          name: 'Carte de répartition des experts',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('range') > -1,
          count: 0,
          type: 'and',
          result: false,
        },
      ],
    },
    {
      name: 'dataset',
      title: 'Sources enregistrées',
      filters: [
        {
          name: 'Occurrence',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('points') > -1,
          count: 0,
          result: false,
          type: 'and',
        },
        {
          name: 'Inventaire local',
          active: false,
          test: species => species.datasetList.map(d => d.product_type).indexOf('localinv') >
            -1,
          result: false,
          count: 0,
          type: 'and',
        },
      ],
    },
    {
      name: 'threat',
      title: 'IUCN Statut',
      filters: [
        {
          name: 'En danger critique d\'extinction',
          active: false,
          test: species => species.traits?.threat_status_code === 'CR',
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: 'En danger',
          result: false,
          active: false,
          test: species => species.traits?.threat_status_code === 'EN',
          count: 0,
          type: 'or',
        },
        {
          name: 'Vulnérable',
          active: false,
          test: species => species.traits?.threat_status_code === 'VU',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Préoccupation mineure',
          active: false,
          test: species => species.traits?.threat_status_code === 'LC',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Inconnu',
          active: false,
          result: false,
          test: species => species.traits?.threat_status_code === undefined,
          count: 0,
          type: 'or',
        },
      ],
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(filterStart);

  useEffect(() => {
    if (!taxaList.length) return;
    setIsLoading(false);
  }, [taxaList]);

  return (
    <div className={styles.filters}>
      {isLoading && <Loading height={200} />}
      {!isLoading && <>
        <FilterContainer
          filters={filters}
          setFilters={setFilters}
          {...props} />
        <SpeciesListContainer {...props} />
      </>
      }
    </div>
  )
}

export default SpeciesFilterComponent;
