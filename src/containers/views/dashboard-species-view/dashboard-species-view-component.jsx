import React, { useState } from 'react';
import { DASHBOARD_REGIONS } from 'router';
import styles from './dashboard-species-view-styles.module.scss';
import Button from 'components/button';
import SearchInput from 'components/search-input';

function DashboardSpeciesViewComponent(props) {
  const {
    countryISO,
    countryName,
    browsePage
  } = props;

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (event) => {
    setSearchInput(event.currentTarget.value)
  }

  return (
    <section className={styles.container}>
      <h1>The Species of {countryName}</h1>
      <p>Explore species spatial data, view conservation status, and analyze regions where a species occurs</p>
      <div className={styles.explore}>
        <SearchInput className={styles.search} placeholder="Search for a species by name" onChange={handleSearch} value={searchInput} />
        <Button type="rectangular"
          label="Explore all Species"
          handleClick={() => browsePage({
            type: DASHBOARD_REGIONS,
            payload: { iso: countryISO.toLowerCase() }
          })} />
      </div>
      <div className={styles.navigation}>
        <div className={styles.navCard} onClick={() => browsePage({
          type: DASHBOARD_REGIONS,
          payload: { iso: countryISO.toLowerCase(), scientificname: 'Cossypha polioptera' }
        })} >
          <div className={styles.outline}></div>
          <label>Grey Winged Robin Chat</label>
          <p>
            Cossypha polioptera
          </p>
        </div>
        <div className={styles.navCard} onClick={() => browsePage({
          type: DASHBOARD_REGIONS,
          payload: { iso: countryISO.toLowerCase(), scientificname: 'Piliocolobus parmentieri' }
        })} >
          <div className={styles.outline}></div>
          <label>Piliocolobus parmentieri</label>
          <p>
            Piliocolobus parmentieri
          </p>
        </div>
        <div className={styles.navCard} onClick={() => browsePage({
          type: DASHBOARD_REGIONS,
          payload: { iso: countryISO.toLowerCase(), scientificname: 'Dasypeltis palmarum' }
        })} >
          <div className={styles.outline}></div>
          <label>Palm Egg Eater</label>
          <p>
            Dasypeltis palmarum
          </p>
        </div>
        <div className={styles.navCard} onClick={() => browsePage({
          type: DASHBOARD_REGIONS,
          payload: { iso: countryISO.toLowerCase(), scientificname: 'Ptychadena bunoderma' }
        })} >
          <div className={styles.outline}></div>
          <label>Caconda Grassland Frog</label>
          <p>
            Ptychadena bunoderma
          </p>
        </div>
      </div>
    </section>
  );
}

export default DashboardSpeciesViewComponent;
