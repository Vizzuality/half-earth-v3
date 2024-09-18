import React, { useContext, useEffect, useState } from 'react';
import { useT } from '@transifex/react';
import cx from 'classnames';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import BioDiversityContainer from './biodiversity-indicators';
import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import RegionsAnalysisComponent from './regions-analysis/regions-analysis-component';
import { LightModeContext } from '../../../context/light-mode';
import FilterContainer from '../../../components/filters';
import SpeciesListContainer from '../../../components/speciesList';
import DashboardNav from '../../../components/dashboard-nav';
import { NAVIGATION } from '../../../components/dashboard-nav/dashboard-nav-component';
import DashboardHomeContainer from './dashboard-home';
import DashboardTrendsSidebarContainer from 'containers/sidebars/dashboard-trends-sidebar';

function DashboardSidebar(props) {
  const t = useT();
  const {
    data,
    countryName,
    taxaList,
    filteredTaxaList,
    setFilteredTaxaList,
    selectedTaxa,
    selectedIndex,
    setSelectedIndex,
    setSelectedTaxa } = props;

  const filterStart = [
    {
      name: 'dataset',
      title: 'Expected Sources',
      filters: [
        {
          name: 'Expert Range Map',
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
      title: 'Recorded Sources',
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
          name: 'Local Inventory',
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
      title: 'IUCN Status',
      filters: [
        {
          name: 'Critically Endangered',
          active: false,
          test: species => species.traits?.threat_status_code === 'CR',
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: 'Endangered',
          result: false,
          active: false,
          test: species => species.traits?.threat_status_code === 'EN',
          count: 0,
          type: 'or',
        },
        {
          name: 'Vulnerable',
          active: false,
          test: species => species.traits?.threat_status_code === 'VU',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Least Concern',
          active: false,
          test: species => species.traits?.threat_status_code === 'LC',
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: 'Unknown',
          active: false,
          result: false,
          test: species => species.traits?.threat_status_code === undefined,
          count: 0,
          type: 'or',
        },
      ],
    },
  ];

  const [filters, setFilters] = useState(filterStart);

  const [filter, setFilter] = useState();
  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className={cx(lightMode ? styles.light : '', selectedIndex === NAVIGATION.TRENDS ? styles.trends : '', styles.container)}>
      <button type="button" className={styles.darkMode} title={lightMode ? t('Switch to Dark mode') : t('Switch to Light mode')} onClick={() => toggleLightMode()}>
        {!lightMode && <LightModeIcon className={styles.icon} />}
        {lightMode && <DarkModeIcon className={styles.icon} />}
      </button>
      <h1>{countryName}</h1>

      <div className={styles.regionFilter}>
        <DashboardNav selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} {...props} />
        {selectedIndex === NAVIGATION.HOME && <DashboardHomeContainer {...props} />}
        {selectedIndex === NAVIGATION.REGION &&
          <div className={styles.filters}>
            <FilterContainer
              taxaList={taxaList}
              selectedTaxa={selectedTaxa}
              setFilteredTaxaList={setFilteredTaxaList}
              setSelectedTaxa={setSelectedTaxa}
              filters={filters}
              setFilters={setFilters}
              {...props} />
            <SpeciesListContainer
              selectedTaxa={selectedTaxa}
              filteredTaxaList={filteredTaxaList}
              setFilteredTaxaList={setFilteredTaxaList}
              taxaList={taxaList}
              setSelectedTaxa={setSelectedTaxa}
              filter={filter}
              setFilter={setFilter}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              {...props} />
          </div>
        }
        {selectedIndex === NAVIGATION.SPECIES || selectedIndex === NAVIGATION.DATA_LAYER && <DataLayerContainer {...props} />}
        {selectedIndex === NAVIGATION.BIO_IND && <BioDiversityContainer {...props} />}
        {selectedIndex === NAVIGATION.REGION_ANALYSIS && <RegionsAnalysisComponent {...props} />}
        {selectedIndex === NAVIGATION.TRENDS && <DashboardTrendsSidebarContainer
          {...props}
        />}
      </div>
    </div>
  );
}

export default DashboardSidebar;
