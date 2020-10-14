import React from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import mapStateToProps from './data-globe-selectors';
import DataGlobeComponent from './data-globe-component.jsx';
import { activateLayersOnLoad } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';

const actions = {...urlActions};

const DataGlobeContainer = props => {
  const { changeGlobe } = props;
  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    map.ground.surfaceColor = '#0A212E'; // set surface color, before basemap is loaded
    activateLayersOnLoad(map, activeLayers, layersConfig);
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