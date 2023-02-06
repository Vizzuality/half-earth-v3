import React from 'react';

import STYLES from 'styles/settings';

// import styles from './arc-chart-styles.module.scss';

function ArcChartComponent({
  color = STYLES['protected-areas'],
  paPercentage = 30,
  strokeWidth = 8,
}) {
  const getStrokeDasharray = () => {
    const strokeDasharray = `${(240 * paPercentage) / 100} 300`;
    return strokeDasharray;
  };

  return (
    <div>
      <svg
        id="paths"
        style={{
          width: 270,
          height: 150,
          transform: 'scale(1.2)',
          border: '1px solid red',
        }}
      >
        <path
          d="M100 100 A 40 40 90 0 1 250 100"
          style={{
            fill: 'transparent',
            fillOpacity: 1,
            stroke: STYLES['athens-gray'],
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
        <text
          x="175"
          y="70"
          fill="black"
          textAnchor="middle"
          fontSize="24px"
          fontFamily={STYLES['font-family-serif']}
          fontWeight="lighter"
        >
          {paPercentage}%
        </text>
      </svg>
    </div>
  );
}

export default ArcChartComponent;
