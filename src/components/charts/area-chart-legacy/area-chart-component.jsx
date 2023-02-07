import React from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label,
} from 'recharts';

import styles from './area-chart-styles.module.scss';

function AreaChartLegacy({
  area1,
  area2,
  data,
  height,
  margin = {
    top: 0,
    right: 0,
    left: -30,
    bottom: 0,
  },
  xTicks = [1980, 2000, 2020],
  tooltip = false,
  tooltipContent,
  pdf = false,
  width,
}) {
  const lastData =
    (area1.label || area2.label) && data && data[data.length - 1];

  const renderLabel = (area) => {
    const lastAreaY =
      lastData && area.key && lastData[area.key] && lastData[area.key][0];
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
          fill="white"
        />
      </ReferenceDot>
    );
  };

  const renderAreaChart = () => (
    <AreaChart
      data={data}
      margin={margin}
      width={pdf && width}
      height={pdf && height}
    >
      <XAxis
        axisLine={{ stroke: '#0F2B3B' }}
        dataKey="year"
        domain={['dataMin', 'dataMax']}
        fontSize={9}
        strokeWidth={0.9}
        tick={{ stroke: '#A0AFB8', strokeWidth: 0.4 }}
        tickCount={xTicks.length}
        tickLine={false}
        ticks={xTicks}
        type="number"
      />

      <YAxis
        axisLine={{
          stroke: '#0F2B3B',
        }}
        domain={[0, 100]}
        fontSize={9}
        tick={{ stroke: '#A0AFB8', strokeWidth: 0.4 }}
        tickCount={3}
        tickLine={false}
      />

      <YAxis
        axisLine={false}
        domain={[0, 100]}
        fontSize={9}
        tick={false}
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
        type={area1.type}
        dataKey={area1.key}
        fill={area1.fill}
        stroke={area1.stroke}
        strokeWidth={area1.strokeWidth}
      />
      {area1.label && renderLabel(area1)}
      {area2.label && renderLabel(area2)}
      <Area
        type="monotone"
        dataKey={area2.key}
        fill={area2.fill}
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

export default AreaChartLegacy;
