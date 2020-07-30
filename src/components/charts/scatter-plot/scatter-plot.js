import React from 'react';
import Component from './scatter-plot-component';

const ScatterPlot = props => {
  const dataset = [];  // Initialize empty array
  const numDataPoints = 300;  // Number of dummy data points
  const maxRange = Math.random() * 1000;  // Max range of new values
  for(var i=0; i<numDataPoints; i++) {
    var newNumber1 = Math.floor(Math.random() * maxRange);  // New random integer
    var newNumber2 = Math.floor(Math.random() * maxRange);  // New random integer
    dataset.push([newNumber1, newNumber2]);  // Add new number to array
  };

  return <Component data={dataset} {...props} />
}

export default ScatterPlot;