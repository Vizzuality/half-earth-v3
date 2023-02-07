import React from 'react';

import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';

import COLORS from 'styles/settings';

import styles from './arc-chart-styles.module.scss';

function ArcChartComponent({
  color = COLORS['protected-areas'],
  parentHeight,
  parentWidth,
  paPercentage,
  strokeWidth = 8,
}) {
  const DATA = [{ percentage: paPercentage / 10, fill: color }];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        width="100%"
        height="100%"
        data={DATA}
        cy={100}
        innerRadius={94}
        outerRadius={180}
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
        {paPercentage && (
          <text
            x={parentWidth / 2 + 6}
            y={parentHeight / 2 + 40}
            className={styles.label}
          >
            {paPercentage.toFixed()}
            <tspan className={styles.labelPercentage}>%</tspan>
          </text>
        )}
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default ArcChartComponent;
