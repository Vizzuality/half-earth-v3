import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// Component
import Component from './human-impact-layers-component';
// Constants
import { LAND_HUMAN_PRESURES_LAYERS } from 'constants/layers-groups';
//Actions
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };


const HumanImpactLayersContainer = props => {

  const { activeLayers } = props;

  const [checkedOptions, setCheckedOptions] = useState({});

  useEffect(() => {
    const alreadyChecked = LAND_HUMAN_PRESURES_LAYERS.reduce((acc, option) => ({
      ...acc, [option]: activeLayers.some(layer => layer.title === option)
    }), {});
    setCheckedOptions(alreadyChecked);
  }, [activeLayers])

  return (
    <Component
      alreadyChecked={checkedOptions}
      {...props}
    />
  )
} 
export default connect(null, actions)(HumanImpactLayersContainer);
