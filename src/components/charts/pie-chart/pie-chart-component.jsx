import React from 'react';
import * as d3 from 'd3-shape';
import { getKeyByValue } from 'utils/generic-functions';
import Slice from '../shapes/slice';

const translate = (x, y) => `translate(${x}, ${y})`;

const PieChart = ({
  width,
  height,
  id,
  data,
  explodedSlices,
  colors,
  regularSliceR = 60,
  explodingSliceR = 70,
  explodingSliceStroke = 'white'
}) => {
  const pie = d3.pie();

  return (
    <svg width={width} height={height}>
      <g id={id} transform={translate(width/2, height/2)}>
        {data && pie(Object.values(data)).map((value, i) => {
          const area = getKeyByValue(data, value.data);
          const active = explodedSlices[area];

          const radius = active ? explodingSliceR : regularSliceR;
          const stroke = active ? explodingSliceStroke : '';
          const strokeWidth = active ? '2' : '';

          return (
            <Slice
              key={i}
              outerRadius={radius}
              stroke={stroke}
              strokeWidth={strokeWidth}
              value={value}
              fill={colors[area]}
            />
          )})}
      </g>
    </svg>
  )
}

export default PieChart;