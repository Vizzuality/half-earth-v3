import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const DonutChart = ({
  chartXPosition,
  chartYPosition,
  colors,
  data,
  height,
  innerRadius,
  legendXPosition,
  legendYPosition,
  outerRadius,
  width
}) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={chartXPosition}
        cy={chartYPosition}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill="#E9E9E9"
        dataKey="value"
        cornerRadius={10}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}

      </Pie>

      <text
        font-size="32"
        x={legendXPosition}
        y={legendYPosition}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        45
      </text>
      <text
        font-size="12"
        x={legendXPosition}
        y={legendYPosition}
        textAnchor="middle"
        dominantBaseline="middle"
        textLength={60}>
        LAND SPI
      </text>

    </PieChart >
  );
}


export default DonutChart;