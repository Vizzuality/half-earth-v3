import React from 'react';
import { connect } from 'react-redux';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../utils/layer-manager-utils.js';

import DashboardComponent from './dashboard-component';
import mapStateToProps from './dashboard-selectors';

function DashboardContainer(props) {
  const { viewSettings } = props;
  const handleMapLoad = (map, activeLayers) => {
    console.log('map view loaded', map);
    setBasemap({
      map,
      layersArray: viewSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return <DashboardComponent handleMapLoad={handleMapLoad} {...props} />;
}

export default connect(mapStateToProps, null)(DashboardContainer);
