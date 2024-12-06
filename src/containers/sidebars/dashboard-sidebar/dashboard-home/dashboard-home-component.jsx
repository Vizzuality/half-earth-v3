import React, { useContext, useEffect, useState } from 'react';

import { useLocale, useT } from '@transifex/react';

import cx from 'classnames';

import Button from 'components/button';
import SearchInput from 'components/search-input';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import PartnersContainer from '../../../../components/partners';
import { LightModeContext } from '../../../../context/light-mode';
import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from '../../../../utils/dashboard-utils';

import styles from './dashboard-home-styles.module.scss';

function DashboardHomeComponent(props) {
  const t = useT();
  const locale = useLocale();
  const { countryISO, setSelectedIndex, setScientificName } = props;

  const { lightMode } = useContext(LightModeContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchURL =
    'https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/spatial/regions/spatial_species_search';

  const handleSearch = (searchText) => {
    setSearchInput(searchText.currentTarget.value);
  };

  const handleSearchSelect = (searchItem) => {
    setScientificName(searchItem.scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, searchItem.scientificname);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
  };

  const handleExploreAllSpecies = () => {
    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
  };

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
  };

  const selectSpecies = (scientificname) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

  useEffect(() => {
    if (!searchInput) return;
    const handler = setTimeout(() => {
      getSearchResults();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.content}>
        <span className={styles.sectionTitle}>
          {t('Biodiversity Dashboard')}
        </span>
        <hr className={hrTheme.dark} />
        <p>
          {t(
            'Explore species spatial data, view conservation status, and analyze regions where a species occurs'
          )}
        </p>
        <div className={styles.explore}>
          <SearchInput
            className={cx(
              styles.search,
              searchInput && searchResults.length > 0 ? styles.showResults : ''
            )}
            placeholder={t('Search for a species by name')}
            onChange={handleSearch}
            value={searchInput}
          />
          {searchInput && searchResults.length > 0 && (
            <ul className={styles.searchResults}>
              {searchResults.map((item, index) => (
                <li key={index} onClick={() => handleSearchSelect(item)}>
                  {item.scientificname}
                </li>
              ))}
            </ul>
          )}
          <Button
            type="rectangular"
            label={t('Explore all Species')}
            handleClick={handleExploreAllSpecies}
          />
        </div>
        <div className={styles.mostPopular}>
          <span className={styles.sectionTitle}>{t('Popular Species')}</span>
          <div className={styles.species}>
            <div
              className={cx(styles.navCard, styles.chat)}
              onClick={() => selectSpecies('Choeropsis liberiensis')}
            >
              <div className={styles.outline} />
              <label>Pygmy Hippopotamus</label>
              <p>Choeropsis liberiensis</p>
            </div>
            <div
              className={cx(styles.navCard, styles.pilio)}
              onClick={() => selectSpecies('Phaethornis rupurumii')}
            >
              <div className={styles.outline} />
              <label>Streak-Throated Hermit</label>
              <p>Phaethornis rupurumii</p>
            </div>
            <div
              className={cx(styles.navCard, styles.egg)}
              onClick={() => selectSpecies('Lophocebus aterrimus')}
            >
              <div className={styles.outline} />
              <label>Black Crested Mangabey</label>
              <p>Lophocebus aterrimus</p>
            </div>
            <div
              className={cx(styles.navCard, styles.frog)}
              onClick={() => selectSpecies('Trioceros johnstoni')}
            >
              <div className={styles.outline} />
              <label>Johnston's Chameleon</label>
              <p>Trioceros johnstoni</p>
            </div>
          </div>
        </div>
      </div>
      {/* <PartnersContainer /> */}
    </div>
  );
}

export default DashboardHomeComponent;
