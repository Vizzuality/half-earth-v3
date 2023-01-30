import React from 'react';

import { AxisLeft } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridRadial, GridAngle } from '@visx/grid';
import { Group } from '@visx/group';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { scaleTime, scaleLog } from '@visx/scale';
import type { NumberLike } from '@visx/scale';

import type { LineRadialProps } from './index.d';

const green = '#e5fd3d';
export const blue = '#aeeef8';
const darkgreen = '#dff84d';
export const background = '#744cca';
const strokeColor = '#744cca';

// utils
function extent<Datum>(data: Datum[], value: (d: Datum) => number) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

// accessors
const date = (d: AppleStock) => new Date(d.date).valueOf();
const close = (d: AppleStock) => d.close;
const formatTicks = (val: NumberLike) => String(val);

// scales
const xScale = scaleTime({
  range: [-Math.PI / 2, Math.PI / 2],
  domain: extent(appleStock, date),
});
const yScale = scaleLog<number>({
  domain: extent(appleStock, close),
});

const padding = 20;

const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

function SrsChart({ width, height }: LineRadialProps) {
  if (width < 10) return null;

  // Update scale output to match component dimensions
  yScale.range([0, height / 2 - padding]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  return (
    <svg width={width} height={height}>
      <LinearGradient from={green} to={blue} id="line-gradient" />
      <rect width={width} height={height} fill={background} rx={14} />
      <Group top={height / 2} left={width / 2}>
        <GridAngle
          scale={xScale}
          outerRadius={height / 2 - padding}
          stroke={green}
          strokeWidth={1}
          strokeOpacity={0.3}
          strokeDasharray="5,2"
          numTicks={20}
        />
        <GridRadial
          startAngle={-Math.PI / 2}
          endAngle={Math.PI / 2}
          scale={yScale}
          numTicks={5}
          stroke={blue}
          strokeWidth={1}
          fill={blue}
          fillOpacity={0.1}
          strokeOpacity={0.2}
        />
        <AxisLeft
          top={-height / 2 + padding}
          scale={reverseYScale}
          numTicks={5}
          tickStroke="none"
          tickLabelProps={() => ({
            fontSize: 8,
            fill: blue,
            fillOpacity: 1,
            textAnchor: 'middle',
            dx: '1em',
            dy: '-0.5em',
            stroke: strokeColor,
            strokeWidth: 0.5,
            paintOrder: 'stroke',
          })}
          tickFormat={formatTicks}
          hideAxisLine
        />
        {[firstPoint, lastPoint].map((d, i) => {
          const cx = ((xScale(date(d)) ?? 0) * Math.PI) / 180;
          const cy = -(yScale(close(d)) ?? 0);
          return (
            <circle
              // eslint-disable-next-line react/no-array-index-key
              key={`line-cap-${i}`}
              cx={cx}
              cy={cy}
              fill={darkgreen}
              r={3}
            />
          );
        })}
      </Group>
    </svg>
  );
}

export default SrsChart;
