import React from 'react';
import { connect } from 'react-redux';
import Component from './country-challenges-chart-component';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import * as actions from 'actions/url-actions';
import mapStateToProps from './country-challenges-chart-selectors';

const CountryChallengesChartContainer = (props) => {
  const xAxisKeys = Object.keys(INDICATOR_LABELS);

  const handleSelectNextIndicator = () => {
    const { changeUI, countryChallengesSelectedKey } = props;
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex !== xAxisKeys.length - 1) { 
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex + 1] });
    } else {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[0] });
    }
  }

  const handleSelectPreviousIndicator = () => {
    const { changeUI, countryChallengesSelectedKey } = props;
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

  const handleBubbleHover = (bubbleGeneralData) => {
    // TODO
    // display the tooltip
  }

  return (
  <Component
    handleBubbleClick={handleBubbleClick}
    handleSelectNextIndicator={handleSelectNextIndicator}
    handleSelectPreviousIndicator={handleSelectPreviousIndicator}
    {...props}
  />
  )
}


export default connect(mapStateToProps, actions)(CountryChallengesChartContainer);