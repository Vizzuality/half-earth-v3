import React from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import mapStateToProps from './landing-selectors';
import LandingComponent from './landing-component.jsx';
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';

const actions = { ...urlActions };

const LandingContainer = props => {

  const { changeGlobe } = props;
  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({ map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER] });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  return (
    <LandingComponent
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LandingContainer);