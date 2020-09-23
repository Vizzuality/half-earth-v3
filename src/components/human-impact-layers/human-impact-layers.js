import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// Component
import Component from './human-impact-layers-component';
// Constants
import { LAND_HUMAN_PRESURES_LAYERS, MARINE_HUMAN_PRESURES_LAYERS } from 'constants/layers-groups';
//Actions
import * as urlActions from 'actions/url-actions';

const checkedOptions = (options, activeLayers) => options.reduce((acc, option) => ({
  ...acc, [option]: activeLayers.some(layer => layer.title === option)
}), {});

const HumanImpactLayersContainer = props => {

  const { activeLayers } = props;

  const [checkedLandOptions, setCheckedLandOptions] = useState({});
  const [checkedMarineOptions, setCheckedMarineOptions] = useState({});

  useEffect(() => {
    const alreadyCheckedLandPressures = checkedOptions(LAND_HUMAN_PRESURES_LAYERS, activeLayers);
    setCheckedLandOptions(alreadyCheckedLandPressures);
  }, [activeLayers])

  useEffect(() => {
    const alreadyCheckedMarinePressures = checkedOptions(MARINE_HUMAN_PRESURES_LAYERS, activeLayers);
    setCheckedMarineOptions(alreadyCheckedMarinePressures);
  }, [activeLayers])

  return (
    <Component
      alreadyCheckedLandPressures={checkedLandOptions}
      alreadyCheckedMarinePressures={checkedMarineOptions}
      {...props}
    />
  )
} 
export default connect(null, urlActions)(HumanImpactLayersContainer);
