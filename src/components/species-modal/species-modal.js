import React, { useEffect, useState } from 'react';
import usePrevious from 'hooks/use-previous';
import { useFeatureLayer } from 'hooks/esri';
import { SPECIES_LIST } from 'constants/layers-slugs';
import Component from './species-modal-component';
import { connect } from 'react-redux';
import { getCountryData, getSearchTerm } from './species-modal-selectors';
import * as urlActions from 'actions/url-actions';

const actions = { ...urlActions };

const mapStateToProps = (state) => ({
  countryData: getCountryData(state),
  searchTerm: getSearchTerm(state)
});

const SpeciesModalContainer = (props) => {
  const { changeUI, countryData, searchTerm } = props;

  const handleSearch = (event) => {
    const { value } = event.target;
    changeUI({ speciesModalSearch: value })
  }
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
              v && String(v).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setFilteredSpeciesList(speciesFilteredBySearch);
      }
    }
  }, [searchTerm, previousSearch, speciesList]);

  return (
    <Component
      {...props}
      handleSearchChange={handleSearch}
      speciesList={filteredSpeciesList}
    />
  );
}

export default connect(mapStateToProps, actions)(SpeciesModalContainer);