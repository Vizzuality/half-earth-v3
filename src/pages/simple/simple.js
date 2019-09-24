import React from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import mapStateToProps from './data-globe-selectors';
import DataGlobeComponent from './data-globe-simple-component.jsx';
import { createLayer, addLayerToMap } from 'utils/layer-manager-utils';
import { humanPressuresPreloadFixes } from 'utils/raster-layers-utils';
import * as urlActions from 'actions/url-actions';

const actions = {...urlActions};

const DataGlobeContainer = props => {

const handleGlobeUpdating = (updating) => props.changeGlobe({ isGlobeUpdating: updating });
const setRasters = (rasters) => props.changeGlobe({ rasters: rasters });

  const handleMapLoad = (map, activeLayers) => {
    // Here we are creating the biodiversity layers active in the URL
    // this is needed to have the layers displayed on the map when sharing the URL
    const activeLayerIDs = activeLayers
      .map(({ title }) => title);
  
    const layersToBeCreated = layersConfig
      .filter(({ type, slug }) => type && activeLayerIDs.includes(slug));
  
      layersToBeCreated.forEach(async layer => {
      const newLayer = await createLayer(layer, map);
      if (layer.slug === 'land_human_pressures') {
        humanPressuresPreloadFixes(newLayer, props.rasters);
      }
      addLayerToMap(newLayer, map);
    });
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