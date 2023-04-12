import React, { useMemo } from 'react';

import { T } from '@transifex/react';

import { scaleQuantize, ScaleQuantize } from 'd3';
import groupBy from 'lodash/groupBy';

import styles from './styles.module.scss';

import { ReactComponent as DragIcon } from 'icons/hand-drag.svg';

import type { SPSData } from '../types';

import Slider from './slider';
import { SPSLegendProps } from './types';

const bucketScale: ScaleQuantize<number> = scaleQuantize()
  .domain([0, 100])
  .range([0, 1, 2, 3]);
const getBucketValues = (
  data: SPSData[],
  key: 'SPS_global' | 'per_global'
): number[] => {
  function groupingFunction(d: SPSData): number {
    return bucketScale(d[key]);
  }
  const groupedData = groupBy(data, groupingFunction);
  return [0, 1, 2, 3].map((i) =>
    groupedData && groupedData[i] ? groupedData[i].length : 0
  );
};

function SpsLegend({
  setGlobalRangeSelected,
  setSPSSelected,
  globalRangeSelected,
  SPSSelected,
  data,
}: SPSLegendProps) {
  const spsBucketValues = useMemo<number[]>(
    () => getBucketValues(data, 'SPS_global'),
    [data]
  );
  const globalRangeBucketValues = useMemo<number[]>(
    () => getBucketValues(data, 'per_global'),
    [data]
  );
  const dragToSelectText = (
    <T
      _str="( {icon} Drag to select interval)"
      icon={<DragIcon className={styles.dragIcon} />}
    />
  );
  return (
    <div className={styles.legend}>
      <Slider
        title={<T _str="Portion of global range (%)" />}
        subtitle={
          <>
            <T _str="Number of species per range" /> {dragToSelectText}
          </>
        }
        {...globalRangeSelected}
        bucketValues={globalRangeBucketValues}
        setFunction={setGlobalRangeSelected}
      />
      <Slider
        title={<T _str="Global SPS" />}
        subtitle={
          <>
            <T _str="Number of species per SPS" /> {dragToSelectText}
          </>
        }
        {...SPSSelected}
        bucketValues={spsBucketValues}
        setFunction={setSPSSelected}
      />
    </div>
  );
}

export default SpsLegend;
