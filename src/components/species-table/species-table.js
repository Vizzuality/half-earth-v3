import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import { useLocale } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { useFeatureLayer } from 'hooks/esri';

import { SORT } from 'components/header-item';

import { LAND_MARINE } from 'constants/country-mode-constants';
import { SPECIES_LIST, MARINE_SPECIES_LIST } from 'constants/layers-slugs';

import Component from './species-table-component';
import { getVertebrateTabs } from './species-table-constants';
import {
  getSearchTerm,
  getSpeciesModalSort,
  getSortedSpeciesList,
  getCountryData,
} from './species-table-selectors';

const actions = { ...urlActions };

const mapStateToProps = (state) => ({
  countryData: getCountryData(state),
  speciesModalSort: getSpeciesModalSort(state),
  searchTerm: getSearchTerm(state),
  state,
});

function SpeciesModalContainer(props) {
  const {
    changeUI,
    speciesModalSort,
    state,
    countryData,
    selectedLandMarineOption,
  } = props;
  const { marineSpeciesTotal } = countryData || {};
  const isLandSelected = selectedLandMarineOption.slug === LAND_MARINE.land;

  const locale = useLocale();
  const vertebrateTabs = useMemo(() => getVertebrateTabs(), [locale]);

  const [vertebrateType, setVertebrateType] = useState(
    isLandSelected ? vertebrateTabs[0].slug : vertebrateTabs[1].slug
  );
  const [loaded, setLoaded] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [speciesList, setSpeciesList] = useState([]);

  const landLayer = useFeatureLayer({ layerSlug: SPECIES_LIST });
  const marineLayer = useFeatureLayer({ layerSlug: MARINE_SPECIES_LIST });
  useEffect(() => {
    const layer = vertebrateType === LAND_MARINE.land ? landLayer : marineLayer;
    const isMarineAndEmpty =
      vertebrateType === LAND_MARINE.marine && marineSpeciesTotal === 0;
    if (!isMarineAndEmpty && layer && state.location.payload.iso) {
      const getFeatures = async () => {
        // Set empty species so we show the loading spinner
        setLoaded(false);
        setSpeciesList([]);
        const query = await layer.createQuery();
        query.where = `iso3 = '${state.location.payload.iso}'`;
        query.maxRecordCountFactor = '10000';
        const results = await layer.queryFeatures(query);
        const { features } = results;
        if (features) {
          setSpeciesList(features.map((f) => f.attributes));
          if (features.length) {
            setHasData(true);
            setLoaded(true);
          } else {
            setHasData(false);
          }
        } else {
          setHasData(false);
        }
      };

      getFeatures(state.location.payload.iso);
    }
  }, [landLayer, marineLayer, state.location.payload.iso, vertebrateType]);

  const handleSearch = (event) => {
    const { value } = event.target;
    changeUI({ speciesModalSearch: value });
  };

  const handleSortClick = (category) => {
    const sortedCategory = speciesModalSort && speciesModalSort.split('-')[0];
    const direction = speciesModalSort && speciesModalSort.split('-')[1];
    const sortDirection =
      sortedCategory === category && direction === SORT.DESC
        ? SORT.ASC
        : SORT.DESC;
    changeUI({ speciesModalSort: `${category}-${sortDirection}` });
  };

  const handleVertebrateChange = useCallback((tabSlug) => {
    setVertebrateType(tabSlug);
  }, []);

  return (
    <Component
      {...props}
      handleSortClick={handleSortClick}
      handleSearchChange={handleSearch}
      speciesList={getSortedSpeciesList({ ...state, speciesList })}
      sortCategory={speciesModalSort}
      handleVertebrateChange={handleVertebrateChange}
      vertebrateType={vertebrateType}
      loaded={loaded}
      hasData={hasData}
    />
  );
}

export default connect(mapStateToProps, actions)(SpeciesModalContainer);
