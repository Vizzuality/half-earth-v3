import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { NATIONAL_REPORT_CARD } from 'router';

import * as urlActions from 'actions/url-actions';

import camelCase from 'lodash/camelCase';

import useDebounce from 'hooks/use-debounce';

import { SORT } from 'components/header-item';

import Component from './ranking-chart-component';
import mapStateToProps from './ranking-chart-selectors';

const actions = { ...metadataActions, ...urlActions };

function RankingChartContainer(props) {
  const {
    data,
    selectedLandMarineOption,
    categorySort,
    changeUI,
    fullRanking,
  } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [scrollIndex, setScrollIndex] = useState(0);
  const [urlSort, setUrlSort] = useState(null);
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

  const handleCountryClick = (countryISO) => {
    const { browsePage } = props;
    browsePage({
      type: NATIONAL_REPORT_CARD,
      payload: {
        iso: countryISO,
      },
    });
    changeUI({
      landMarineSelection: selectedLandMarineOption.slug,
      categorySort: urlSort,
      fullRanking,
    });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSortClick = (category) => {
    const parsedCategory = camelCase(category);
    const sortedCategory = categorySort && categorySort.split('-')[0];
    const direction = categorySort && categorySort.split('-')[1];
    const sortDirection =
      sortedCategory === parsedCategory && direction === SORT.DESC
        ? SORT.ASC
        : SORT.DESC;
    setUrlSort(`${parsedCategory}-${sortDirection}`);
    changeUI({ categorySort: `${parsedCategory}-${sortDirection}` });
  };
  return (
    <Component
      handleCountryClick={handleCountryClick}
      handleSearchChange={handleSearchChange}
      scrollIndex={scrollIndex}
      searchTerm={searchTerm}
      categorySort={categorySort}
      handleSortClick={handleSortClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(RankingChartContainer);
