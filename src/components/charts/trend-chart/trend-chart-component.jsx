import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label,
} from 'recharts';

import styles from './trend-chart-styles.module.scss';

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
  const labelColor = variant === 'light' ? 'white' : variant;

  const lastData =
    (area1.label || area2.label) && data && data[data.length - 1];

  const renderLabel = (area) => {
    const lastAreaY = lastData && area.key && lastData[area.key];
    if (!lastAreaY && lastAreaY !== 0) return null;
    return (
      <ReferenceDot
        y={lastAreaY}
        x={2020}
        stroke="transparent"
        fill="transparent"
      >
        <Label
          style={
            area.labelOffset && {
              transform: `translate(${area.labelOffset}px, 0)`,
            }
          }
          className={styles.label}
          value={area.label}
          position="insideTop"
          offset={-5}
          fill={labelColor}
        />
      </ReferenceDot>
    );
  };

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
        tickCount={3}
        tickLine={false}
        ticks={[1980, 2000, 2020]}
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
          cursor={{ strokeDasharray: 1 }}
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
      {area1.label && renderLabel(area1)}
      {area2.label && renderLabel(area2)}
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
