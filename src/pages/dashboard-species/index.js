import React from 'react';
import { connect } from 'react-redux';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../utils/layer-manager-utils.js';

import DashboardSpeciesComponent from './dashboard-species-component';
import mapStateToProps from './dashboard-species-selectors';
import * as urlActions from 'actions/url-actions';
const actions = { ...urlActions };

function DashboardSpeciesContainer(props) {
  const { viewSettings } = props;

  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      layersArray: viewSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return <DashboardSpeciesComponent handleMapLoad={handleMapLoad} {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardSpeciesContainer);
