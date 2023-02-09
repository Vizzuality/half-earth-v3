import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// Services
import countriesGeometriesActions from 'redux_modules/countries-geometries';

import { DATA, NATIONAL_REPORT_CARD } from 'router';

import { visitCountryReportCardAnalyticsEvent as visitAction } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import EsriFeatureService from 'services/esri-feature/esri-feature-service';

// Constants
import { EEZ_MARINE_GEOMETRY_BORDERS_URL } from 'constants/layers-urls';
import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';
// Actions

import Component from './nrc-scene-component';
import mapStateToProps from './nrc-scene-selectors';

const actions = {
  ...countriesGeometriesActions,
  ...urlActions,
  visitCountryReportCardAnalyticsEvent: visitAction,
};
function NrcSceneContainer(props) {
  const {
    countryISO,
    setCountryBorderReady,
    visitCountryReportCardAnalyticsEvent,
  } = props;
  const [tooltipInfo, setTooltipInfo] = useState(null);

  // Get country borders
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: EEZ_MARINE_GEOMETRY_BORDERS_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    })
      .then((features) => {
        const { geometry } = features[0];
        setCountryBorderReady({ iso: countryISO, borderGraphic: geometry });
      })
      .catch((error) => {
        console.error(
          'Inexistent country ISO code on the URL. Redirected to main page',
          error
        );
        const { browsePage } = props;
        browsePage({ type: DATA });
      });
  }, [countryISO]);

  useEffect(() => {
    visitCountryReportCardAnalyticsEvent(countryISO);
  }, [countryISO]);

  const handleAreaClick = (results) => {
    const { graphic } = (results && results[0]) || {};
    if (!graphic) return;
    // TODO: Find a better way to discern the Future places from countries
    const isFuturePlace = graphic.attributes && graphic.attributes.AREA_KM2;
    if (isFuturePlace) {
      const { attributes, geometry } = graphic;
      setTooltipInfo({ attributes, geometry });
    } else {
      // Browse different country NRC

      // TODO: Dont reload again if its the same country. Now the countryISO is not changing
      // const { attributes: { GID_0 } } = graphic;
      // if (GID_0 === countryISO) return;
      const { browsePage } = props;
      browsePage({
        type: NATIONAL_REPORT_CARD,
        payload: {
          iso: graphic.attributes.GID_0,
          view: LOCAL_SCENE_TABS_SLUGS.OVERVIEW,
        },
      });
    }
  };

  return (
    <Component
      handleAreaClick={handleAreaClick}
      futurePlaceTooltipInfo={tooltipInfo}
      setTooltipInfo={setTooltipInfo}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(NrcSceneContainer);
