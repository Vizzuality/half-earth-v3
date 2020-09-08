import React from 'react';
import { connect } from 'react-redux';
import Component from './ranking-chart-component';
import metadataConfig from 'constants/metadata';
import { RANKING_CHART } from 'constants/metadata';
import { SORT } from 'components/header-item';

import mapStateToProps from './ranking-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';

const actions = {...metadataActions, ...urlActions };

const RankingChartContainer = (props) => {
  const handleInfoClick = () => {
    const { setModalMetadata } = props;
    const md = metadataConfig[RANKING_CHART];
    setModalMetadata({
      slug: md.slug,
      title: md.title,
      isOpen: true
    });
  }

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

  return (
  <Component
    handleSortClick={handleSortClick}
    handleInfoClick={handleInfoClick}
    handleCountryClick={handleCountryClick}
    {...props}
  />
  )
}

export default connect(mapStateToProps, actions)(RankingChartContainer);