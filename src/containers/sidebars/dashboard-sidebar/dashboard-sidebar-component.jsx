import React, { useContext, useEffect, useState } from 'react';
import { DASHBOARD } from 'router';
import cx from 'classnames';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AnalyticsIcon from 'icons/analytics.svg?react';
import StacksIcon from 'icons/stacks.svg?react';
import TimeLineIcon from 'icons/timeline.svg?react';
import HomeIcon from 'icons/house-solid.svg?react';
import Button from 'components/button';

import BioDiversityContainer from './biodiversity-indicators';
import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import RegionsAnalysisComponent from './regions-analysis/regions-analysis-component';
import { LightModeContext } from '../../../context/light-mode';
import FilterContainer from '../../../components/filters';
import SpeciesListContainer from '../../../components/speciesList';

function DashboardSidebar(props) {
  const {
    data,
    browsePage,
    countryISO,
    countryName,
    scientificName,
    taxaList,
    filteredTaxaList,
    setFilteredTaxaList,
    selectedTaxa,
    setSelectedTaxa } = props;

  const tabs = {
    REGIONS: 'REGIONS',
    SPECIES: 'SPECIES'
  }

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
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [activeTrend, setActiveTrend] = useState(tabs.REGIONS);

  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (!scientificName) return;

    setActiveTrend(tabs.SPECIES);
  }, [scientificName])

  const handleActionChange = (event) => {
    setActiveTrend(event.currentTarget.innerText);
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <button type="button" className={styles.darkMode} title={lightMode ? 'Switch to Dark mode' : 'Switch to Light mode'} onClick={() => toggleLightMode()}>
        {!lightMode && <LightModeIcon className={styles.icon} />}
        {lightMode && <DarkModeIcon className={styles.icon} />}
      </button>
      <h1>{countryName}</h1>

      <div className={styles.btnGroup}>
        <Button
          type="rectangular"
          className={cx(styles.saveButton, {
            [styles.notActive]: activeTrend === tabs.SPECIES,
          })}
          label={tabs.REGIONS}
          handleClick={handleActionChange}
        />
        {scientificName &&
          <Button
            type="rectangular"
            className={cx(styles.saveButton, {
              [styles.notActive]: activeTrend === tabs.REGIONS,
            })}
            label={tabs.SPECIES}
            handleClick={handleActionChange}
          />}
      </div>

      {activeTrend === tabs.REGIONS &&
        <div className={styles.regionFilter}>
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
            {...props} />
        </div>
      }
      {activeTrend === tabs.SPECIES &&
        <section className={styles.sidenav}>
          <div className={styles.icons}>
            <button
              type="button"
              aria-label="Home"
              onClick={() => browsePage({
                type: DASHBOARD,
                payload: { iso: countryISO.toLowerCase() }
              })}
            >
              <HomeIcon className={styles.icon} />
            </button>
            <button
              type="button"
              aria-label="Data Analysis"
              className={cx({
                [styles.selected]: selectedIndex === 1,
              })}
              onClick={() => setSelectedIndex(1)}
            >
              <StacksIcon className={styles.icon} />
            </button>
            <button
              type="button"
              aria-label="Biodiversity Indicators"
              className={cx({
                [styles.selected]: selectedIndex === 2,
              })}
              onClick={() => setSelectedIndex(2)}
            >
              <TimeLineIcon className={styles.icon} />
            </button>
            <button
              type="button"
              aria-label="Regions Analysis"
              className={cx({
                [styles.selected]: selectedIndex === 3,
              })}
              onClick={() => setSelectedIndex(3)}
            >
              <AnalyticsIcon className={styles.icon} />
            </button>
          </div>
          {selectedIndex === 1 && (
            <>
              <DataLayerContainer {...props} />
            </>
          )}
          {selectedIndex === 2 && <BioDiversityContainer {...props} />}
          {selectedIndex === 3 && <RegionsAnalysisComponent {...props} />}
        </section>
      }
    </div>
  );
}

export default DashboardSidebar;
