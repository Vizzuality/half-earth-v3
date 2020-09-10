import React, { useEffect, useState } from 'react';
import usePrevious from 'hooks/use-previous';
import { useFeatureLayer } from 'hooks/esri';
import { SPECIES_LIST } from 'constants/layers-slugs';
import { SORT } from 'components/header-item';
import sortBy from 'lodash/sortBy';
import Component from './species-modal-component';
import { connect } from 'react-redux';
import {
  getCountryData,
  getSearchTerm,
  getSpeciesModalSort
} from './species-modal-selectors';
import * as urlActions from 'actions/url-actions';

const actions = { ...urlActions };

const mapStateToProps = (state) => ({
  countryData: getCountryData(state),
  speciesModalSort: getSpeciesModalSort(state),
  searchTerm: getSearchTerm(state)
});

const SpeciesModalContainer = (props) => {
  const { changeUI, countryData, searchTerm, speciesModalSort } = props;
  const layer = useFeatureLayer({ layerSlug: SPECIES_LIST });

  const [speciesList, setSpeciesList] = useState(null);
  const [filteredSpeciesList, setFilteredSpeciesList] = useState(null);

  useEffect(() => {
    if (layer && countryData.iso && !speciesList) {
      const getFeatures = async () => {
        const query = await layer.createQuery();
        query.where = `iso3 = '${countryData.iso}'`;
        query.maxRecordCountFactor = '5000';
        const results = await layer.queryFeatures(query);
        const { features } = results;
        if (features) {
          setSpeciesList(features.map((f) => f.attributes));
        }
      };

      getFeatures(countryData.iso);
    }
  }, [layer, countryData.iso]);

  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    if (!searchTerm && speciesList && !filteredSpeciesList) {
      setFilteredSpeciesList(speciesList);
    }
    if (previousSearch !== searchTerm && speciesList) {
      if (!searchTerm) {
        setFilteredSpeciesList(speciesList);
      } else {
        const speciesFilteredBySearch = speciesList.filter((c) =>
          Object.values(c).some(
            (v) =>
              v && String(v).toLowerCase().startsWith(searchTerm.toLowerCase())
          )
        );
        setFilteredSpeciesList(speciesFilteredBySearch);
      }
    }
  }, [searchTerm, previousSearch, speciesList]);

  const previousSort = usePrevious(speciesModalSort);

  useEffect(() => {
    if (
      filteredSpeciesList &&
      filteredSpeciesList.length &&
      previousSort !== speciesModalSort
    ) {
      const sortedCategory =
      speciesModalSort && speciesModalSort.split('-')[0].toLowerCase();
      const direction = speciesModalSort && speciesModalSort.split('-')[1];
      const sortedData = sortBy(filteredSpeciesList, (d) => d[sortedCategory]);
      setFilteredSpeciesList(
        direction === SORT.ASC ? sortedData.reverse() : sortedData
      );
    }
  }, [speciesModalSort, filteredSpeciesList]);

  const handleSearch = (event) => {
    const { value } = event.target;
    changeUI({ speciesModalSearch: value });
  };

  const handleSortClick = (category) => {
    const sortedCategory =
      speciesModalSort && speciesModalSort.split('-')[0];
    const direction = speciesModalSort && speciesModalSort.split('-')[1];
    let sortDirection =
      sortedCategory === category && direction === SORT.ASC
        ? SORT.DESC
        : SORT.ASC;
    changeUI({ speciesModalSort: `${category}-${sortDirection}` });
  };


  return (
    <Component
      {...props}
      handleSortClick={handleSortClick}
      handleSearchChange={handleSearch}
      speciesList={filteredSpeciesList}
      sortCategory={speciesModalSort}
    />
  );
}

export default connect(mapStateToProps, actions)(SpeciesModalContainer);