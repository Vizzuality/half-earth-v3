import React from 'react';
import { connect } from 'react-redux';
import Component from './ranking-chart-component';
import { SORT } from 'components/header-item';

import mapStateToProps from './ranking-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = {...metadataActions, ...urlActions, openInfoModalAnalyticsEvent };

const RankingChartContainer = (props) => {
  const handleSortClick = (category) => {
    const { changeUI, sortRankingCategory } = props;
    const sortedCategory = sortRankingCategory && sortRankingCategory.split('-')[0];
    const direction = sortRankingCategory && sortRankingCategory.split('-')[1];
    let sortDirection = sortedCategory === category && direction === SORT.ASC ? SORT.DESC : SORT.ASC;
    changeUI({ sortRankingCategory: `${category}-${sortDirection}` })
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
    handleSortClick={handleSortClick}
    handleCountryClick={handleCountryClick}
    handleSearchChange={handleSearchChange}
    {...props}
  />
  )
}

export default connect(mapStateToProps, actions)(RankingChartContainer);