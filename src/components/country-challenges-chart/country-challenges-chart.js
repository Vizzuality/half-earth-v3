import React from 'react';
import { connect } from 'react-redux';
import Component from './country-challenges-chart-component';
import metadataConfig from 'constants/metadata';
import { CHALLENGES_CHART } from 'constants/metadata';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';

import mapStateToProps from './country-challenges-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';

const actions = {...metadataActions, ...urlActions };


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

  const handleInfoClick = () => {
    const { setModalMetadata } = props;
    const md = metadataConfig[CHALLENGES_CHART]
    setModalMetadata({
      slug: md.slug,
      title: md.title,
      isOpen: true
    });
  }

  return (
  <Component
    handleInfoClick={handleInfoClick}
    handleBubbleClick={handleBubbleClick}
    handleSelectNextIndicator={handleSelectNextIndicator}
    handleSelectPreviousIndicator={handleSelectPreviousIndicator}
    {...props}
  />
  )
}


export default connect(mapStateToProps, actions)(CountryChallengesChartContainer);
