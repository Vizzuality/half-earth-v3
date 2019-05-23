import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';

import { layerManagerToggle } from 'utils/layer-manager-utils';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';
import biodiversityActions from 'redux_modules/biodiversity-data/biodiversity-data';

import ownActions from './data-globe-actions.js';
const actions = { ...ownActions, ...biodiversityActions };

const RICHNESS_RARITY_GRID = 'rarity-richness-GRID';
const TAXA_FIELD = 'TAXA';

const handleMapLoad = (map, view, setSpecies, setSpeciesLoading, setSpeciesError) => {
  const { layers } = map;
  const gridLayer = layers.items.find(l => l.title === RICHNESS_RARITY_GRID);
  // set the outFields for the rarity-richness-GRID layer
  // to get all the attributes available
  gridLayer.outFields = ["*"];
  loadModules(
    ["esri/renderers/smartMapping/statistics/uniqueValues"]).then(([uniqueValues]) => {
      setSpeciesLoading();
      uniqueValues({ layer: gridLayer, field: TAXA_FIELD}).then((result) => {
        setSpecies(result.uniqueValueInfos);
      }).catch((err) => {
        setSpeciesError(err);
      })
  }).catch((err) => { console.error(err); setSpeciesError(err) });
}

const dataGlobeContainer = props => {
  const toggleLayer = e => layerManagerToggle(e, "data-layer-id", props.activeLayers, props.setDataGlobeSettings);
  const handleZoomChange = props.setDataGlobeSettings;
  const { setSpecies, setSpeciesLoading, setSpeciesError } = props;
  return <Component 
    handleLayerToggle={toggleLayer}
    onLoad={(map, view) => handleMapLoad(map, view, setSpecies, setSpeciesLoading, setSpeciesError)}
    handleZoomChange={handleZoomChange} 
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);