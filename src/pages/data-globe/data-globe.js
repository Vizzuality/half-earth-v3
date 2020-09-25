import React from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import mapStateToProps from './data-globe-selectors';
import DataGlobeComponent from './data-globe-component.jsx';
import { activateLayersOnLoad } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';

const actions = {...urlActions};

const DataGlobeContainer = props => {
  const { userConfig, changeGlobe } = props;
  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    activateLayersOnLoad(map, activeLayers, layersConfig, userConfig);
  }

  return (
    <DataGlobeComponent
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(DataGlobeContainer);