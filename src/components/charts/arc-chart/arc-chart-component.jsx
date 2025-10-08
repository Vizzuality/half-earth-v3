import PropTypes from 'prop-types';

import { getCSSVariable } from 'utils/css-utils';

import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';

import styles from './arc-chart-styles.module.scss';

function ArcChartComponent({
  color = getCSSVariable('protected-areas'),
  parentHeight,
  parentWidth,
  value,
  isPercentage,
  strokeWidth = 8,
}) {
  const DATA = [{ percentage: value / 10, fill: color }];
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
          fill={getCSSVariable('athens-gray')}
        />
        {value && (
          <text
            x={parentWidth / 2 + (isPercentage ? 6 : 0)}
            y={parentHeight / 2 + 40}
            className={styles.label}
          >
            {Math.round(value)}
            {isPercentage && (
              <tspan className={styles.labelPercentage}>%</tspan>
            )}
          </text>
        )}
        {!value && (
          <text
            x={parentWidth / 2 + (isPercentage ? 6 : 0)}
            y={parentHeight / 2 + 40}
            className={styles.label}
          >
            0
            {isPercentage && (
              <tspan className={styles.labelPercentage}>%</tspan>
            )}
          </text>
        )}
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default ArcChartComponent;

ArcChartComponent.propTypes = {
  color: PropTypes.string,
  parentHeight: PropTypes.number,
  parentWidth: PropTypes.number,
  value: PropTypes.number.isRequired,
  isPercentage: PropTypes.bool,
  strokeWidth: PropTypes.number,
};

ArcChartComponent.defaultProps = {
  color: getCSSVariable('protected-areas'),
  parentHeight: 100,
  parentWidth: 320,
  isPercentage: false,
  strokeWidth: 8,
};
