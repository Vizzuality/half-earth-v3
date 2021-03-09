import React from 'react';
import { connect } from 'react-redux';
import Component from './ranking-chart-component';

import mapStateToProps from './ranking-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = {...metadataActions, ...urlActions, openInfoModalAnalyticsEvent };

const RankingChartContainer = (props) => {
  const handleFilterSelection = (selectedFilter) => {
    const { changeUI } = props;
    changeUI({ sortRankingCategory: selectedFilter })
  }

  const handleCountryClick = (countryISO, countryName) => {
    const { changeGlobe } = props;
    changeGlobe({ countryISO, countryName, zoom: null, center: null });
  };

  const handleSearchChange = (event) => {
    const { changeUI } = props;
    const { value } = event.target;
    changeUI({ rankingSearch: value });
  };

  return (
  <Component
    handleCountryClick={handleCountryClick}
    handleSearchChange={handleSearchChange}
    handleFilterSelection={handleFilterSelection}
    {...props}
  />
  )
}

export default connect(mapStateToProps, actions)(RankingChartContainer);