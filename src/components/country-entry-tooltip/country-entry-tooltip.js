import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { NATIONAL_REPORT_CARD, NATIONAL_REPORT_CARD_LANDING } from 'router';

import { useLocale } from '@transifex/react';

import mapStateToProps from 'selectors/map-tooltip-selectors';

import { enterNrcAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import initialState from 'containers/scenes/mobile/nrc-landing-scene-mobile/scene-config';

import EsriFeatureService from 'services/esri-feature-service';

import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import { useMobile } from 'constants/responsive';

import Component from './country-entry-tooltip-component';

const actions = { enterNrcAnalytics, ...urlActions, ...mapTooltipActions };

function CountryEntryTooltipContainer(props) {
  const {
    browsePage,
    countryISO,
    changeUI,
    mapTooltipIsVisible,
    view,
    changeGlobe,
  } = props;
  const locale = useLocale();
  const isMobile = useMobile();
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
            countryName: attributes.NAME_0,
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

  // Hide tooltip if we dont have a country selected
  useEffect(() => {
    if (!countryISO) {
      const { setTooltipIsVisible } = props;
      setTooltipIsVisible(false);
    }
  }, [countryISO]);

  const handleTooltipClose = () => {
    const { setTooltipIsVisible, setTooltipContent } = props;
    setTooltipIsVisible(false);
    setTooltipContent({});
    changeGlobe({ countryTooltipDisplayFor: null });

    if (isMobile) {
      browsePage({
        type: NATIONAL_REPORT_CARD_LANDING,
        payload: { iso: null },
      });
      view.goTo({ zoom: initialState.globe.zoom });
    }
  };

  const handleExploreCountryClick = () => {
    const {
      setTooltipIsVisible,
      countryISO: _countryISO,
      setTooltipContent,
      countryName,
      enterNrcAnalytics: _enterNrcAnalytics,
      onboardingStep,
      onboardingType,
    } = props;
    if (onboardingType) {
      if (onboardingStep === 2) {
        changeUI({
          onboardingType: 'national-report-cards',
          onboardingStep: 3,
          waitingInteraction: false,
          onboardingTooltipTop: null,
          onboardingTooltipLeft: null,
        });
      }
    } else {
      setTooltipIsVisible(false);
      setTooltipContent({});
      _enterNrcAnalytics(countryName);
      browsePage({ type: NATIONAL_REPORT_CARD, payload: { iso: _countryISO } });
    }
  };

  return (
    <Component
      mapTooltipIsVisible={mapTooltipIsVisible}
      tooltipContent={tooltipContent}
      tooltipPosition={tooltipPosition}
      handleTooltipClose={handleTooltipClose}
      onExploreCountryClick={handleExploreCountryClick}
      isMobile={isMobile}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(CountryEntryTooltipContainer);
