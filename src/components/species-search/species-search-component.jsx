import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import Button from 'components/button';
import SearchInput from 'components/search-input';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import styles from './species-search-component-styles.module.scss';

function SpeciesSearchComponent(props) {
  const t = useT();
  const {
    setSelectedIndex,
    setScientificName,
    setSelectedRegionOption,
    setSelectedTaxa,
    setSelectedRegion,
    setExploreAllSpecies,
    allTaxa,
    setTaxaList,
  } = props;

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchText) => {
    setSearchInput(searchText.currentTarget.value);
  };

  const handleSearchSelect = (searchItem) => {
    setScientificName(searchItem.scientific_name);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, searchItem.scientific_name);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
  };

  const handleExploreAllSpecies = () => {
    setSelectedRegion(null);
    setSelectedRegionOption(null);
    setSelectedTaxa(null);

    if (!allTaxa.length) {
      setExploreAllSpecies(true);
    } else {
      setTaxaList(allTaxa);
    }
    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
  };

  const getSearchResults = async () => {
    const results = [];
    allTaxa.forEach((taxa) => {
      const match = taxa.species.filter((item) => {
        return (
          item.scientific_name
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          (item.common_name &&
            item.common_name.toLowerCase().includes(searchInput.toLowerCase()))
        );
      });
      results.push(...match);
    });

    setSearchResults(results);
  };

  useEffect(() => {
    if (!searchInput) return;

    getSearchResults();
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
              item.scientific_name && (
                <li key={`${item.scientific_name} - ${item.common_name}`}>
                  <button
                    type="button"
                    onClick={() => handleSearchSelect(item)}
                  >
                    <b>{item.scientific_name}</b> -{' '}
                    <span>{item.common_name}</span>
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
