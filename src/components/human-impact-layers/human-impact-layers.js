import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// Component
import Component from './human-impact-layers-component';
// Constants
import { layersConfig } from 'constants/mol-layers-configs';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { humanPressuresLandUse } from 'constants/human-pressures';
// Utils
import { addLayerToMap, createLayer, isLayerInMap } from 'utils/layer-manager-utils';
import { humanPressuresPreloadFixes } from 'utils/raster-layers-utils';
//Actions
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };


const HumanImpactLayersContainer = props => {

  const [checkedOptions, setCheckedOptions] = useState({});
  // Create the layer and set properties on mount
  useEffect(() => {
    const { map, rasters } = props;
    const layerConfig = layersConfig.find(l => l.slug === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
    if (!isLayerInMap(layerConfig, map)) {
      const rastersObject = rasters || {};
      createLayer(layerConfig, map).then(async layer => {
        await humanPressuresPreloadFixes(layer, rastersObject);
        addLayerToMap(layer, map);
      })
    }
  }, []);

  useEffect(() => {
    const { activeLayers, rasters } = props;
    const humanImpactLayerActive = activeLayers.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
    // eslint-disable-next-line no-mixed-operators
    const alreadyChecked = humanImpactLayerActive && (humanPressuresLandUse.reduce((acc, option) => ({
      ...acc, [option.value]: rasters[option.value]
    }), {})) || {};
    setCheckedOptions(alreadyChecked);
  }, [])

  return (
    <Component
      alreadyChecked={checkedOptions}
      {...props}
    />
  )
} 
export default  connect(null, actions)(HumanImpactLayersContainer);
