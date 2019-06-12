import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { humanPressuresLandUse, HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';
import HumanPressureWidgetComponent from './human-pressure-widget-component';

import mapStateToProps from './human-pressure-selectors';

const HumanPressureWidgetContainer = (props) => {
  const {
    activeLayers,
    rasters,
    setLayerVisibility,
    setRasters,
    map
  } = props;
  console.log(map.layers)

  const humanImpactLayerActive = activeLayers.find(l => l.id === HUMAN_PRESSURE_LAYER_ID);
  const alreadyChecked = humanImpactLayerActive && humanPressuresLandUse.reduce((acc, option) => ({ 
    ...acc, [option.value]: rasters[option.value]
  }), {}) || {};

  const handleTreemapClick = (option) => {
    
    const { layers } = map;
    let newRasters;
    const humanImpactLayer = layers.items.find(l => l.id === HUMAN_PRESSURE_LAYER_ID);
    if (!rasters[option.data.rasterId]) {
      newRasters = {...rasters, [option.data.rasterId]: true}
      setRasters(newRasters);
    } else {
      newRasters = {...rasters, [option.data.rasterId]: undefined};
      setRasters(newRasters);
    }

    const hasRastersWithData = Object.values(newRasters).some(raster => raster);
    setLayerVisibility(HUMAN_PRESSURE_LAYER_ID, hasRastersWithData);

    const activeRasters = Object.keys(alreadyChecked).filter(rasterName => alreadyChecked[rasterName])
    const rasterNames = [rasters].map(value => `human_impact_${value}`)

    const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;

    loadModules(["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {
      humanImpactLayer.mosaicRule = new MosaicRule({
        method: 'attribute',
        operation: 'sum',
        where: mosaicWhereClause
      });
    });
    console.log('option', option.data)
    console.log('humanImpactLayer', humanImpactLayer)
    console.log('humanImpactLayerActive', humanImpactLayerActive)
    console.log('rasters', rasters)
    console.log('alreadyChecked', alreadyChecked)
  }

  return <HumanPressureWidgetComponent {...props} handleOnClick={handleTreemapClick}/>
}

export default connect(mapStateToProps, null)(HumanPressureWidgetContainer);