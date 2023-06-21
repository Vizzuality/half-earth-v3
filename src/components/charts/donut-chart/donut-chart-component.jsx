import React from 'react';

import { PieChart, Pie, Cell } from 'recharts';

function DonutChart({
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
}) {
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
        isAnimationActive={false}
      >
        <Cell fill="#E9E9E9" />
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
        endAngle={-90}
      >
        {data.map((entry, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <text
        fontSize="32"
        fontWeight={700}
        x={legendXPosition}
        y={legendYPosition}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {legendValue &&
          legendValue.toFixed(legendValue > 1 || legendValue === 0 ? 0 : 1)}
      </text>
      <text
        fontFamily="Inter"
        fontSize="12"
        fontWeight={300}
        x={legendXPosition}
        y={legendYPosition + 25}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {legendText}
      </text>
    </PieChart>
  );
}

export default DonutChart;
