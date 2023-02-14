import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Text,
} from 'recharts';

import styles from './trend-chart-styles.module.scss';

function CustomCursor(props) {
  const { payload, points, chartHeight } = props;
  const { year } = (payload && payload[0] && payload[0].payload) || {};
  const { x } = points && points[0];

  // Correction to show last points
  const correctionPadding = year > 2019 ? 30 : 0;
  return (
    <g>
      <line
        x1={x}
        x2={x}
        y1="0"
        y2={chartHeight - 30}
        className={styles.cursorLine}
      />
      <Line y={year} stroke="green" label="Min PAGE" />
      <Text
        x={x - correctionPadding}
        y={chartHeight}
        className={styles.cursorText}
      >
        {year}
      </Text>
    </g>
  );
}

function TrendChartComponent({
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

  const renderLineChart = () => (
    <LineChart
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
        tickCount={5}
        tickLine={false}
        ticks={[1980, 1990, 2000, 2010, 2020]}
        type="number"
      />

      <YAxis
        axisLine={{ stroke: '#0F2B3B' }}
        domain={[0, 100]}
        fontSize={9}
        tick={{ stroke: tickStroke, strokeWidth: 0.4 }}
        tickCount={3}
        tickLine={false}
      />
      {tooltip && (
        <RechartsTooltip
          content={tooltipContent}
          cursor={<CustomCursor chartHeight={height} />}
          offset={0}
          position={{ y: 0 }}
        />
      )}
      <Line
        type="linearOpen"
        dataKey={area1.key}
        fill="url(#colorUv)"
        stroke={area1.stroke}
        strokeWidth={area1.strokeWidth}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey={area2.key}
        fill="url(#colorUv)"
        fillOpacity={area2.fillOpacity}
        stroke={area2.stroke}
        strokeWidth={area2.strokeWidth}
        strokeDasharray={area2.strokeDasharray}
        dot={false}
      />
    </LineChart>
  );

  return (
    <div className={styles.trendChart} style={{ width, height }}>
      {pdf ? (
        renderLineChart()
      ) : (
        <ResponsiveContainer>{renderLineChart()}</ResponsiveContainer>
      )}
    </div>
  );
}

export default TrendChartComponent;
