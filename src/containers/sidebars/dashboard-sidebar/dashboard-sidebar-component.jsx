import React, { useContext, useEffect, useState } from 'react';
import { DASHBOARD } from 'router';
import cx from 'classnames';

import AnalyticsIcon from 'icons/analytics.svg?react';
import StacksIcon from 'icons/stacks.svg?react';
import TimeLineIcon from 'icons/timeline.svg?react';
import SunIcon from 'icons/sun-regular.svg?react';
import MoonIcon from 'icons/moon-regular.svg?react';
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
        {!lightMode && <SunIcon className={styles.icon} />}
        {lightMode && <MoonIcon className={styles.icon} />}
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
            {...props} />
          <SpeciesListContainer
            selectedTaxa={selectedTaxa}
            filteredTaxaList={filteredTaxaList}
            setSelectedTaxa={setSelectedTaxa}
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
