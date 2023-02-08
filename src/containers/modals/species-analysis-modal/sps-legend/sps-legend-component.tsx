/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useMemo } from 'react';

import { T } from '@transifex/react';

import * as d3 from 'd3';
import groupBy from 'lodash/groupBy';

import styles from './styles.module.scss';

import { ReactComponent as DragIcon } from 'icons/hand-drag.svg';

import SPSLegendProps from './index.d';
import Slider from './slider';

const bucketScale = d3.scaleQuantize().domain([0, 100]).range([0, 1, 2, 3]);
const getBucketValues = (data, key) =>
  Object.values(groupBy(data, (d) => bucketScale(d[key]))).map((d) => d.length);

function SpsLegend({
  setGlobalRangeSelected,
  setSPSSelected,
  globalRangeSelected,
  SPSSelected,
  data,
}: SPSLegendProps) {
  const spsBucketValues = useMemo(
    () => getBucketValues(data, 'SPS_global'),
    [data]
  );
  const globalRangeBucketValues = useMemo(
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
            <T _str="Nº of species per range" /> {dragToSelectText}
          </>
        }
        {...globalRangeSelected}
        bucketValues={spsBucketValues}
        setFunction={setGlobalRangeSelected}
      />
      <Slider
        title={<T _str="Global SPS" />}
        subtitle={
          <>
            <T _str="Nº of species per SPS" /> {dragToSelectText}
          </>
        }
        {...SPSSelected}
        bucketValues={globalRangeBucketValues}
        setFunction={setSPSSelected}
      />
    </div>
  );
}

export default SpsLegend;
