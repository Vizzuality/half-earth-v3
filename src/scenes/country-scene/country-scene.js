import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Component from './country-scene-component';
// Services
import { getShortenUrl } from 'services/bitly';
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_GEOMETRIES_SERVICE_URL, COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
// Actions
import countryDataActions from 'redux_modules/country-data';
import countriesGeometriesActions from 'redux_modules/countries-geometries';
import { visitCountryReportCardAnalyticsEvent } from 'actions/google-analytics-actions';

import mapStateToProps from './country-scene-selectors';
const actions = {...countriesGeometriesActions, ...countryDataActions }

const CountrySceneContainer = (props) => {
  const {
    countryISO,
    countryName,
    setCountryBorderReady,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError
  } = props;

  const [shortLink, setShortLink] = useState(null);

  //Create bitly sortLink
  useEffect(() => {
    getShortenUrl(window.location.href)
    .then(link => {
      setShortLink(link);
    })
  }, [])

  // Get countries data on mount
  useEffect(() => {
    setCountryDataLoading();
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL
    }).then((features) => {
      setCountryDataReady(features);
    }).catch((error) => {
      setCountryDataError(error);
    })
  }, [])

  // Get countries borders
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_GEOMETRIES_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true
    }).then((features) => {
      const { geometry } = features[0];
      setCountryBorderReady({ iso: countryISO, borderGraphic: geometry });
    })
  }, [countryISO])

  useEffect(() => {
    visitCountryReportCardAnalyticsEvent(countryName)
  }, [countryName])

  return (
    <Component
      shortLink={shortLink}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(CountrySceneContainer);