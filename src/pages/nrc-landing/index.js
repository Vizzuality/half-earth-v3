import React from 'react';
import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../utils/layer-manager-utils.js';

import Component from './component.jsx';
import mapStateToProps from './selectors';

const actions = { ...urlActions };

function NrcLandingContainer(props) {
  const { changeGlobe, sceneSettings } = props;

  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });

  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
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

export default connect(mapStateToProps, actions)(NrcLandingContainer);
