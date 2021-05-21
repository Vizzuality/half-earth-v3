import React from 'react';
import { connect } from 'react-redux';
import Component from './country-challenges-chart-component';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

import mapStateToProps from './country-challenges-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';

const actions = {...metadataActions, ...urlActions, openInfoModalAnalyticsEvent };


const CountryChallengesChartContainer = (props) => {

  const handleSelectNextIndicator = () => {
    const { changeUI, countryChallengesSelectedKey, xAxisKeys } = props;
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex !== xAxisKeys.length - 1) {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex + 1] });
    } else {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[0] });
    }
  }

  const handleSelectPreviousIndicator = () => {
    const { changeUI, countryChallengesSelectedKey, xAxisKeys } = props;
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex > 0) {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex - 1] });
    } else {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[xAxisKeys.length - 1] });
    }
  }

  const handleBubbleClick = ({ countryISO, countryName }) => {
    const { changeGlobe } = props;
    changeGlobe({countryISO, countryName, zoom: null, center: null})
  }

  const handleFilterSelection = (selectedFilter) => {
    const { changeUI } = props;
    changeUI({countryChallengesSelectedFilter: selectedFilter});
  }

  return (
  <Component
    handleBubbleClick={handleBubbleClick}
    handleFilterSelection={handleFilterSelection}
    handleSelectNextIndicator={handleSelectNextIndicator}
    handleSelectPreviousIndicator={handleSelectPreviousIndicator}
    {...props}
  />
  )
}


export default connect(mapStateToProps, actions)(CountryChallengesChartContainer);
