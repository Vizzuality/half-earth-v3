import React from 'react';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import styles from './area-chart-styles.module.scss';

function CustomizedAxisTick(props) {
  const { x = 0, y, payload, lastTick } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor={payload.value === lastTick ? 'middle' : 'start'}
        className={styles.xAxisTick}
      >
        {payload.value}
      </text>
    </g>
  );
}
function AreaChartComponent({
  area1,
  data,
  height,
  margin,
  xTicks,
  width,
  pdf = false,
}) {
  const renderAreaChart = () => (
    <AreaChart data={data} margin={margin} width={width} height={height}>
      <XAxis
        axisLine={false}
        dataKey="year"
        domain={[1975, 2020]}
        fontSize={9}
        strokeWidth={2}
        tickCount={xTicks.length}
        tickLine={false}
        ticks={xTicks}
        type="number"
        tick={<CustomizedAxisTick lastTick={xTicks[xTicks.length - 1]} />}
      />

      <YAxis
        axisLine={false}
        domain={[0, 100]}
        fontSize={9}
        tick={false}
        tickLine={false}
      />

      <Area
        type={area1.type}
        dataKey={area1.key}
        fill={area1.fill}
        stroke={area1.stroke}
        strokeWidth={area1.strokeWidth}
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
