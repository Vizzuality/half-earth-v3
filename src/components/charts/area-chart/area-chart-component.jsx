import React from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function AreaChartComponent({
  area1,
  area2,
  data,
  strokeDasharray = '2 4',
  gridStrokeColor = '#A0AFB8',
  tooltip = false,
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
          {area1 && (
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
                <stop
                  offset="20%"
                  stopColor={area1.fill[0]}
                  stopOpacity={area1.fillOpacity}
                />
                <stop
                  offset="35%"
                  stopColor={area1.fill[1]}
                  stopOpacity={area1.fillOpacity}
                />
                <stop
                  offset="45%"
                  stopColor={area1.fill[2]}
                  stopOpacity={area1.fillOpacity}
                />
                <stop
                  offset="55%"
                  stopColor={area1.fill[3]}
                  stopOpacity={area1.fillOpacity}
                />
                <stop
                  offset="65%"
                  stopColor={area1.fill[4]}
                  stopOpacity={area1.fillOpacity}
                />
                <stop
                  offset="75%"
                  stopColor={area1.fill[5]}
                  stopOpacity={area1.fillOpacity}
                />
                <stop
                  offset="90%"
                  stopColor={area1.fill[6]}
                  stopOpacity={area1.fillOpacity}
                />
              </linearGradient>
            </defs>
          )}
          <ReferenceLine
            y={60}
            stroke={gridStrokeColor}
            strokeDasharray={strokeDasharray}
          />
          <ReferenceLine
            y={45}
            stroke={gridStrokeColor}
            strokeDasharray={strokeDasharray}
          />
          <ReferenceLine
            y={30}
            stroke={gridStrokeColor}
            strokeDasharray={strokeDasharray}
          />
          <ReferenceLine
            y={15}
            stroke={gridStrokeColor}
            strokeDasharray={strokeDasharray}
          />
          <XAxis
            dataKey="year"
            fontSize={9}
            tickLine={false}
            strokeWidth={0.5}
          />
          <YAxis axisLine={false} fontSize={9} tickLine={false} />
          {tooltip && <Tooltip />}
          <Area
            type="monotone"
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
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartComponent;
