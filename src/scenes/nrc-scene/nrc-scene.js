import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './nrc-scene-component';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_GEOMETRIES_SERVICE_URL } from 'constants/layers-urls';
// Actions
import countriesGeometriesActions from 'redux_modules/countries-geometries';
import * as urlActions from 'actions/url-actions';
import { visitCountryReportCardAnalyticsEvent } from 'actions/google-analytics-actions';
import { DATA } from 'router'

import mapStateToProps from './nrc-scene-selectors';
const actions = {...countriesGeometriesActions, ...urlActions, visitCountryReportCardAnalyticsEvent }

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
    }).catch(error => {
      console.error('Inexistent country ISO code on the URL. Redirected to main page')
      const { browsePage } = props;
      browsePage({ type: DATA });
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