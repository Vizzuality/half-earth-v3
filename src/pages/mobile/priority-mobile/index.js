import React from 'react';
import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import Component from './priority-mobile-component.jsx';
import mapStateToProps from './priority-mobile-selectors';

const actions = { ...urlActions };

function PriorityMobileContainer(props) {
  const { changeGlobe } = props;
  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
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
