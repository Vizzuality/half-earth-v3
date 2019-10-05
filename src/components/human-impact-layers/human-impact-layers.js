import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// Component
import Component from './human-impact-layers-component';
// Constants
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { humanPressuresLandUse } from 'constants/human-pressures';
//Actions
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };


const HumanImpactLayersContainer = props => {

  const { activeLayers, rasters } = props;

  const [checkedOptions, setCheckedOptions] = useState({});

  useEffect(() => {
    const humanImpactLayerActive = activeLayers.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
    // eslint-disable-next-line no-mixed-operators
    const alreadyChecked = humanImpactLayerActive && (humanPressuresLandUse.reduce((acc, option) => ({
      ...acc, [option.value]: rasters[option.value]
    }), {})) || {};
    setCheckedOptions(alreadyChecked);
  }, [rasters, activeLayers])

  return (
    <Component
      alreadyChecked={checkedOptions}
      {...props}
    />
  )
} 
export default  connect(null, actions)(HumanImpactLayersContainer);
