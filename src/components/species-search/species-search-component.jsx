import React, { useEffect, useState } from 'react';

import { useLocale, useT } from '@transifex/react';

import cx from 'classnames';

import Button from 'components/button';
import SearchInput from 'components/search-input';

import EsriFeatureService from 'services/esri-feature-service';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import styles from './species-search-component-styles.module.scss';

function SpeciesSearchComponent(props) {
  const t = useT();
  const locale = useLocale();
  const {
    setSelectedIndex,
    setScientificName,
    setSelectedRegionOption,
    setSelectedTaxa,
    setSelectedRegion,
    setExploreAllSpecies,
    countryISO,
  } = props;

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  let searchURL =
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/COD_species_list_for_search/FeatureServer';

  if (countryISO === 'GUY') {
    searchURL =
      'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/species_list_for_search/FeatureServer';
  }

  let controller = null;

  const handleSearch = (searchText) => {
    setSearchInput(searchText.currentTarget.value);
  };

  const handleSearchSelect = (searchItem) => {
    setScientificName(searchItem.scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, searchItem.scientificname);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
  };

  const handleExploreAllSpecies = () => {
    setSelectedRegion(null);
    setSelectedRegionOption(null);
    setSelectedTaxa(null);
    setExploreAllSpecies(true);
    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
  };

  const getSearchResults = async () => {
    controller = new AbortController();
    const { signal } = controller;

    const commonName =
      locale === 'fr' ? 'commonname_french' : 'commonname_english';

    const searchSpecies = await EsriFeatureService.getFeatures({
      url: searchURL,
      whereClause: `scientificname like '%${searchInput}%' or ${commonName} like '%${searchInput}%'`,
      returnGeometry: false,
      signal,
    });

    // const searchSpecies = await fetch(`${searchURL}?${params}`, { signal });
    const results = searchSpecies.map((feature) => feature.attributes);
    setSearchResults(results);
  };

  useEffect(() => {
    if (!searchInput) return;

    if (controller) {
      controller.abort();
    }
    getSearchResults();

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [searchInput]);

  return (
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
          {searchResults.map(
            (item) =>
              item.scientificname && (
                <li key={item.scientificname}>
                  <button
                    type="button"
                    onClick={() => handleSearchSelect(item)}
                  >
                    <b>{item.scientificname}</b> -{' '}
                    <span>
                      {locale === 'fr'
                        ? item.commonname_french
                        : item.commonname_english}
                    </span>
                  </button>
                </li>
              )
          )}
        </ul>
      )}
      <Button
        type="rectangular"
        label={t('Explore all Species')}
        handleClick={handleExploreAllSpecies}
      />
    </div>
  );
}

export default SpeciesSearchComponent;
