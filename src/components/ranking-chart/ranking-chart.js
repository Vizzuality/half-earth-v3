import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './ranking-chart-component';
import mapStateToProps from './ranking-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = {...metadataActions, ...urlActions, openInfoModalAnalyticsEvent };

const RankingChartContainer = (props) => {
  const { data } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [scrollIndex, setScrollIndex] = useState();

  useEffect(() => {
    if (data && searchTerm) {
      const newIndex = data.findIndex(d => d.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setScrollIndex(newIndex);
    }
    return undefined;
  }, [searchTerm])

  const handleFilterSelection = (selectedFilter) => {
    const { changeUI } = props;
    changeUI({ sortRankingCategory: selectedFilter })
  }

  const handleCountryClick = (countryISO, countryName) => {
    const { changeGlobe } = props;
    changeGlobe({ countryISO, countryName, zoom: null, center: null });
  };

    const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  return (
  <Component
    handleCountryClick={handleCountryClick}
    handleSearchChange={handleSearchChange}
    handleFilterSelection={handleFilterSelection}
    scrollIndex={scrollIndex}
    searchTerm={searchTerm}
    {...props}
  />
  )
}

export default connect(mapStateToProps, actions)(RankingChartContainer);