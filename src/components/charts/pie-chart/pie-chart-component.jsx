import React from 'react';
import * as d3 from 'd3-shape';
import Slice from '../shapes/slice';

const translate = (x, y) => `translate(${x}, ${y})`;

const PieChart = ({
  className,
  width,
  height,
  id,
  data,
  regularSliceR = 60,
  explodingSliceR = 70,
  explodingSliceStroke = 'white'
}) => {
  const pie = d3.pie().value(d => d.value).sort((a, b) => b.index - a.index);
  return (
    <svg width={width} height={height} className={className}>
      <g id={id} transform={translate(width/2, height/2)}>
        {data && pie(data).map((value, i) => {
          const exploded = data[i]['explodedSlice'];

          const radius = exploded ? explodingSliceR : regularSliceR;
          const stroke = exploded ? explodingSliceStroke : data[i].color;
          const strokeWidth = exploded ? '2' : 'none';

          return (
            <Slice
              key={i}
              outerRadius={radius}
              stroke={stroke}
              strokeWidth={strokeWidth}
              value={value}
              fill={data[i].color}
            />
          )})}
      </g>
    </svg>
  )
}

export default PieChart;