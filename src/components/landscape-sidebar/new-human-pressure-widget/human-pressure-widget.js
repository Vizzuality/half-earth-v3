import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import { handleLayerRendered } from 'utils/layer-manager-utils';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import HumanPressureWidgetComponent from './human-pressure-widget-component';
import mapStateToProps from './human-pressure-selectors';
import { VIEW_MODE } from  'constants/google-analytics-constants';

const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent };

const HumanPressureWidgetContainer = props => {
  const {
    rasters,
    setLayerVisibility,
    setRasters,
    map,
    view,
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent,
    handleGlobeUpdating
  } = props;

  const handleHumanPressureRasters = (rasters, option) => {
      const { layers } = map;
      const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
      
      const hasRastersWithData = Object.values(rasters).some(raster => raster);
      if (hasRastersWithData) {
        handleGlobeUpdating(true);
      }
      setRasters(rasters);
      handleLayerRendered(view, humanImpactLayer, handleGlobeUpdating);
  
      setLayerVisibility(LAND_HUMAN_PRESSURES_IMAGE_LAYER, hasRastersWithData);
  
      const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
      const rasterNames = activeRasters.map(value => `human_impact_${value}`)
  
      const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;
  
      const analyticsParams = { slug: option.slug, query: { viewMode: VIEW_MODE.LANDSCAPE }};
      const isRasterActive = activeRasters.some(value => value === option.value);
      if (isRasterActive) addLayerAnalyticsEvent(analyticsParams) 
      else removeLayerAnalyticsEvent(analyticsParams);
  
      loadModules(["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {
        humanImpactLayer.mosaicRule = new MosaicRule({
          method: 'attribute',
          operation: 'sum',
          where: mosaicWhereClause
        });
      });
    }

  return <HumanPressureWidgetComponent {...props} rasters={rasters} handleOnClick={handleHumanPressureRasters}/>
}

export default connect(mapStateToProps, actions)(HumanPressureWidgetContainer);