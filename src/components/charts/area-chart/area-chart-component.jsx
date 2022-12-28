import React from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

function AreaChartComponent({
  area1,
  area2,
  data,
  tooltip = false,
  tooltipContent,
  height,
  width,
}) {
  return (
    <div style={{ width, height, margin: 0 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -30,
            bottom: 0,
          }}
        >
          <XAxis
            axisLine={{ stroke: '#0F2B3B' }}
            dataKey="year"
            domain={['dataMin', 'dataMax']}
            fontSize={9}
            strokeWidth={0.9}
            tick={{ stroke: 'white', strokeWidth: 0.4 }}
            tickCount={3}
            tickLine={false}
            ticks={[1980, 2000, 2020]}
            type="number"
          />
          <YAxis
            axisLine={{ stroke: '#0F2B3B' }}
            fontSize={9}
            tick={{ stroke: 'white', strokeWidth: 0.4 }}
            tickCount={3}
            tickLine={false}
          />
          {tooltip && (
            <RechartsTooltip
              content={tooltipContent}
              offset={0}
              position={{ y: 0 }}
            />
          )}
          <Area
            type="linearOpen"
            dataKey={area1.key}
            fill="url(#colorUv)"
            stroke={area1.stroke}
            strokeWidth={area1.strokeWidth}
          />
          <Area
            type="monotone"
            dataKey={area2.key}
            fill={area2.fill}
            fillOpacity={area2.fillOpacity}
            stroke={area2.stroke}
            strokeWidth={area2.strokeWidth}
            strokeDasharray={area2.strokeDasharray}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartComponent;
