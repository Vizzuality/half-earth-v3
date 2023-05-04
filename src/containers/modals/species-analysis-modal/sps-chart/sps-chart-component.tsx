/* eslint-disable camelcase */
import React, { useMemo, useState } from 'react';

import cx from 'classnames';

import COLORS from 'styles/settings.scss';

import styles from './styles.module.scss';

import { useD3Effect } from './sps-chart-hooks';
import { SPSChartProps } from './types';

// To avoid the cut points at the bottom
const HEIGHT_PADDING = 10;

function SpsChart({
  width,
  data,
  selectedSpecies,
  SPSSelected,
  globalRangeSelected,
  speciesData,
  setSpecieById,
}: SPSChartProps) {
  const [tooltipPosition, setTooltipPosition] = useState<
    { top: number; left: number } | undefined
  >();
  const [tooltipText, setTooltipText] = useState<string | undefined>();
  const { id: selectedSpeciesId }: { id: string } = selectedSpecies;
  const height: number = useMemo(() => width / 2 + HEIGHT_PADDING, [width]);
  if (!data) return null;

  useD3Effect({
    width,
    selectedSpeciesId,
    SPSSelected,
    globalRangeSelected,
    data,
    setTooltipPosition,
    setTooltipText,
    setSpecieById,
    speciesData,
    styles,
    height,
  });

  return (
    <>
      <div
        className={cx(styles.tooltip, {
          [styles.inverted]: tooltipPosition?.left > width - 200,
        })}
        style={tooltipPosition || { visibility: 'hidden' }}
      >
        <div className={styles.tooltipText}>{tooltipText}</div>
      </div>
      <svg
        id="sps-chart"
        className={styles.chart}
        width={width}
        height={height}
      >
        <g
          id="sps-group"
          transform={`translate(${width / 2},${height - HEIGHT_PADDING})`}
        >
          <g id="r-axis" />
          <g id="a-axis" />
          <g id="points" className="points" />
        </g>
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#a00000" />
            <stop offset="50%" stopColor="#aaaa00" />
            <stop offset="100%" stopColor="#00A548" />
          </linearGradient>
          <radialGradient id="radial-gradient" cy="100%">
            <stop offset="30%" stopColor={COLORS.firefly} />
            <stop offset="100%" stopOpacity={0.3} stopColor={COLORS.firefly} />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
}

export default SpsChart;
