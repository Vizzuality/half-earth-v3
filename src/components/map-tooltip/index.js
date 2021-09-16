import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { exploreCountryFromTooltipAnalyticsEvent } from 'actions/google-analytics-actions';
import Component from './country-entry-tooltip-component';
const actions = { exploreCountryFromTooltipAnalyticsEvent, ...urlActions}

const CountryEntryTooltipContainer = props => {
  const { geometry } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);

  // Set country tooltip position
  useEffect(() => {
    // get the geometry from the store (it should be added whenever a feature is clicked)
    if (geometry) {
      setTooltipPosition(geometry);
    }
  }, [geometry])

  const handleCloseButtonClick = () => {
    // boolean on tooltip store to update its state isOpen
  }

  const handleActionButtonClick = () => {
    // does this always triggers a browse page action??
  };

  return (
    <Component
      tooltipPosition={tooltipPosition}
      onCloseButtonClick={handleCloseButtonClick}
      onActionButtonClick={handleActionButtonClick}
      {...props}
    />
  )
}

export default connect(null, actions)(CountryEntryTooltipContainer);