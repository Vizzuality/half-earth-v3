import React from 'react';

import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';

import COLORS from 'styles/settings';

// import styles from './arc-chart-styles.module.scss';

function ArcChartComponent({
  color = COLORS['protected-areas'],
  paPercentage = 30,
  strokeWidth = 8,
}) {
  const DATA = [{ percentage: paPercentage / 10, fill: color }];
  return (
    <ResponsiveContainer width="95%" aspect={1}>
      <RadialBarChart
        width={243}
        height={243}
        data={DATA}
        // cx={30}
        // cy={30}
        innerRadius={25}
        // outerRadius={300}
        barSize={strokeWidth}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 10]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          dataKey="percentage"
          cornerRadius={30 / 2}
          fill={COLORS['athens-gray']}
        />

        {/* <text
        x={30 / 2}
        y={33 / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="progress-label"
      >
        89
      </text> */}
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default ArcChartComponent;
