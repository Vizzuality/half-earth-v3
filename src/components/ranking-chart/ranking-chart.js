import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { NATIONAL_REPORT_CARD } from 'router';

import * as urlActions from 'actions/url-actions';

import useDebounce from 'hooks/use-debounce';

import Component from './ranking-chart-component';
import mapStateToProps from './ranking-chart-selectors';

const actions = { ...metadataActions, ...urlActions };

function RankingChartContainer(props) {
  const { data, selectedLandMarineOption } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [scrollIndex, setScrollIndex] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 30);

  useEffect(() => {
    const { countryISO, data: _data } = props;
    const newIndex = _data.findIndex((d) => d.iso === countryISO);
    setScrollIndex(newIndex);
  }, []);

  useEffect(() => {
    if (data && searchTerm) {
      const newIndex = data.findIndex((d) =>
        d.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setScrollIndex(newIndex);
    }
    return undefined;
  }, [debouncedSearchTerm]);

  // const handleFilterSelection = (selectedFilter) => {
  // const { changeUI } = props;
  //   changeUI({ sortRankingCategory: selectedFilter });
  // };

  const handleCountryClick = (countryISO) => {
    const { browsePage, changeUI } = props;
    browsePage({
      type: NATIONAL_REPORT_CARD,
      payload: {
        iso: countryISO,
      },
    });
    changeUI({
      landMarineSelection: selectedLandMarineOption.slug,
    });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <Component
      handleCountryClick={handleCountryClick}
      handleSearchChange={handleSearchChange}
      // handleFilterSelection={handleFilterSelection}
      scrollIndex={scrollIndex}
      searchTerm={searchTerm}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(RankingChartContainer);
