import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import HumanPressureWidgetComponent from './human-pressure-widget-component';
import mapStateToProps from './human-pressure-selectors';

const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent };

const HumanPressureWidgetContainer = props => {
  const {
    rasters,
    setLayerVisibility,
    setRasters,
    map,
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent
  } = props;

  const activeRect = Object.keys(rasters).filter(r => rasters[r]);

  const handleTreemapClick = option => {
    let newRasters;
    const { layers } = map;
    const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
    if (!rasters[option.data.rasterId]) {
      newRasters = {...rasters, [option.data.rasterId]: true}
      setRasters(newRasters);
      addLayerAnalyticsEvent({ slug: option.data.slug })
    } else {
      newRasters = Object.assign({}, rasters);
      delete newRasters[option.data.rasterId];
      setRasters(newRasters);
      removeLayerAnalyticsEvent({ slug: option.data.slug })
    }

    const hasRastersWithData = Object.values(newRasters).some(raster => raster);
    setLayerVisibility(LAND_HUMAN_PRESSURES_IMAGE_LAYER, hasRastersWithData);

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

export default connect(mapStateToProps, actions)(HumanPressureWidgetContainer);