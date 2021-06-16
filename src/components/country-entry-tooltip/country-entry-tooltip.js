import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import * as urlActions from 'actions/url-actions';
import { exploreCountryFromTooltipAnalyticsEvent } from 'actions/google-analytics-actions';
import Component from './country-entry-tooltip-component';
import { NATIONAL_REPORT_CARD } from 'router'
const actions = { exploreCountryFromTooltipAnalyticsEvent, ...urlActions}

const CountryEntryTooltipContainer = props => {
  const { countryISO } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);

  // Set country tooltip position
  useEffect(() => {
    if (countryISO) {
      EsriFeatureService.getFeatures({
        url: COUNTRIES_DATA_SERVICE_URL,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: true
      }).then((features) => {
        const { geometry } = features[0];
        setTooltipPosition(geometry);
      })
    }
  }, [countryISO])

  const handleTooltipClose = () => {
    const { changeGlobe } = props;
    changeGlobe({countryISO: null})
  }

  const handleExploreCountryClick = () => {
    const { countryISO, browsePage, countryName, exploreCountryFromTooltipAnalyticsEvent } = props;
    exploreCountryFromTooltipAnalyticsEvent({countryName});
    browsePage({type: NATIONAL_REPORT_CARD, payload: { iso: countryISO }});
  };

  return (
    <Component
      tooltipPosition={tooltipPosition}
      handleTooltipClose={handleTooltipClose}
      onExploreCountryClick={handleExploreCountryClick}
      {...props}
    />
  )
}

export default connect(null, actions)(CountryEntryTooltipContainer);