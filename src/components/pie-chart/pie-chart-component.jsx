import React from 'react';
import * as  d3 from 'd3-shape';
import { getKeyByValue } from 'utils/generic-functions';
import Slice from './slice';

const translate = (x, y) => `translate(${x}, ${y})`;
const EXPLODING_SLICE_RADIUS = 60;
const REGULAR_RADIUS = 50;
const EXPLODING_SLICE_STROKE = 'white';
const EXPLODING_SLICE_STROKE_WIDTH = '2';

const PieChart = ({ x, y, chartData, alreadyChecked, activeSlices, colors }) => {
  const pie = d3.pie();

  // remove the zero values
  const filteredChartData = chartData && Object.keys(chartData)
    .filter((key) => chartData[key])
    .reduce((obj, key) => {
      obj[key] = chartData[key];
      return obj;
    }, {});

  return (
    <g id="conservation-widget" transform={translate(x, y)}>
      {filteredChartData && pie(Object.values(filteredChartData)).map((value, i) => {
        const area = getKeyByValue(filteredChartData, value.data);
        const active = activeSlices[area];

        const radius = active ? EXPLODING_SLICE_RADIUS : REGULAR_RADIUS;
        const stroke = active ? EXPLODING_SLICE_STROKE : '';
        const strokeWidth = active ? EXPLODING_SLICE_STROKE_WIDTH : '';

        return (
          <Slice 
            key={i}
            outerRadius={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            value={value}
            fill={colors[getKeyByValue(filteredChartData, value.data)]}
          />
        )})}}
    </g>
  )
}

const Pie = ({ data, alreadyChecked, activeSlices, colors }) => {
  return (
    <>
      <svg width="120%" height="120%">
        <PieChart 
          x={120}
          y={80}
          chartData={data}
          alreadyChecked={alreadyChecked}
          activeSlices={activeSlices}
          colors={colors} 
        />
      </svg>
    </>
  );
}

export default Pie;