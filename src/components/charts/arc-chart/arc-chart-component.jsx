import React from 'react';

import COLORS from 'styles/settings';

// import styles from './arc-chart-styles.module.scss';

function ArcChartComponent({
  color = COLORS['protected-areas'],
  paPercentage = 30,
  strokeWidth = 10,
}) {
  const getStrokeDasharray = () => {
    const strokeDasharray = `${(240 * paPercentage) / 100} 300`;
    return strokeDasharray;
  };

  return (
    <div>
      <svg id="paths" style={{ width: 320, height: 150 }}>
        <path
          d="M100 100 A 40 40 90 0 1 250 100"
          style={{
            fill: 'transparent',
            fillOpacity: 1,
            stroke: COLORS['athens-gray'],
            strokeWidth,
            strokeLinecap: 'round',
          }}
        />
        <path
          d="M100 100 A 40 40 90 0 1 250 100"
          style={{
            fill: 'transparent',
            fillOpacity: 1,
            stroke: color,
            strokeDasharray: getStrokeDasharray(),
            strokeWidth,
            strokeLinecap: 'round',
          }}
        />
      </svg>
    </div>
  );
}

export default ArcChartComponent;
