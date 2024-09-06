import React from 'react';
import { connect } from 'react-redux';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';
import { setBasemap } from '../../utils/layer-manager-utils.js';

import DashboardTrendsComponent from './dashboard-trends-component';
import mapStateToProps from './dashboard-trends-selectors';
const actions = { ...countryDataActions, ...urlActions };

function DashboardTrendsContainer(props) {
  const { viewSettings } = props;
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      layersArray: viewSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return <DashboardTrendsComponent handleMapLoad={handleMapLoad} {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardTrendsContainer);
