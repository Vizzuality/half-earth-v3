import React, { useEffect, useState } from 'react';
import usePrevious from 'hooks/use-previous';
import { useFeatureLayer } from 'hooks/esri';
import { SPECIES_LIST } from 'constants/layers-slugs';
import { SORT } from 'components/header-item';
import Component from './species-modal-component';
import { connect } from 'react-redux';
import {
  getCountryData,
  getSearchTerm,
  getSpeciesModalSort,
  getSortedSpeciesList
} from './species-modal-selectors';
import * as urlActions from 'actions/url-actions';

const actions = { ...urlActions };

const mapStateToProps = (state) => ({
  countryData: getCountryData(state),
  speciesModalSort: getSpeciesModalSort(state),
  searchTerm: getSearchTerm(state),
  state
});

const SpeciesModalContainer = (props) => {
  const { changeUI, countryData, speciesModalSort, state } = props;
  const layer = useFeatureLayer({ layerSlug: SPECIES_LIST });

  const [speciesList, setSpeciesList] = useState(null);

  const previousCountryData = usePrevious(countryData);
  useEffect(() => {
    if (layer && countryData.iso && (!speciesList || (countryData.iso !== previousCountryData.iso))) {
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

  const handleSearch = (event) => {
    const { value } = event.target;
    changeUI({ speciesModalSearch: value });
  };

  const handleSortClick = (category) => {
    const sortedCategory =
      speciesModalSort && speciesModalSort.split('-')[0];
    const direction = speciesModalSort && speciesModalSort.split('-')[1];
    let sortDirection =
      sortedCategory === category && direction === SORT.DESC
        ? SORT.ASC
        : SORT.DESC;
    changeUI({ speciesModalSort: `${category}-${sortDirection}` });
  };

  return (
    <Component
      {...props}
      handleSortClick={handleSortClick}
      handleSearchChange={handleSearch}
      speciesList={getSortedSpeciesList({ ...state, speciesList })}
      sortCategory={speciesModalSort}
    />
  );
}

export default connect(mapStateToProps, actions)(SpeciesModalContainer);