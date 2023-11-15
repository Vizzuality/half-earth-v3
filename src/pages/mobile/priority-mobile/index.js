import React from 'react';
import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../../utils/layer-manager-utils.js';

import Component from './priority-mobile-component.jsx';
import mapStateToProps from './priority-mobile-selectors';

const actions = { ...urlActions };

function PriorityMobileContainer(props) {
  const { changeGlobe, sceneSettings } = props;
  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      surfaceColor: '#070710',
      layersArray: sceneSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return (
    <Component
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(PriorityMobileContainer);
