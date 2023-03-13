import React, { useMemo } from 'react';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import styles from './area-chart-styles.module.scss';

function CustomizedAxisTick(props) {
  const { x = 0, y, payload, firstTick, lastTick } = props;

  const tickAnchor = useMemo(() => {
    if (payload.value === lastTick) return 'end';
    if (payload.value === firstTick) return 'start';
    return 'middle';
  }, [payload.value]);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor={tickAnchor}
        className={styles.xAxisTick}
      >
        {payload.value}
      </text>
    </g>
  );
}
function AreaChartComponent({
  area,
  data,
  height,
  margin,
  xTicks,
  width,
  pdf = false,
  domain = [1990, 2020],
}) {
  const renderAreaChart = () => (
    <AreaChart data={data} margin={margin} width={width} height={height}>
      <defs>
        <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={area.stroke} stopOpacity={0.2} />
          <stop offset="95%" stopColor={area.stroke} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <XAxis
        axisLine={false}
        dataKey="year"
        // first number of domain is 20 years below the range for all numbers to fit on the axis
        domain={[domain[0] - 20, domain[1]]}
        fontSize={9}
        strokeWidth={2}
        tickCount={xTicks.length}
        tickLine={false}
        ticks={xTicks}
        type="number"
        interval={0}
        tick={
          <CustomizedAxisTick
            firstTick={xTicks[0]}
            lastTick={xTicks[xTicks.length - 1]}
          />
        }
      />

      <YAxis
        axisLine={false}
        domain={[0, 100]}
        fontSize={9}
        tick={false}
        tickLine={false}
      />

      <Area
        type={area.type}
        dataKey={area.key}
        fill={area.fill}
        stroke={area.stroke}
        strokeWidth={area.strokeWidth}
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
