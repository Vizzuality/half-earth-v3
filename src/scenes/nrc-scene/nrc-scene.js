import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './nrc-scene-component';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_GEOMETRIES_SERVICE_URL } from 'constants/layers-urls';
// Actions
import countriesGeometriesActions from 'redux_modules/countries-geometries';
import { visitCountryReportCardAnalyticsEvent } from 'actions/google-analytics-actions';

import mapStateToProps from './nrc-scene-selectors';
const actions = {...countriesGeometriesActions, visitCountryReportCardAnalyticsEvent }

const NrcSceneContainer = (props) => {
  const {
    countryISO,
    setCountryBorderReady,
    visitCountryReportCardAnalyticsEvent
  } = props;

  // Get country borders
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
    visitCountryReportCardAnalyticsEvent(countryISO);
  }, [countryISO])

  return (
    <Component
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(NrcSceneContainer);