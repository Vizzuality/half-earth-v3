import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const DonutChart = ({
  chartXPosition,
  chartYPosition,
  colors,
  data,
  height,
  innerRadius,
  legendXPosition,
  legendYPosition,
  legendValue,
  legendText,
  outerRadius,
  width,
}) => {
  return (
    <PieChart width={width} height={height}>
      {/* Background pie added to avoid corner radius on total value */}
      <Pie
        data={[{ name: 'Rest', value: 100 }]}
        cx={chartXPosition}
        cy={chartYPosition}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        stroke="none"
      >
        <Cell fill={'#E9E9E9'} />
      </Pie>
      <Pie
        data={data}
        cx={chartXPosition}
        cy={chartYPosition}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        stroke="none"
        dataKey="value"
        cornerRadius={10}
        startAngle={90}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>

      <text
        font-family="ivypresto-display"
        font-size="32"
        font-weight={400}
        x={legendXPosition}
        y={legendYPosition}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {legendValue && legendValue.toFixed()}
      </text>
      <text
        font-family="Inter"
        font-size="12"
        font-weight={300}
        x={legendXPosition}
        y={legendYPosition + 25}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {legendText}
      </text>
    </PieChart>
  );
};

export default DonutChart;
