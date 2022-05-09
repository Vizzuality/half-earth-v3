import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { exploreCountryFromTooltipAnalyticsEvent } from 'actions/google-analytics-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import Component from './component';
import mapStateToProps from 'selectors/map-tooltip-selectors';
const actions = { exploreCountryFromTooltipAnalyticsEvent, ...urlActions, ...mapTooltipActions }

const MapTooltipContainer = props => {
  const { mapTooltipGeometry, mapTooltipContent, mapTooltipIsVisible, setBatchTooltipData } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);

  // Set country tooltip position
  useEffect(() => {
    if (mapTooltipGeometry) {
      setTooltipPosition(mapTooltipGeometry);
    }
  }, [mapTooltipGeometry])

  const handleCloseButtonClick = () => {
    setBatchTooltipData({
      isVisible: false,
      content: null,
      geometry: null
    })
  }

  return (
    <Component
      content={mapTooltipContent}
      isVisible={mapTooltipIsVisible}
      tooltipPosition={tooltipPosition}
      onCloseButtonClick={handleCloseButtonClick}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(MapTooltipContainer);
