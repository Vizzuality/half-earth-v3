import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './dashboard-selectors';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';
import EsriFeatureService from 'services/esri-feature-service';
import DashboardComponent from './dashboard-component';
import {
  COUNTRIES_DATA_SERVICE_URL
} from 'constants/layers-urls';

const actions = { ...countryDataActions, ...urlActions };

function DashboardContainer(props) {
  const {
    countryISO,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError,
  } = props;

  // Get Country information, allows to get country name
  useEffect(() => {
    setCountryDataLoading();
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: false,
    })
      .then((features) => {
        setCountryDataReady(features);
      })
      .catch((error) => {
        setCountryDataError(error);
      });
  }, []);

  return <DashboardComponent {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardContainer);
