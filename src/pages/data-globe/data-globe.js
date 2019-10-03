import React from 'react';
import { connect } from 'react-redux';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs'
import { layersConfig } from 'constants/mol-layers-configs';
import mapStateToProps from './data-globe-selectors';
import DataGlobeComponent from './data-globe-component.jsx';
import { activateLayersOnLoad } from 'utils/layer-manager-utils';
import { humanPressuresPreloadFixes } from 'utils/raster-layers-utils';
import * as urlActions from 'actions/url-actions';

const actions = {...urlActions};

const DataGlobeContainer = props => {


const handleGlobeUpdating = (updating) => props.changeGlobe({ isGlobeUpdating: updating });
const setRasters = (rasters) => props.changeGlobe({ rasters: rasters });

  const handleMapLoad = (map, activeLayers) => {
    const { rasters } = props;
    activateLayersOnLoad(map, activeLayers, layersConfig, rasters, humanPressuresPreloadFixes, LAND_HUMAN_PRESSURES_IMAGE_LAYER);
  }


  return (
    <DataGlobeComponent
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      setRasters={setRasters}
      {...props}
    />
  )
}
 

export default connect(mapStateToProps, actions)(DataGlobeContainer);