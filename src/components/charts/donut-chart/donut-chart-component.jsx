import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const DonutChart = ({
  colors,
  data,
  height,
  innerRadius,
  outerRadius,
  width
}) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}

      </Pie>
      <text x={100} y={200} textAnchor="middle" dominantBaseline="middle">
        55%
      </text>
    </PieChart>
  );
}


export default DonutChart;