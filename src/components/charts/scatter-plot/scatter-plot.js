import React, { useState } from 'react';
import Component from './scatter-plot-component';

const ScatterPlot = props => {
  const xAxisKeys = Object.keys(props.xAxisLabels);
  const [xAxisSelectedKey, setXAxisSelectedKey] = useState(xAxisKeys[0]);

  const handleSelectNextIndicator = () => {
    const currentIndex = xAxisKeys.indexOf(xAxisSelectedKey);
    if (currentIndex !== xAxisKeys.length - 1) { 
      setXAxisSelectedKey(xAxisKeys[currentIndex + 1]);
    } else {
      setXAxisSelectedKey(xAxisKeys[0]) 
    }
  }

  const handleSelectPreviousIndicator = () => {
    const currentIndex = xAxisKeys.indexOf(xAxisSelectedKey);
    if (currentIndex > 0) { 
      setXAxisSelectedKey(xAxisKeys[currentIndex - 1]);
    } else {
      setXAxisSelectedKey(xAxisKeys[xAxisKeys.length - 1]) 
    }
  }

  return (
    <Component 
      xAxisSelectedKey={xAxisSelectedKey}
      handleSelectNextIndicator={handleSelectNextIndicator}
      handleSelectPreviousIndicator={handleSelectPreviousIndicator}
      {...props}
    />
  );
}

export default ScatterPlot;