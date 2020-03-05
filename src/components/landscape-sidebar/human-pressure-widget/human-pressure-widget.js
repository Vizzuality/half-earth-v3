import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { LAND_HUMAN_PRESURES_LAYERS } from 'constants/layers-groups';
import HumanPressureWidgetComponent from './human-pressure-widget-component';
import mapStateToProps from './human-pressure-selectors';
import { VIEW_MODE } from  'constants/google-analytics-constants';
// Constants
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
// Utils
import { handleLayerCreation } from 'utils/layer-manager-utils';
//Actions
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };

const HumanPressureWidgetContainer = props => {
  const {
    map,
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent,
    activeLayers
  } = props;

  const [checkedOptions, setCheckedOptions] = useState({});

  useEffect(() => {
    const alreadyChecked = LAND_HUMAN_PRESURES_LAYERS.reduce((acc, option) => ({
      ...acc, [option]: activeLayers.some(layer => layer.title === option)
    }), {});
    setCheckedOptions(alreadyChecked);
  }, [activeLayers])


    const handleHumanPressureRasters = (rasters, option) => {
      const { changeGlobe } = props;
      const layerConfig = layersConfig[option.slug];
      handleLayerCreation(layerConfig, map);
      layerManagerToggle(option.slug, activeLayers, changeGlobe, LAYERS_CATEGORIES.LAND_PRESSURES);
      // dispatchLandPressuresLayersAnalyticsEvents(activeLayers, option, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, VIEW_MODE);
  }

  return (
    <HumanPressureWidgetComponent
      handleOnClick={handleHumanPressureRasters}
      checkedRasters={checkedOptions}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(HumanPressureWidgetContainer);