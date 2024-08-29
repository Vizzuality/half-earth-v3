import React, { useState } from 'react';
import { DASHBOARD_SPECIES_NAME } from 'router';
import { LightModeProvider } from '../../../context/light-mode';
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
    <LightModeProvider>
      <section className={styles.container}>
        <h1>The Species of {countryName}</h1>
        <p>Explore species spatial data, view conservation status, and analyze regions where a species occurs</p>
        <div className={styles.explore}>
          <SearchInput className={styles.search} placeholder="Search for a species by name" onChange={handleSearch} value={searchInput} />
          <Button type="rectangular"
            label="Explore all Species"
            handleClick={() => browsePage({
              type: DASHBOARD_SPECIES_NAME,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Cossypha polioptera' }
            })} />
        </div>
        <div className={styles.navigation}>
          <Button
            type="rectangular"
            label="Grey Winged Robin Chat"
            handleClick={() => browsePage({
              type: DASHBOARD_SPECIES_NAME,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Cossypha polioptera' }
            })}
          />
          <Button
            type="rectangular"
            label="Piliocolobus parmentieri"
            handleClick={() => browsePage({
              type: DASHBOARD_SPECIES_NAME,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Piliocolobus parmentieri' }
            })}
          />
          <Button
            type="rectangular"
            label="Palm Egg Eater"
            handleClick={() => browsePage({
              type: DASHBOARD_SPECIES_NAME,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Dasypeltis palmarum' }
            })}
          />
          <Button
            type="rectangular"
            label="Caconda Grassland Frog"
            handleClick={() => browsePage({
              type: DASHBOARD_SPECIES_NAME,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Ptychadena bunoderma' }
            })}
          />
        </div>
      </section>

    </LightModeProvider>

  );
}

export default DashboardSpeciesViewComponent;
