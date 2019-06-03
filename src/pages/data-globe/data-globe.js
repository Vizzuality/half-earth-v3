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
// const HUMAN_IMPACT_LAYER = 'Human Impact';
// const TAXA_FIELD = 'TAXA';

const handleMapLoad = (map, view) => {
  const { layers } = map;
  const gridLayer = layers.items.find(l => l.title === RICHNESS_RARITY_GRID);
  // set the outFields for the rarity-richness-GRID layer
  // to get all the attributes available
  gridLayer.outFields = ["*"];

  // const humanImpactLayer = layers.items.find(l => l.title === HUMAN_IMPACT_LAYER);

  loadModules(
    ["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {

      // TODO: MosaicRule allows to select rasters using the "where" clause. Figure out mosaic method and operation
      // humanImpactLayer.mosaicRule = new MosaicRule({
      //   method: "attribute",
      //   where: `Name = 'human_impact_urban' OR Name = 'human_impact_all'`
      // });

      // setSpeciesLoading();
      // uniqueValues({ layer: gridLayer, field: TAXA_FIELD}).then((result) => {
      //   setSpecies(result.uniqueValueInfos);
      // }).catch((err) => {
      //   setSpeciesError(err);
      // })
  }).catch((err) => { console.error(err)});
}
const dataGlobeContainer = props => {
  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setDataGlobeSettings);
  const handleZoomChange = props.setDataGlobeSettings;
  
  return <Component
    handleLayerToggle={toggleLayer}
    onLoad={(map, view) => handleMapLoad(map, view)}
    handleZoomChange={handleZoomChange}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);