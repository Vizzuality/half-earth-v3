import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// Services
import mapTooltipActions from 'redux_modules/map-tooltip';

import { NATIONAL_REPORT_CARD } from 'router';

import { useLocale } from '@transifex/react';

import mapStateToProps from 'selectors/map-tooltip-selectors';

import { enterNrcAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import EsriFeatureService from 'services/esri-feature-service';
// utils

// Constants
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';

import Component from './country-entry-tooltip-component';

const actions = { enterNrcAnalytics, ...urlActions, ...mapTooltipActions };

function CountryEntryTooltipContainer(props) {
  const { mapTooltipIsVisible, countryISO, changeUI } = props;
  const locale = useLocale();

  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [tooltipContent, setContent] = useState({});

  // Set country tooltip position
  useEffect(() => {
    if (countryISO) {
      const { setTooltipIsVisible } = props;
      EsriFeatureService.getFeatures({
        url: COUNTRIES_DATA_SERVICE_URL,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: true,
      }).then((features) => {
        const { geometry, attributes } = features[0];
        if (geometry) {
          setTooltipPosition(geometry);
          setTooltipIsVisible(true);
          setContent({
            coastal: attributes.Marine === 'True',
            spiLand: attributes[COUNTRY_ATTRIBUTES.SPI_ter],
            spiMar: attributes.SPI_mar,
            landVertebrates: getLocaleNumber(
              attributes[COUNTRY_ATTRIBUTES.nspecies_ter],
              locale
            ),
            marVertebrates: getLocaleNumber(attributes.nspecies_mar, locale),
            endemicLand: getLocaleNumber(
              attributes[COUNTRY_ATTRIBUTES.total_endemic_ter],
              locale
            ),
            endemicMar: getLocaleNumber(attributes.total_endemic_mar, locale),
            protectionLand: attributes[COUNTRY_ATTRIBUTES.prop_protected_ter],
            protectionMar: attributes.prop_protected_mar,
            protectionNeededLand:
              attributes[COUNTRY_ATTRIBUTES.protection_needed_ter],
            protectionNeededMar: attributes.protection_needed_mar,
          });
        }
      });
    }
  }, [countryISO, locale]);

  const handleTooltipClose = () => {
    const { setTooltipIsVisible, setTooltipContent } = props;
    setTooltipIsVisible(false);
    setTooltipContent({});
  };

  const handleExploreCountryClick = () => {
    const {
      setTooltipIsVisible,
      countryISO: _countryISO,
      setTooltipContent,
      browsePage,
      countryName,
      enterNrcAnalytics: _enterNrcAnalytics,
      onboardingStep,
      onboardingType,
    } = props;
    setTooltipIsVisible(false);
    setTooltipContent({});
    _enterNrcAnalytics(countryName);
    browsePage({ type: NATIONAL_REPORT_CARD, payload: { iso: _countryISO } });
    if (onboardingStep && onboardingType) {
      changeUI({
        onboardingType: 'national-report-cards',
        onboardingStep: 3,
        waitingInteraction: false,
      });
    }
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
  );
}

export default connect(mapStateToProps, actions)(CountryEntryTooltipContainer);
