import React, { useEffect } from 'react';
import * as d3 from 'd3';
import Slice from './slice';

import { 
  COMMUNITY_BASED,
  PROTECTED
} from 'components/landscape-sidebar/conservation-efforts-widget/conservation-efforts-widget-selectors';

const translate = (x, y) => `translate(${x}, ${y})`;

const PieChart = ({ x, y, chartData, alreadyChecked, colors }) => {
  const pie = d3.pie();

  const filteredChartData = chartData && Object.keys(chartData)
    .filter((key) => chartData[key])
    .reduce((obj, key) => {
      obj[key] = chartData[key];
      return obj;
    }, {});

  const orangeActive = alreadyChecked['Protected areas'];
  const yellowActive = alreadyChecked['Community areas'];

  const findInDOM = (id) => document.getElementById(id);
  const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);
  
  // mimic z-index in svg
  useEffect(() => {
    const svg = findInDOM('conservation-widget');
    const orangeSlice = findInDOM(colors[PROTECTED]);
    const yellowSlice = findInDOM(colors[COMMUNITY_BASED]);

    if (svg && orangeSlice) {
      if (orangeActive && yellowActive && orangeSlice && yellowSlice) {
        // bring both to front
        svg.appendChild(yellowSlice);
        svg.appendChild(orangeSlice);
      } else if (yellowActive && yellowSlice && !orangeActive) {
        svg.appendChild(yellowSlice);
      } else if (!yellowActive && orangeSlice && orangeActive) {
        svg.appendChild(orangeSlice);
      } else {
        svg.appendChild(orangeSlice);
      }
    }
  }, [orangeActive, yellowActive])

  return (
    <g id="conservation-widget" transform={translate(x, y)}>
      {filteredChartData && pie(Object.values(filteredChartData)).map((value, i) => {
        const area = getKeyByValue(filteredChartData, value.data);
        const active = (area === PROTECTED && orangeActive) ||
          (area === COMMUNITY_BASED && yellowActive);
        const correctRadius = active ? 60 : 50;
        const stroke = active ? 'white' : '';
        const strokeWidth = active ? '2' : '';

        return (
          <Slice key={i}
            outerRadius={correctRadius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            value={value}
            fill={colors[getKeyByValue(filteredChartData, value.data)]}
          />
        )})}}
    </g>
  )
}

const Pie = ({ data, alreadyChecked, colors }) => {
  return (
    <>
      <svg width="120%" height="120%">
        <PieChart x={120} y={80} chartData={data} alreadyChecked={alreadyChecked} colors={colors} />
      </svg>
    </>
  );
}

export default Pie;