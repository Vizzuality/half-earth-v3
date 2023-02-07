/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useMemo } from 'react';

import { useT } from '@transifex/react';

import * as d3 from 'd3';

import styles from './styles.module.scss';

import { LineRadialProps } from '.';

const innerRadius = 56;
const arcLabelPadding = 25;
const arcGenerator = (outerR, innerR = 0) =>
  d3
    .arc()
    .outerRadius(outerR)
    .innerRadius(innerR)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);
// Colors
const white = '#ebebeb';
const navy = '#0A212E';
const backgroundColor = '#0F2B3B';

function SpsChart({ width, height, data, selectedSpecies }: LineRadialProps) {
  const t = useT();
  const { sliceNumber: selectedSpeciesSliceNumber } = selectedSpecies;

  if (!data) return null;
  const radius = useMemo(
    () => height - innerRadius - arcLabelPadding,
    [height]
  );

  // Radial scale
  const r = d3.scaleLinear().range([radius, innerRadius]).domain([100, 0]);

  // Linear scale
  const l = d3.scaleLinear().domain([0, 100]).range([-180, 0]);

  useEffect(() => {
    const renderBackgroundArc = (radialAxis) => {
      radialAxis
        .append('path')
        .attr('fill', 'url(#gradient)')
        .style('opacity', 1)
        .attr('d', arcGenerator(radius));

      // Second element just for extra gradient
      radialAxis
        .append('path')
        .attr('fill', 'url(#radial-gradient)')
        .style('opacity', 1)
        .attr('d', arcGenerator(radius));
    };

    const renderAngleAxis = (angleAxis) => {
      // Labels arc
      angleAxis
        .append('path')
        .attr('fill', navy)
        .attr('id', 'label-arc')
        .attr('d', arcGenerator(radius + arcLabelPadding, radius));

      const angleAxisGroups = angleAxis
        .selectAll('g')
        .data([25, 50, 75])
        .enter()
        .append('g')
        .attr('transform', (d) => {
          return `rotate(${l(d)})`;
        });

      // Angle ticks
      angleAxisGroups
        .append('line')
        .attr('x1', innerRadius)
        .attr('x2', radius + arcLabelPadding)
        .attr('stroke', backgroundColor);

      const angleAxisLabelGroups = angleAxis
        .append('g')
        .selectAll('g')
        .data([25, 50, 75, 100])
        .enter()
        .append('g');
      // .attr('transform', (d) => {
      //   return `rotate(${l(d) - 180})`;
      // });

      const texts = {
        25: t('Very low SPS'),
        50: t('Low SPS'),
        75: t('Medium SPS'),
        100: t('High SPS'),
      };

      // Angle labels
      angleAxisLabelGroups
        .append('text')
        .style('fill', white)
        .attr('x', (d) => (d * 10) - 85) // TODO: Improve label positioning
        .attr('dy', '1em')
        .append('textPath')
        .style('text-anchor', 'middle')
        .attr('xlink:href', '#label-arc')
        .text((d) => {
          return texts[d];
        });
    };

    // Recalculate on change
    d3.selectAll('#r-axis > *').remove();
    d3.selectAll('#a-axis > *').remove();
    d3.selectAll('#points > *').remove();

    const radialAxis = d3.select('#r-axis');
    const angleAxis = d3.select('#a-axis');


    // BACKGROUND

    // Background arc
    renderBackgroundArc(radialAxis);

    // Center arc
    radialAxis
    .append('path')
    .attr('fill', backgroundColor)
    .attr('d', arcGenerator(innerRadius, 0));


    // RADIAL AXIS

    const radialAxisGroups = radialAxis
      .selectAll('g')
      .data([0, 25, 50, 75, 100])
      .enter()
      .append('g');


    // Radial number values
    radialAxisGroups
      .append('text')
      .attr('x', (d) => {
        return -r(d) + 10;
      })
      .style('fill', white)
      .style('stroke', 'transparent')
      .style('text-anchor', 'middle')
      .text(d => d)
      .raise();

    // Radial arcs ticks
    radialAxisGroups
      .append('path')
      .attr('stroke', white)
      .attr('stroke-opacity', 0.5)
      .attr('stroke-dasharray', '0 2 0')
      .attr('d', (d) => {
        if (d === 0 || d === 100) return null;
        return arcGenerator(r(d), r(d))();
      });

    radialAxisGroups.raise(); // Move up on the order rendering

    // ANGLE AXIS

    renderAngleAxis(angleAxis);


    // POINTS
    const points = d3.select('#points');

    points
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'cpoint')
      .attr('id', (d) => `point-${d.SliceNumber}`)
      .attr('transform', (d) => {
        // get angle and radius
        const angle = l(d.SPS_global);
        const pointRadius = r(d.per_global);
        const x = pointRadius * Math.cos((angle * Math.PI) / 180);
        const y = pointRadius * Math.sin((angle * Math.PI) / 180);
        return `translate(${[x, y]})`;
      })
      .append('circle')
      .attr('class', 'point')
      .attr('r', (d) => d.SliceNumber === selectedSpeciesSliceNumber ?  5 : 2)
      .attr('fill', white)
      .attr('stroke', white)
      .attr('stroke-width',(d) => d.SliceNumber === selectedSpeciesSliceNumber ?  10 : 3)
      .style('fill-opacity', 1)
      .style('stroke-opacity', 0.5)
      .attr('mix-blend-mode', 'multiply');
  }, [width, height, t, selectedSpeciesSliceNumber]);

  return (
    <svg id="sps-chart" className={styles.chart} width={width} height={height}>
      <g id="sps-group" transform={`translate(${width / 2},${height})`}>
        <g id="r-axis" />
        <g id="a-axis" />
        <g id="points" className='points' />
      </g>
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#a00000" />
          <stop offset="50%" stopColor="#aaaa00" />
          <stop offset="100%" stopColor="#00A548" />
        </linearGradient>
        <radialGradient id="radial-gradient" cy="100%">
          <stop offset="30%" stopColor={navy} />
          <stop offset="100%" stopOpacity={0.3} stopColor={navy} />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default SpsChart;
