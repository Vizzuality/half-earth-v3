import React from 'react';
import { connect } from 'react-redux';
import Component from './country-challenges-chart-component';

import mapStateToProps from './country-challenges-chart-selectors';
import { NATIONAL_REPORT_CARD } from 'router'

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';

import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';

const actions = {...metadataActions, ...urlActions };


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

  const handleBubbleClick = ({ countryISO }) => {
    const { browsePage } = props;
    browsePage({type: NATIONAL_REPORT_CARD, payload: { iso: countryISO, view:  LOCAL_SCENE_TABS_SLUGS.CHALLENGES }});
  }

  const handleFilterSelection = (selectedFilter) => {
    const { changeUI } = props;
    changeUI({countryChallengesSelectedFilter: selectedFilter.slug});
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
