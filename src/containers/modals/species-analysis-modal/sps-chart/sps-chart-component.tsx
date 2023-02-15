/* eslint-disable camelcase */
import React, { useEffect, useMemo } from 'react';

import { useT } from '@transifex/react';

import { arc, scaleLinear, selectAll, select, Selection, BaseType } from 'd3';

import COLORS from 'styles/settings.scss';

import styles from './styles.module.scss';

import type { Range, SPSData } from '../types';

import { SPSChartProps } from './types';

const innerRadius = 56;
const arcLabelPadding = 25;
const arcGenerator = (d, outerR: number, innerR = 0) =>
  String(
    arc()
      .outerRadius(outerR)
      .innerRadius(innerR)
      .startAngle(-Math.PI / 2)
      // TODO: TS-TODO
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .endAngle(Math.PI / 2)(d)
  );

const indexToPercentage: (n: number) => number = (n) => (n * 100) / 4;
const isHighlighted = (
  SPS_global: number,
  perGlobal: number,
  SPSSelected: Range,
  globalRangeSelected: Range
) => {
  const { min: SPSMin, max: SPSMax } = SPSSelected;
  const { min: globalMin, max: globalMax } = globalRangeSelected;
  return (
    SPS_global >= indexToPercentage(SPSMin) &&
    SPS_global <= indexToPercentage(SPSMax) &&
    perGlobal >= indexToPercentage(globalMin) &&
    perGlobal <= indexToPercentage(globalMax)
  );
};

const getHighlightedColor = (
  d: SPSData,
  selectedSpeciesSliceNumber: number,
  SPSSelected: Range,
  globalRangeSelected: Range
) => {
  const { per_global, SPS_global, SliceNumber } = d;
  if (SliceNumber === selectedSpeciesSliceNumber) {
    return COLORS.white;
  }
  return isHighlighted(per_global, SPS_global, SPSSelected, globalRangeSelected)
    ? COLORS.white
    : COLORS['white-opacity-20'];
};

// To avoid the cut points at the bottom
const HEIGHT_PADDING = 10;

