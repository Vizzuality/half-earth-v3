import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';

import * as urlActions from 'actions/url-actions';
import { enterNrcAnalytics } from 'actions/google-analytics-actions';
import Component from './country-entry-tooltip-component';
import { NATIONAL_REPORT_CARD } from 'router';

import mapTooltipActions from 'redux_modules/map-tooltip';
import mapStateToProps from 'selectors/map-tooltip-selectors';
const actions = { enterNrcAnalytics, ...urlActions, ...mapTooltipActions }

const CountryEntryTooltipContainer = props => {
  const { mapTooltipIsVisible, countryISO, changeUI } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [tooltipContent, setContent] = useState({});

  // Set country tooltip position
  useEffect(() => {
    if (countryISO) {
      const { setTooltipIsVisible } = props;
      EsriFeatureService.getFeatures({
        url: COUNTRIES_DATA_SERVICE_URL,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: true
      }).then((features) => {
        const { geometry, attributes } = features[0];
        if (geometry) {
          setTooltipPosition(geometry);
          setTooltipIsVisible(true);
          setContent({
            spiLand: attributes[COUNTRY_ATTRIBUTES.SPI_ter],
            spiMar: attributes.SPI_mar,
            landVertebrates: attributes[COUNTRY_ATTRIBUTES.nspecies_ter],
            marVertebrates: attributes.nspecies_mar,
            endemicLand: attributes[COUNTRY_ATTRIBUTES.total_endemic_ter],
            endemicMar: attributes.total_endemic_mar,
            protectionLand: attributes[COUNTRY_ATTRIBUTES.prop_protected_ter],
            protectionMar: attributes.prop_protected_mar,
            protectionNeededLand: attributes[COUNTRY_ATTRIBUTES.protection_needed_ter],
            protectionNeededMar: attributes.protection_needed_mar
          });
        }
      })
    }
  }, [countryISO])

  const handleTooltipClose = () => {
    const { setTooltipIsVisible, setTooltipContent } = props;
    setTooltipIsVisible(false);
    setTooltipContent({});
  }

  const handleExploreCountryClick = () => {
    const { setTooltipIsVisible, countryISO, setTooltipContent, browsePage, countryName, enterNrcAnalytics, onboardingStep, onboardingType } = props;
    setTooltipIsVisible(false);
    setTooltipContent({});
    enterNrcAnalytics(countryName);
    browsePage({ type: NATIONAL_REPORT_CARD, payload: { iso: countryISO }, });
    onboardingStep && onboardingType && changeUI({ onboardingType: 'national-report-cards', onboardingStep: 3, waitingInteraction: false })
  };

  return (
    <Component
      mapTooltipIsVisible={mapTooltipIsVisible}
      tooltipContent={tooltipContent}
      tooltipPosition={tooltipPosition}
      handleTooltipClose={handleTooltipClose}
      onExploreCountryClick={handleExploreCountryClick}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(CountryEntryTooltipContainer);
