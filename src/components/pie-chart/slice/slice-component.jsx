import React from 'react';
import * as  d3 from 'd3-shape';

const Slice = ({ value, fill, innerRadius = 0, outerRadius = 50, stroke, strokeWidth }) => {
  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  return (
    <path id={fill} d={arc(value)} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
  );
}

export default Slice;