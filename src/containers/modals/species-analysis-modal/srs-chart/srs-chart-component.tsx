/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';

import * as d3 from 'd3';

import data from './brazil-mock.json';
import { LineRadialProps } from './index.d';

const innerRadius = 56;
function SrsChart({ width, height }: LineRadialProps) {
  useEffect(() => {
    const arcGenerator = (outerR, innerR = 0) =>
      d3
        .arc()
        .outerRadius(outerR)
        .innerRadius(innerR)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2);

    const renderBackgroundArc = (svg, radialAxis, radius) => {
      // TODO adjust gradient

      const gradient = svg
        .append('svg:defs')
        .append('svg:linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      // .attr('spreadMethod', 'pad');

      // Define the gradient colors
      gradient
        .append('svg:stop')
        .attr('offset', '0%')
        .attr('stop-color', '#a00000')
        .attr('stop-opacity', 1);

      gradient
        .append('svg:stop')
        .attr('offset', '50%')
        .attr('stop-color', '#aaaa00')
        .attr('stop-opacity', 1);
      gradient
        .append('svg:stop')
        .attr('offset', '100%')
        .attr('stop-color', '#00A548')
        .attr('stop-opacity', 1);

      radialAxis
        .append('path')
        .attr('fill', 'url(#gradient)')
        .style('opacity', 0.5)
        .attr('d', arcGenerator(radius));
    };

    const renderAngleAxis = (svg, radius, l) => {
      const angleAxis = svg
        .append('g')
        .attr('class', 'a-axis')
        .selectAll('g')
        .data([25, 50, 75])
        .enter()
        .append('g')
        .attr('transform', (d) => {
          return `rotate(${l(d)})`;
        });

      angleAxis
        .append('line')
        .attr('x1', innerRadius)
        .attr('x2', radius)
        .attr('stroke', 'white');

      angleAxis
        .append('text')
        .attr('x', radius + 6)
        .attr('dy', '.35em')
        // .style('text-anchor', (d) => {
        //   return l(d) < 270 && l(d) > 90 ? 'end' : null;
        // })
        .style('fill', '#ebebeb')
        .attr('transform', (d) => {
          return l(d) < 270 && l(d) > 90 ? `rotate(180 ${radius + 6},0)` : null;
        })
        .text((d) => {
          return d;
        });
    };

    const radius = Math.min(width, height) / 2 - 30;
    const sizeVariable = 'FREQUENCY';

    // radius
    const r = d3.scaleLinear().range([radius, innerRadius]).domain([0, 100]);

    // Line
    const l = d3.scaleLinear().domain([0, 100]).range([-180, 0]);

    const size = d3.scaleLinear().range([3, 20]);

    // Just for debugging
    d3.selectAll('svg > *').remove();

    const svg = d3
      .select('#srs-chart')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    size.domain(
      d3.extent(data, (d) => {
        return parseFloat(d[sizeVariable]);
      })
    );

    const radialAxis = svg.append('g').attr('class', 'r-axis');

    const radialAxisGroups = radialAxis
      .selectAll('g')
      .data([0, 25, 50, 75])
      .enter()
      .append('g');

    renderBackgroundArc(svg, radialAxis, radius);

    // radial number values ticks
    radialAxisGroups
      .append('text')
      .attr('x', (d) => {
        return -r(d) + 10;
      })
      .attr('translate', '')
      .style('fill', '#ebebeb')
      .style('stroke', 'transparent')
      .style('text-anchor', 'middle')
      .text((d) => d);

    // radial arcs ticks
    radialAxisGroups
      .append('path')
      .attr('stroke', '#ebebeb')
      .attr('d', (d) => arcGenerator((radius * d) / 100, (radius * d) / 100)());

    renderAngleAxis(svg, radius, l);
    radialAxisGroups.raise(); // Move up on the order rendering

    const points = svg.append('g').attr('class', 'points');

    points
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'cpoint')
      .attr('transform', (d) => {
        // get angle and radius
        const angle = l(d.SPS); // angle given  by SPS
        const pointRadius = r(d.group);
        const x = pointRadius * Math.cos((angle * Math.PI) / 180);
        const y = pointRadius * Math.sin((angle * Math.PI) / 180);
        return `translate(${[x, y]})`;
      })
      .append('circle')
      .attr('class', 'point')
      .attr('r', 1.2)
      .attr('fill', () => {
        return 'white';
      })
      .attr('mix-blend-mode', 'multiply');

    // Point interaction
    points.selectAll('g').on('click', (d) => {
      console.info(
        `${d.scientific_name}-  SPS:${d.SPS}; Range:${d.per_global} CC:${d.conservation_concern}`
      );
    });

    // Center arc
    radialAxis
      .append('path')
      .attr('fill', '#0F2B3B')
      .attr('d', arcGenerator(innerRadius, 0))
      .raise();
  }, [width, height]);

  return <svg id="srs-chart" width={width} height={height} />;
}

export default SrsChart;
