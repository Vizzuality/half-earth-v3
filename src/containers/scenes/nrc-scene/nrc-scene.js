import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Component from './nrc-scene-component';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_GEOMETRIES_SERVICE_URL, NRC_TERRESTRIAL_SPI_DATA_LAYER, NRC_MARINE_SPI_DATA_LAYER } from 'constants/layers-urls';
import { NRC_MARINE_SPI_DATA_LAYER as NRC_MARINE_SPI_DATA_LAYER_SLUG } from 'constants/layers-slugs';

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
  const [tooltipInfo, setTooltipInfo] = useState(null);

  const [chartData, setChartData] = useState(null);
  const layerSlug = NRC_MARINE_SPI_DATA_LAYER_SLUG;
  const isoSlug = NRC_MARINE_SPI_DATA_LAYER_SLUG ? 'iso_ter1' : 'GID_0';
  useEffect(() => {
    if (countryISO) {
      EsriFeatureService.getFeatures({
        url: layerSlug === NRC_MARINE_SPI_DATA_LAYER_SLUG ? NRC_MARINE_SPI_DATA_LAYER : NRC_TERRESTRIAL_SPI_DATA_LAYER,
        whereClause: `${isoSlug} = '${countryISO}'`,
        returnGeometry: false
      }).then(data => {
        if (data && data.length > 0) {
          setChartData(data.map(r => r.attributes));
        }
      });
    }
  }, [countryISO, layerSlug]);

  console.info('chartData', chartData)

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

  const handleAreaClick = (results) => {
    const { graphic } = results[0] || {};
    if (!graphic) return;
    // TODO: Find a better way to discern the AOIs
    const isAOI = graphic.attributes.AREA_KM2;
    if (isAOI) {
      const { attributes, geometry } = graphic;
      setTooltipInfo({ attributes, geometry });
    } else {
      // TODO: Dont reload again if its the same country. Now the countryISO is not changing
      // const { attributes: { GID_0 } } = graphic;
      // if (GID_0 === countryISO) return;
      const { browsePage } = props;
      browsePage({ type: NATIONAL_REPORT_CARD, payload: { iso: graphic.attributes.GID_0, view: LOCAL_SCENE_TABS_SLUGS.OVERVIEW }});
    }
  };

  return (
    <Component
      handleAreaClick={handleAreaClick}
      aoiTooltipInfo={tooltipInfo}
      setTooltipInfo={setTooltipInfo}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(NrcSceneContainer);
