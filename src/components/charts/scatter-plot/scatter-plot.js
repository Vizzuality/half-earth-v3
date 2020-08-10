import React, { useState } from 'react';
import { connect } from 'react-redux';
import Component from './scatter-plot-component';
import * as urlActions from 'actions/url-actions';

const ScatterPlot = props => {
  const xAxisKeys = Object.keys(props.xAxisLabels);

  const handleSelectNextIndicator = () => {
    const { changeUI, countryChallengesSelectedKey } = props;
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex !== xAxisKeys.length - 1) { 
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex + 1] });
    } else {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[0] });
    }
  }
  
  const handleSelectPreviousIndicator = () => {
    const { changeUI, countryChallengesSelectedKey } = props;
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex > 0) {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex - 1] });
    } else {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[xAxisKeys.length - 1] });
    }
  }

  return (
    <Component
      handleSelectNextIndicator={handleSelectNextIndicator}
      handleSelectPreviousIndicator={handleSelectPreviousIndicator}
      {...props}
    />
  );
}

export default connect(null, urlActions)(ScatterPlot);