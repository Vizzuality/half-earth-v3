import React from 'react';
import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import DataGlobeComponent from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';

const actions = { ...urlActions };

function DataGlobeContainer(props) {
  const { changeGlobe } = props;
  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return (
    <DataGlobeComponent
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(DataGlobeContainer);
