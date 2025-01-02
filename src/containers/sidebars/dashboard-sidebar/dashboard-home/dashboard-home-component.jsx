import React, { useContext, useEffect, useState } from 'react';

import { useLocale, useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';
import SearchInput from 'components/search-input';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './dashboard-home-styles.module.scss';

function DashboardHomeComponent(props) {
  const t = useT();
  const locale = useLocale();
  const { setSelectedIndex, setScientificName, prioritySpeciesList } = props;

  const { lightMode } = useContext(LightModeContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchURL = 'https://dev-api.mol.org/2.x/species/groupsearch';
  // 'https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/spatial/regions/spatial_species_search';

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
      query: searchInput,
      limit: 100,
      page: 0,
      lang: locale || 'en',
      // region_id: '1eff8980-479e-4eac-b386-b4db859b275d',
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

    return () => clearTimeout(handler);
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
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSearchSelect(item)}
                  >
                    <b>{item.scientificname}</b> -{' '}
                    <span>{item.vernacular}</span>
                  </button>
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
        {prioritySpeciesList.length > 0 && (
          <div className={styles.mostPopular}>
            <span className={styles.sectionTitle}>{t('Popular Species')}</span>
            <div className={styles.species}>
              {prioritySpeciesList.map((species) => (
                <button
                  type="button"
                  className={cx(styles.navCard, styles.first)}
                  onClick={() => selectSpecies(species.species_name)}
                >
                  <div className={styles.outline} />
                  <span>Rufous Mouse Eared Bat</span>
                  <p>{species.species_name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <PartnersContainer /> */}
    </div>
  );
}

export default DashboardHomeComponent;
