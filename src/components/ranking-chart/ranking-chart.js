import React from 'react';
import { connect } from 'react-redux';
import Component from './ranking-chart-component';
import metadataConfig from 'constants/metadata';
import { RANKING_CHART } from 'constants/metadata';

import mapStateToProps from './ranking-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';

const actions = {...metadataActions, ...urlActions };

export const SORT = { ASC: 'ASC', DESC: 'DESC' };

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

  return (
  <Component
    handleSortClick={handleSortClick}
    handleInfoClick={handleInfoClick}
    {...props}
  />
  )
}

export default connect(mapStateToProps, actions)(RankingChartContainer);