/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef, useMemo } from 'react';

import cx from 'classnames';
import * as d3 from 'd3';

import styles from './styles.module.scss';

import DragHandle from '../drag-handle';

import SPSSliderProps from './index.d';

function Slider({ title, subtitle, min, max, bucketValues, setFunction }) {
  const constraintsRef = useRef(null);
  const dragHandleProps = {
    constraintsRef,
    setFunction,
    min,
    max,
    valuesLength: bucketValues.length,
  };
  const barHeights = useMemo(() => {
    const maxHeight = Math.max(...bucketValues);
    const heightScale = d3.scaleLinear().range([0, 50]).domain([0, maxHeight]);
    return bucketValues.map((value) => heightScale(value));
  }, [bucketValues]);
  return (
    <div className={styles.slider}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div ref={constraintsRef} className={styles.bars}>
        <DragHandle isMin {...dragHandleProps} />
        <DragHandle {...dragHandleProps} />
        {bucketValues.map((barHeight, i) => {
          const isHighlighted = i >= min && i < max;
          const renderTick = (index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`x-tick-${title}-${index}`}
              className={cx(styles.xAxisTick, {
                [styles.tickHighlighted]: isHighlighted || index === max,
              })}
              style={{ left: `${(index * 100) / bucketValues.length}%` }}
            >
              {(index * 100) / bucketValues.length}
            </div>
          );

          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`bar${title}-${i}`}
              className={cx(styles.bar, {
                [styles.highlighted]: isHighlighted,
              })}
              style={{ height: barHeights[i] }}
            >
              {renderTick(i)}
              {i === bucketValues.length - 1 && renderTick(i + 1)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
