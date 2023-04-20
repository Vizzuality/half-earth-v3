/* eslint-disable camelcase */
import { useEffect, useMemo, useCallback } from 'react';

import { useT } from '@transifex/react';

import { arc, scaleLinear, selectAll, select, Selection, BaseType } from 'd3';

import COLORS from 'styles/settings.scss';

import type { Range, SPSData, SpeciesData } from '../types';

import { SPSChartProps } from './types';

const INNER_RADIUS = 56;
const ARC_LABEL_PADDING = 25;

// Linear scale
const l = scaleLinear().domain([0, 100]).range([-180, 0]);

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

const isHighlighted = ({
  per_global,
  SPS_global,
  SPSSelected,
  globalRangeSelected,
}: {
  per_global: number;
  SPS_global: number;
  SPSSelected: Range;
  globalRangeSelected: Range;
}) => {
  const { min: SPSMin, max: SPSMax } = SPSSelected;
  const { min: globalMin, max: globalMax } = globalRangeSelected;
  return (
    SPS_global >= indexToPercentage(SPSMin) &&
    SPS_global <= indexToPercentage(SPSMax) &&
    per_global >= indexToPercentage(globalMin) &&
    per_global <= indexToPercentage(globalMax)
  );
};
const getHighlightedColor = (
  d: SPSData,
  selectedSpeciesId: string,
  SPSSelected: Range,
  globalRangeSelected: Range
) => {
  const { per_global, SPS_global, id } = d;
  if (id === selectedSpeciesId) {
    return COLORS.white;
  }

  return isHighlighted({
    per_global,
    SPS_global,
    SPSSelected,
    globalRangeSelected,
  })
    ? COLORS.white
    : COLORS['oslo-gray'];
};

export const useD3Effect = ({
  width,
  height,
  selectedSpeciesId,
  SPSSelected,
  globalRangeSelected,
  data,
  setTooltipPosition,
  setTooltipText,
  setSpecieBySliceNumber,
  speciesData,
  styles,
}: {
  width: SPSChartProps['width'];
  height: number;
  selectedSpeciesId: string;
  SPSSelected: SPSChartProps['SPSSelected'];
  globalRangeSelected: SPSChartProps['globalRangeSelected'];
  data: SPSChartProps['data'];
  setTooltipPosition: (tooltipPosition: { top: number; left: number }) => void;
  setTooltipText: (tooltipText: string) => void;
  setSpecieBySliceNumber: (sliceNumber: number) => void;
  speciesData: SPSChartProps['speciesData'];
  styles: {
    [className: string]: string;
  };
}) => {
  const t = useT();
  const radius: number = useMemo(() => width / 2 - ARC_LABEL_PADDING, [width]);

  // Radial scale
  const r = useCallback(
    scaleLinear().range([radius, INNER_RADIUS]).domain([100, 0]),
    [radius]
  );

  const getPointCoordinates = useCallback(
    (d: SPSData) => {
      const pointRadius = r(d.per_global);
      const angle = l(d.SPS_global);
      const x: number = pointRadius * Math.cos((angle * Math.PI) / 180);
      const y: number = pointRadius * Math.sin((angle * Math.PI) / 180);
      return { x, y };
    },
    [r]
  );

  const getPointPosition = useCallback(
    (d: SPSData) => {
      const { x, y } = getPointCoordinates(d);
      return `translate(${x},${y})`;
    },
    [getPointCoordinates]
  );

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
        .attr('d', (d) => arcGenerator(d, radius + ARC_LABEL_PADDING, radius));

      const angleAxisGroups = angleAxis
        .selectAll('g')
        .data([25, 50, 75])
        .enter()
        .append('g')
        .attr('transform', (d: number) => `rotate(${l(d)})`);

      // Angle ticks
      angleAxisGroups
        .append('line')
        .attr('x1', INNER_RADIUS)
        .attr('x2', radius + ARC_LABEL_PADDING)
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
        .attr('id', (d: SPSData) => `point-${d.SliceNumber}`)
        .attr('transform', getPointPosition)
        .append('circle')
        .attr('class', styles.point)
        .attr('r', (d: SPSData) => (d.id === selectedSpeciesId ? 5 : 2))
        .attr('fill', (d: SPSData) =>
          getHighlightedColor(
            d,
            selectedSpeciesId,
            SPSSelected,
            globalRangeSelected
          )
        )
        .attr('stroke', (d: SPSData) =>
          getHighlightedColor(
            d,
            selectedSpeciesId,
            SPSSelected,
            globalRangeSelected
          )
        )
        .attr('stroke-width', (d: SPSData) =>
          d.id === selectedSpeciesId ? 10 : 3
        )
        .on('mouseenter', (d: SPSData) => {
          if (speciesData) {
            const specie: SpeciesData = speciesData.find(
              (s) => s.sliceNumber === d.SliceNumber
            );
            const PADDING_LEFT = 5;
            const TOP_PADDING_CENTER = 25;
            setTooltipText(specie.name);
            const { x, y } = getPointCoordinates(d);
            setTooltipPosition({
              left: x + width / 2 + PADDING_LEFT,
              top: y + height - TOP_PADDING_CENTER,
            });
          }
        })
        .on('mouseleave', () => {
          setTooltipPosition(undefined);
          setTooltipText(undefined);
        })
        .on('click', (d: SPSData) => {
          setSpecieBySliceNumber(d.SliceNumber);
        });
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
      .attr('d', (d) => arcGenerator(d, INNER_RADIUS, 0));

    renderRadialAxis(radialAxis);

    renderAngleAxis(angleAxis);

    renderPoints();
  }, [
    width,
    t,
    selectedSpeciesId,
    SPSSelected,
    globalRangeSelected,
    data,
    setTooltipPosition,
    setTooltipText,
    setSpecieBySliceNumber,
    speciesData,
  ]);
};
