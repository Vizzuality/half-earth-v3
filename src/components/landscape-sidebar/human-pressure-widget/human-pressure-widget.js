import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';
import HumanPressureWidgetComponent from './human-pressure-widget-component';

import mapStateToProps from './human-pressure-selectors';

const HumanPressureWidgetContainer = props => {
  const {
    rasters,
    setLayerVisibility,
    setRasters,
    map
  } = props;

  const activeRect = Object.keys(rasters).filter(r => rasters[r]);

  const handleTreemapClick = option => {
    let newRasters;
    const { layers } = map;
    const humanImpactLayer = layers.items.find(l => l.id === HUMAN_PRESSURE_LAYER_ID);
    if (!rasters[option.data.rasterId]) {
      newRasters = {...rasters, [option.data.rasterId]: true}
      setRasters(newRasters);
    } else {
      newRasters = Object.assign({}, rasters);
      delete newRasters[option.data.rasterId];
      console.log(newRasters)
      setRasters(newRasters);
    }

    const hasRastersWithData = Object.values(newRasters).some(raster => raster);
    setLayerVisibility(HUMAN_PRESSURE_LAYER_ID, hasRastersWithData);

    const rasterNames = Object.keys(newRasters).map(key => `human_impact_${key}`)
    const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;

    loadModules(["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {
      humanImpactLayer.mosaicRule = new MosaicRule({
        method: 'attribute',
        operation: 'sum',
        where: mosaicWhereClause
      });
    });
  }

  return <HumanPressureWidgetComponent {...props} activeRect={activeRect} handleOnClick={handleTreemapClick}/>
}

export default connect(mapStateToProps, null)(HumanPressureWidgetContainer);