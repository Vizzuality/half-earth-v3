import React from 'react';

import AreaChart from 'components/charts/area-chart';

import COLORS from 'styles/settings';

import styles from './styles.module.scss';

const humanPressuresXAxis = (humanPressure) => {
  const nonEmptyValues =
    humanPressure &&
    humanPressure.values &&
    humanPressure.values.length > 0 &&
    humanPressure.values.some((v) => v.value && v.value !== 0);
  return (
    nonEmptyValues &&
    humanPressure.values
      .map((pressure, i) => {
        if (
          i === 0 ||
          pressure.year % 10 === 0 ||
          i === humanPressure.values.length - 1
        ) {
          return pressure.year;
        }
        return false;
      })
      .filter(Boolean)
  );
};

function HumanPressure({ chartDomain, setChartDomain, data }) {
  const PRESSURES_CHART_WIDTH = 166;
  const PRESSURES_CHART_HEIGHT = 66;
  return (
    <div className={styles.humanPressureIndicators}>
      {Object.keys(data).map((key) => {
        const humanPressure = data[key];
        const humanPressureXAxis = humanPressuresXAxis(humanPressure);
        if (
          humanPressureXAxis &&
          (Math.min(...humanPressureXAxis) < chartDomain[0] ||
            Math.max(...humanPressureXAxis) > chartDomain[1])
        ) {
          setChartDomain([
            Math.min(...humanPressureXAxis, chartDomain[0]),
            Math.max(...humanPressureXAxis, chartDomain[1]),
          ]);
        }
        if (
          !humanPressure ||
          !humanPressureXAxis ||
          humanPressure.values.every((py) => py.value === 0)
        ) {
          return null;
        }
        // Cap value to 100 as more than 100 is only caused by errors on the calculations
        const humanPressureValues = humanPressure.values.map((v) => ({
          year: v.year,
          value: v.value > 100 ? 100 : v.value,
        }));

        const lastHumanPressure =
          humanPressureValues[humanPressureValues.length - 1];
        const getLastHumanPressureValue = () => {
          return lastHumanPressure.value > 1
            ? Math.trunc(lastHumanPressure.value)
            : '<1';
        };
        return (
          <div className={styles.humanPressureIndicator}>
            <p className={styles.title}>{humanPressure.title}</p>

            <p className={styles.percentage}>{getLastHumanPressureValue()}%</p>
            <div className={styles.hpChartContainer}>
              <AreaChart
                area={{
                  key: 'value',
                  stroke: COLORS.gold,
                  fill: 'url(#gradientColor)',
                  strokeWidth: 2,
                  type: 'natural',
                }}
                data={humanPressureValues}
                xTicks={humanPressureXAxis}
                margin={{
                  top: 0,
                  right: 0,
                  left: -PRESSURES_CHART_WIDTH,
                  bottom: 0,
                }}
                height={PRESSURES_CHART_HEIGHT}
                width={PRESSURES_CHART_WIDTH}
                domain={chartDomain}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HumanPressure;
