import React, { useRef, useMemo } from 'react';

import cx from 'classnames';
import { scaleLinear, ScaleLinear } from 'd3';

import styles from './styles.module.scss';

import DragHandle from '../drag-handle';

import type { SPSSliderProps } from './types';

function Slider({
  title,
  subtitle,
  min,
  max,
  bucketValues,
  setFunction,
}: SPSSliderProps) {
  const constraintsRef = useRef(null);
  const dragHandleProps = {
    setFunction,
    min,
    max,
    valuesLength: bucketValues.length,
  };
  const barHeights = useMemo<number[]>(() => {
    const maxHeight: number = Math.max(...bucketValues);
    const heightScale: ScaleLinear<number, number> = scaleLinear()
      .range([0, 50])
      .domain([0, maxHeight]);
    return bucketValues.map((value) => heightScale(value));
  }, [bucketValues]);
  return (
    <div className={styles.slider}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div ref={constraintsRef} className={styles.bars}>
        <DragHandle isMin {...dragHandleProps} />
        <DragHandle {...dragHandleProps} />
        {bucketValues.map((_, i) => {
          const isHighlighted = i >= min && i < max;
          const renderTick = (index: number) => (
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
