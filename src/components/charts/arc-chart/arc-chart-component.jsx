import React from 'react';

import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';

import STYLES from 'styles/settings';

// import styles from './arc-chart-styles.module.scss';

function ArcChartComponent({
  color = STYLES['protected-areas'],
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
          fill={STYLES['athens-gray']}
        />
        {paPercentage && (
          <>
            <text
              x={parentWidth / 2}
              y={parentHeight / 2 + 28}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={45}
              fontFamily={STYLES['font-family-serif']}
              fontWeight="lighter"
            >
              {paPercentage.toFixed()}
            </text>
            <text
              x={parentWidth / 2 + 14}
              y={parentHeight / 2 + 33.5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={24}
              fontFamily={STYLES['font-family-serif']}
              fontWeight="lighter"
            >
              %
            </text>
          </>
        )}
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default ArcChartComponent;
