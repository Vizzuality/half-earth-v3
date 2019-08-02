import React from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { loadModules } from '@esri/react-arcgis';

import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';

const handleMapLoad = (map, view, activeLayers, mountExpertGlobe) => {
  loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
    watchUtils.whenNotOnce(view, 'updating', () => { mountExpertGlobe() ;})
  })
}

const feturedGlobeContainer = props => {
  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setFeaturedGlobeSettings);
  const handleZoomChange = props.setFeaturedGlobeSettings;

  const mountExpertGlobe = () => props.setFeaturedGlobeSettings({ mountExpertGlobe: true });

  return <Component handleLayerToggle={toggleLayer} handleZoomChange={handleZoomChange} onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers, mountExpertGlobe)} {...props}/>
}

export default connect(mapStateToProps, ownActions)(feturedGlobeContainer);