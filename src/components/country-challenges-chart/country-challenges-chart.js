import React, { useState } from 'react';
import { connect } from 'react-redux';
import Component from './country-challenges-chart-component';
import metadataConfig from 'constants/metadata';
import { CHALLENGES_CHART } from 'constants/metadata';

import mapStateToProps from './country-challenges-chart-selectors';

import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';

const actions = {...metadataActions, ...urlActions };


const CountryChallengesChartContainer = (props) => {
  const [filtersOpen, setFiltersToggle] = useState(false);

  const handleSelectNextIndicator = () => {
    setFiltersToggle(false);
    const { changeUI, countryChallengesSelectedKey, xAxisKeys } = props;
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex !== xAxisKeys.length - 1) {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex + 1] });
    } else {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[0] });
    }
  }

  const handleSelectPreviousIndicator = () => {
    setFiltersToggle(false);
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
    setFiltersToggle(false);
  }

  const handleFilterSelection = (selectedFilter) => {
    const { changeUI } = props;
    changeUI({countryChallengesSelectedFilter: selectedFilter});
    setFiltersToggle(false);
  }

  const handleFiltersToggle = () => {
    setFiltersToggle(!filtersOpen);
  }

  const handleOutsideFiltersClick = () => {
    setFiltersToggle(false);
  }

  return (
  <Component
    filtersOpen={filtersOpen}
    handleInfoClick={handleInfoClick}
    handleBubbleHover={handleBubbleHover}
    handleBubbleClick={handleBubbleClick}
    handleFiltersToggle={handleFiltersToggle}
    handleFilterSelection={handleFilterSelection}
    handleSelectNextIndicator={handleSelectNextIndicator}
    handleOutsideFiltersClick={handleOutsideFiltersClick}
    handleSelectPreviousIndicator={handleSelectPreviousIndicator}
    {...props}
  />
  )
}


export default connect(mapStateToProps, actions)(CountryChallengesChartContainer);
