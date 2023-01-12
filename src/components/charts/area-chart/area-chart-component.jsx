import React from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

import styles from './area-chart-styles.module.scss';

function AreaChartComponent({
  area1,
  area2,
  data,
  tooltip = false,
  tooltipContent,
  height,
  width,
  variant = 'light',
  pdf = false,
}) {
  const tickStroke = variant === 'light' ? 'white' : variant;

  const renderAreaChart = () => (
    <AreaChart
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: -30,
        bottom: 0,
      }}
      width={pdf && width}
      height={pdf && height}
    >
      <XAxis
        axisLine={{ stroke: variant === 'light' ? '#0F2B3B' : 'white' }}
        dataKey="year"
        domain={['dataMin', 'dataMax']}
        fontSize={9}
        strokeWidth={0.9}
        tick={{ stroke: tickStroke, strokeWidth: 0.4 }}
        tickCount={3}
        tickLine={false}
        ticks={[1980, 2000, 2020]}
        type="number"
      />

      <YAxis
        axisLine={{ stroke: '#0F2B3B' }}
        fontSize={9}
        tick={{ stroke: tickStroke, strokeWidth: 0.4 }}
        tickCount={3}
        tickLine={false}
      />
      {tooltip && (
        <RechartsTooltip
          content={tooltipContent}
          cursor={{ strokeDasharray: 1 }}
          offset={0}
          position={{ y: 0 }}
        />
      )}
      <Area
        type="linearOpen"
        dataKey={area1.key}
        fill="url(#colorUv)"
        stroke={area1.stroke}
        strokeWidth={area1.strokeWidth}
      />
      <Area
        type="monotone"
        dataKey={area2.key}
        fill="url(#colorUv)"
        fillOpacity={area2.fillOpacity}
        stroke={area2.stroke}
        strokeWidth={area2.strokeWidth}
        strokeDasharray={area2.strokeDasharray}
      />
    </AreaChart>
  );

  return (
    <div className={styles.areaChart} style={{ width, height }}>
      {pdf ? (
        renderAreaChart()
      ) : (
        <ResponsiveContainer>{renderAreaChart()}</ResponsiveContainer>
      )}
    </div>
  );
}

export default AreaChartComponent;
