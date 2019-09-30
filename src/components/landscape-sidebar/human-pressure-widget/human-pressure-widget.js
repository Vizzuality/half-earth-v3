import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { handleLayerRendered } from 'utils/layer-manager-utils';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import HumanPressureWidgetComponent from './human-pressure-widget-component';
import mapStateToProps from './human-pressure-selectors';
import { VIEW_MODE } from  'constants/google-analytics-constants';
import { humanPressuresLandUse } from 'constants/human-pressures';


// Constants
import { layersConfig } from 'constants/mol-layers-configs';

// Utils
import { addLayerToMap, createLayer, isLayerInMap, layerManagerVisibility, findLayerInMap } from 'utils/layer-manager-utils';
import { humanPressuresPreloadFixes, dispatchLandPressuresLayersAnalyticsEvents } from 'utils/raster-layers-utils';
//Actions
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };

const HumanPressureWidgetContainer = props => {
  const {
    setRasters,
    map,
    view,
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent,
    handleGlobeUpdating,
    activeLayers
  } = props;

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


  const handleHumanPressureRasters = (rasters, option) => {
    console.log(rasters)
    const { changeGlobe } = props;
    const humanImpactLayer = findLayerInMap(LAND_HUMAN_PRESSURES_IMAGE_LAYER, map);
    const hasRastersWithData = Object.values(rasters).some(raster => raster);
    hasRastersWithData && handleGlobeUpdating(true);
    setRasters(rasters);
    handleLayerRendered(view, humanImpactLayer, handleGlobeUpdating);
    layerManagerVisibility(LAND_HUMAN_PRESSURES_IMAGE_LAYER, hasRastersWithData, activeLayers, changeGlobe);
    humanPressuresPreloadFixes(humanImpactLayer, rasters);
    dispatchLandPressuresLayersAnalyticsEvents(rasters, option, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, VIEW_MODE);
  }

  return <HumanPressureWidgetComponent {...props} handleOnClick={handleHumanPressureRasters} checkedRasters={checkedOptions}/>
}

export default connect(mapStateToProps, actions)(HumanPressureWidgetContainer);