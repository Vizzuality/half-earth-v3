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

const data = [
  {
    year: "1980",
    species: [40, 30],
    areas: [20, 10]
  },
  {
    year: "1985",
    species: [75, 10],
    areas: [30, 10]
  },
  {
    year: "1990",
    species: [50, 40],
    areas: [20, 10]
  },
  {
    year: "1995",
    species: [55, 50],
    areas: [20, 10]
  },
  {
    year: "2000",
    species: [45, 35],
    areas: [20, 20]
  },
  {
    year: "2005",
    species: [55, 35],
    areas: [40, 10]
  },
  {
    year: "2010",
    species: [70, 60],
    areas: [30, 10]
  },
  {
    year: "2015",
    species: [55, 55],
    areas: [60, 40]
  },
  {
    year: "2020",
    species: [100, 60],
    areas: [70, 50]
  }
];

const AreaChartComponent = ({
  area1 = { key: "species", stroke: "#8884d8" },
  area2 = { key: "areas", stroke: "#008f39", fill: "#008f39", fillOpacity: 0.4 },
  strokeDasharray = 3,
  gridStrokeColor = '#A0AFB8',
  height = 200,
  width = '100%'
}) => {

  return (
    <div style={{ width: width, height: height, margin: 0 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -40,
            bottom: 0
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
              <stop offset="15%" stopColor="#FFBF00" stopOpacity={0.4} />
              <stop offset="25%" stopColor="#A74815" stopOpacity={0.4} />
              <stop offset="35%" stopColor="#821213" stopOpacity={0.4} />
              <stop offset="45%" stopColor="#371033" stopOpacity={0.4} />
              <stop offset="55%" stopColor="#250F3B" stopOpacity={0.4} />
              <stop offset="65%" stopColor="#1D1135" stopOpacity={0.4} />
              <stop offset="85%" stopColor="#060B2B" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <ReferenceLine y={100} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <ReferenceLine y={75} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <ReferenceLine y={50} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <ReferenceLine y={25} stroke={gridStrokeColor} strokeDasharray={strokeDasharray} />
          <XAxis dataKey="year" fontSize={9} tickLine={false} strokeWidth={0.5} />
          <YAxis axisLine={false} fontSize={9} tickLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={area1.key}
            stroke={area1.stroke}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey={area2.key}
            stroke={area2.stroke}
            fill={area2.fill}
            fillOpacity={area2.fillOpacity}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

  );
}

export default AreaChartComponent;