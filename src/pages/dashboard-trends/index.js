import React from 'react';
import { connect } from 'react-redux';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../utils/layer-manager-utils.js';

import DashboardTrendsComponent from './dashboard-trends-component';
import mapStateToProps from './dashboard-trends-selectors';

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

export default connect(mapStateToProps, null)(DashboardTrendsContainer);
