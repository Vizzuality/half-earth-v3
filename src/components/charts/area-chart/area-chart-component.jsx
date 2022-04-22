import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AreaChartComponent = ({
  area1,
  area2,
  data,
  strokeDasharray = '2 4',
  gridStrokeColor = '#A0AFB8',
  tooltip = false,
  height,
  width,
}) => {

  return (
    <div style={{ width: width, height: height, margin: 0 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -30,
            bottom: 0
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
              <stop offset="20%" stopColor="#FFBF00" stopOpacity={0.4} />
              <stop offset="35%" stopColor="#A74815" stopOpacity={0.4} />
              <stop offset="45%" stopColor="#821213" stopOpacity={0.4} />
              <stop offset="55%" stopColor="#371033" stopOpacity={0.4} />
              <stop offset="65%" stopColor="#250F3B" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#1D1135" stopOpacity={0.4} />
              <stop offset="90%" stopColor="#060B2B" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <ReferenceLine y={100} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <ReferenceLine y={75} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <ReferenceLine y={50} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <ReferenceLine y={25} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <XAxis dataKey="year" fontSize={9} tickLine={false} strokeWidth={0.5} />
          <YAxis axisLine={false} fontSize={9} tickLine={false} />
          {tooltip && (
            <Tooltip />
          )}
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