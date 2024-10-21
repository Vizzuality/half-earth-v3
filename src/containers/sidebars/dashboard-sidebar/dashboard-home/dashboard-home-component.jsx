import React, { useContext, useEffect, useState } from 'react'

import PartnersContainer from '../../../../components/partners';
import styles from './dashboard-home-styles.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
import cx from 'classnames';
import Button from 'components/button';
import SearchInput from 'components/search-input';
import { LightModeContext } from '../../../../context/light-mode';
import { useLocale, useT } from '@transifex/react';
import { NAVIGATION, SPECIES_SELECTED_COOKIE } from '../../../../utils/dashboard-utils';


function DashboardHomeComponent(props) {
  const t = useT();
  const locale = useLocale();
  const { countryISO, setSelectedIndex, setSpeciesName } = props;

  const { lightMode, } = useContext(LightModeContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchInput) return;
    const handler = setTimeout(() => {
      getSearchResults();
    }, 300);

    return () => {
      clearTimeout(handler);
    }
  }, [searchInput]);

  const searchURL = 'https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/spatial/regions/spatial_species_search';

  const handleSearch = (searchText) => {
    setSearchInput(searchText.currentTarget.value);
  }

  const handleSearchSelect = (searchItem) => {
    setSpeciesName(searchItem.scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, searchItem.scientificname);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
  }

  const handleExploreAllSpecies = () => {
    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
  }

  const getSearchResults = async () => {
    const searchParams = {
      region_id: '1eff8980-479e-4eac-b386-b4db859b275d',
      query: searchInput,
      limit: 10,
      page: 0,
      lang: locale || 'en',
    };
    const params = new URLSearchParams(searchParams);
    const searchSpecies = await fetch(`${searchURL}?${params}`);
    const results = await searchSpecies.json();
    setSearchResults(results);
  }

  const selectSpecies = (scientificname) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setSpeciesName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  }

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.content}>
        <span className={styles.sectionTitle}>{t('Biodiversity Dashboard')}</span>
        <hr className={hrTheme.dark} />
        <p>{t('Explore species spatial data, view conservation status, and analyze regions where a species occurs')}</p>
        <div className={styles.explore}>
          <SearchInput
            className={cx(styles.search, searchInput && searchResults.length > 0 ? styles.showResults : '')}
            placeholder={t('Search for a species by name')}
            onChange={handleSearch}
            value={searchInput} />
          {(searchInput && searchResults.length > 0) &&
            <ul className={styles.searchResults}>
              {searchResults.map((item, index) => (
                <li key={index} onClick={() => handleSearchSelect(item)}>{item.scientificname}</li>
              ))}
            </ul>
          }
          <Button type="rectangular"
            label={t('Explore all Species')}
            handleClick={handleExploreAllSpecies} />
        </div>
        <div className={styles.mostPopular}>
          <span className={styles.sectionTitle}>{t('Popular Species')}</span>
          <div className={styles.species}>
            <div className={cx(styles.navCard, styles.chat)} onClick={() => selectSpecies('Apalis personata')} >
              <div className={styles.outline}></div>
              <label>Black-Faced Apalis</label>
              <p>
                Apalis personata
              </p>
            </div>
            <div className={cx(styles.navCard, styles.pilio)} onClick={() => selectSpecies('Hyperolius cinnamomeoventris')} >
              <div className={styles.outline}></div>
              <label>Braganca Reed Frog</label>
              <p>
                Hyperolius cinnamomeoventris
              </p>
            </div>
            <div className={cx(styles.navCard, styles.egg)} onClick={() => selectSpecies('Lophocebus aterrimus')} >
              <div className={styles.outline}></div>
              <label>Black Crested Mangabey</label>
              <p>
                Lophocebus aterrimus
              </p>
            </div>
            <div className={cx(styles.navCard, styles.frog)} onClick={() => selectSpecies('Trioceros johnstoni')} >
              <div className={styles.outline}></div>
              <label>Johnston's Chameleon</label>
              <p>
                Trioceros johnstoni
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <PartnersContainer /> */}
    </div>
  )
}

export default DashboardHomeComponent
