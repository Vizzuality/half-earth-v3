import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import countryDataActions from 'redux_modules/country-data';

import * as urlActions from 'actions/url-actions';

import EsriFeatureService from 'services/esri-feature/esri-feature-service';

import {
  COUNTRIES_DATA_SERVICE_URL,
  NRC_TERRESTRIAL_SPI_DATA_LAYER,
  NRC_MARINE_SPI_DATA_LAYER,
} from 'constants/layers-urls';

import NrcComponent from './nrc-component.jsx';
import mapStateToProps from './nrc-selectors';

const actions = { ...countryDataActions, ...urlActions };

function NrcContainer(props) {
  const {
    countryISO,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError,
  } = props;

  // Get countries data on mount
  useEffect(() => {
    setCountryDataLoading();
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
    })
      .then((features) => {
        setCountryDataReady(features);
      })
      .catch((error) => {
        setCountryDataError(error);
      });
  }, []);

  const [chartLandData, setChartLandData] = useState(null);
  const [chartMarineData, setChartMarineData] = useState(null);
  useEffect(() => {
    if (countryISO) {
      EsriFeatureService.getFeatures({
        url: NRC_TERRESTRIAL_SPI_DATA_LAYER,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: false,
      }).then((data) => {
        if (data && data.length > 0) {
          setChartLandData(data.map((r) => r.attributes));
        }
      });
      EsriFeatureService.getFeatures({
        url: NRC_MARINE_SPI_DATA_LAYER,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: false,
      }).then((data) => {
        setChartMarineData(
          data && data.length > 0 ? data.map((r) => r.attributes) : null
        );
      });
    }
  }, [countryISO]);

  const handleLandMarineSelection = (landMarineSelection) => {
    const { changeUI } = props;
    changeUI({ landMarineSelection });
  };
  const handleSetFullRanking = (fullRanking) => {
    const { changeUI } = props;
    changeUI({ fullRanking });
  };

  return (
    <NrcComponent
      {...props}
      chartData={{ land: chartLandData, marine: chartMarineData }}
      handleLandMarineSelection={handleLandMarineSelection}
      handleSetFullRanking={handleSetFullRanking}
    />
  );
}

export default connect(mapStateToProps, actions)(NrcContainer);