function SpsChart({
  width,
  data,
  selectedSpecies,
  SPSSelected,
  globalRangeSelected,
}: SPSChartProps) {
  const t = useT();
  const { sliceNumber: selectedSpeciesSliceNumber }: { sliceNumber: number } =
    selectedSpecies;
  const height = useMemo(() => width / 2 + HEIGHT_PADDING, [width]);
  if (!data) return null;
  const radius = useMemo(() => width / 2 - arcLabelPadding, [width]);
  // Radial scale
  const r = scaleLinear().range([radius, innerRadius]).domain([100, 0]);

  // Linear scale
  const l = scaleLinear().domain([0, 100]).range([-180, 0]);

  const getPointPosition = (d: SPSData) => {
    const pointRadius = r(d.SPS_global);
    const angle = l(d.per_global);
    const x = pointRadius * Math.cos((angle * Math.PI) / 180);
    const y = pointRadius * Math.sin((angle * Math.PI) / 180);
    return `translate(${x},${y})`;
  };

  useEffect(() => {
    const renderBackgroundArc = (
      radialAxis: Selection<SVGPathElement, number, BaseType, unknown>
    ) => {
      radialAxis
        .append('path')
        .attr('fill', 'url(#gradient)')
        .attr('d', (d) => arcGenerator(d, radius));

      // Second element just for extra gradient
      radialAxis
        .append('path')
        .attr('fill', 'url(#radial-gradient)')
        .attr('d', (d) => arcGenerator(d, radius));
    };

    const renderAngleAxis = (
      angleAxis: Selection<SVGPathElement, number, BaseType, unknown>
    ) => {
      // Labels arc
      angleAxis
        .append('path')
        .attr('fill', COLORS.firefly)
        .attr('id', 'label-arc')
        .attr('d', (d) => arcGenerator(d, radius + arcLabelPadding, radius));

      const angleAxisGroups = angleAxis
        .selectAll('g')
        .data([25, 50, 75])
        .enter()
        .append('g')
        .attr('transform', (d: number) => `rotate(${l(d)})`);

      // Angle ticks
      angleAxisGroups
        .append('line')
        .attr('x1', innerRadius)
        .attr('x2', radius + arcLabelPadding)
        .attr('stroke', COLORS.navy);

      const angleAxisLabelGroups = angleAxis
        .append('g')
        .selectAll('g')
        .data([25, 50, 75, 100])
        .enter()
        .append('g')
        .attr('transform', (d: number) => `rotate(${l(d - 25) + 180})`);

      const labelText = (d: number) =>
        ({
          25: t('Very low SPS'),
          50: t('Low SPS'),
          75: t('Medium SPS'),
          100: t('High SPS'),
        }[d]);

      // Angle labels
      angleAxisLabelGroups
        .append('text')
        .attr('class', styles.angleLabels)
        .attr('x', '15%')
        .attr('dy', '16px')
        .append('textPath')
        .attr('xlink:href', '#label-arc')
        .text(labelText);
    };

    const renderRadialAxis = (
      radialAxis: Selection<SVGPathElement, number, BaseType, unknown>
    ) => {
      const radialAxisGroups = radialAxis
        .selectAll('g')
        .data([0, 25, 50, 75, 100])
        .enter()
        .append('g');

      // // Radial number values
      radialAxisGroups
        .append('text')
        .attr('class', styles.radialLabels)
        .attr('x', (d: number) => -r(d) + 10)
        .attr('dy', '-2px')
        .text((d: number) => d)
        .raise();

      // // Radial arcs ticks
      radialAxisGroups
        .append('path')
        .attr('stroke', COLORS.white)
        .attr('stroke-opacity', 0.5)
        .attr('stroke-dasharray', '0 2 0')
        .attr('d', (d) => {
          if (d === 0 || d === 100) return null;
          return arcGenerator(d, r(d), r(d));
        });
    };

    const renderPoints = () => {
      const points = select('#points');

      points
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('id', (d) => `point-${d.SliceNumber}`)
        .attr('transform', getPointPosition)
        .append('circle')
        .attr('class', styles.point)
        .attr('r', (d) =>
          d.SliceNumber === selectedSpeciesSliceNumber ? 5 : 2
        )
        .attr('fill', (d) =>
          getHighlightedColor(
            d,
            selectedSpeciesSliceNumber,
            SPSSelected,
            globalRangeSelected
          )
        )
        .attr('stroke', (d) =>
          getHighlightedColor(
            d,
            selectedSpeciesSliceNumber,
            SPSSelected,
            globalRangeSelected
          )
        )
        .attr('stroke-width', (d) =>
          d.SliceNumber === selectedSpeciesSliceNumber ? 10 : 3
        )
        .attr('mix-blend-mode', 'multiply');
    };

    // Recalculate on change
    selectAll('#r-axis > *').remove();
    selectAll('#a-axis > *').remove();
    selectAll('#points > *').remove();

    const radialAxis: Selection<SVGPathElement, number, BaseType, unknown> =
      select('#r-axis');
    const angleAxis: Selection<SVGPathElement, number, BaseType, unknown> =
      select('#a-axis');

    // RENDER

    renderBackgroundArc(radialAxis);

    // Center arc
    radialAxis
      .append('path')
      .attr('fill', COLORS.navy)
      .attr('d', (d) => arcGenerator(d, innerRadius, 0));

    renderRadialAxis(radialAxis);

    renderAngleAxis(angleAxis);

    renderPoints();
  }, [
    width,
    t,
    selectedSpeciesSliceNumber,
    SPSSelected,
    globalRangeSelected,
    data,
  ]);

  return (
    <svg id="sps-chart" className={styles.chart} width={width} height={height}>
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
  );
}

export default SpsChart;
