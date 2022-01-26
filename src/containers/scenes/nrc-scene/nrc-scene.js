import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './nrc-scene-component';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_GEOMETRIES_SERVICE_URL } from 'constants/layers-urls';
import { LOCAL_SCENE_TABS_SLUGS } from "constants/ui-params";
// Actions
import countriesGeometriesActions from 'redux_modules/countries-geometries';
import * as urlActions from 'actions/url-actions';
import { visitCountryReportCardAnalyticsEvent } from 'actions/google-analytics-actions';
import { DATA, NATIONAL_REPORT_CARD } from 'router'

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
      console.error('Inexistent country ISO code on the URL. Redirected to main page', error)
      const { browsePage } = props;
      browsePage({ type: DATA });
    })
  }, [countryISO])

  useEffect(() => {
    visitCountryReportCardAnalyticsEvent(countryISO);
  }, [countryISO])

  const handleCountryClick = (results) => {
    const { graphic } = results[0] || {};
    if (!graphic) return;

    // TODO: Dont reload again if its the same country. Now the countryISO is not changing
    // const { attributes: { GID_0 } } = graphic;
    // if (GID_0 === countryISO) return;

    const { browsePage } = props;
    browsePage({type: NATIONAL_REPORT_CARD, payload: { iso: graphic.attributes.GID_0, view:  LOCAL_SCENE_TABS_SLUGS.OVERVIEW }});
  };

  return (
    <Component
      handleCountryClick={handleCountryClick}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(NrcSceneContainer);
