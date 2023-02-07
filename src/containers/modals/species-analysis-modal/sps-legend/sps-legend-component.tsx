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

import { T } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';

import SPSLegendProps from './index.d';

function DragHandle({
  isMin = false,
  constraintsRef,
  setFunction,
  min,
  max,
  valuesLength,
}) {
  const xPercentage = useMemo(
    () => `${((isMin ? min : max) * 100) / valuesLength}%`,
    [isMin, min, max]
  );
  const stepWidth = 80;
  const updateMinMax = (target) => {
    const indexChange = Math.round(target / stepWidth);
    if (indexChange !== 0) {
      const updatedMaxValue = () => {
        if (max + indexChange < min + 1) {
          return min + 1;
        }
        if (max + indexChange > valuesLength) {
          return valuesLength;
        }
        return max + indexChange;
      };

      const updatedMinValue = () => {
        if (min + indexChange > max - 1) {
          return max - 1;
        }
        if (min + indexChange < 0) {
          return 0;
        }
        return min + indexChange;
      };

      setFunction({
        min,
        max,
        ...(isMin ? { min: updatedMinValue() } : { max: updatedMaxValue() }),
      });
    }

    // The position change will be made on the animate prop
    return 0;
  };

  return (
    <motion.div
      drag="x"
      whileHover={{ scale: 1.1 }}
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      animate={{ left: xPercentage }}
      transition={{ duration: 0 }}
      className={styles.handle}
      dragTransition={{
        modifyTarget: updateMinMax,
        power: 0,
        timeConstant: 50,
      }}
      onDrag={(e) => {
        e.preventDefault();
      }}
    >
      <span className={styles.line} />
      <span className={styles.circle} />
    </motion.div>
  );
}

function Slider({ title, subtitle, min, max, bucketValues, setFunction }) {
  const constraintsRef = useRef(null);
  const dragHandleProps = {
    constraintsRef,
    setFunction,
    min,
    max,
    valuesLength: bucketValues.length,
  };
  return (
    <div className={styles.slider}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div ref={constraintsRef} className={styles.bars}>
        <DragHandle isMin {...dragHandleProps} />
        <DragHandle {...dragHandleProps} />
        {/* <div className={styles.xAxisTicks}>
          {[0, 25, 50, 75, 100].map((x) => (
            <div
              key={`x-axis-${x}`}
              className={styles.xAxisTick}
              style={{ left: `${x}%` }}
            >
              {x}
            </div>
          ))}
        </div> */}
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
              style={{ height: barHeight }}
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

function SpsLegend({
  setGlobalRangeSelected,
  setSPSSelected,
  globalRangeSelected,
  SPSSelected,
}: SPSLegendProps) {
  const bucketValue = [30, 4, 27, 18];
  return (
    <div className={styles.legend}>
      <Slider
        title={<T _str="Portion of global range (%)" />}
        subtitle={<T _str="Nº of species per range" />}
        {...globalRangeSelected}
        bucketValues={bucketValue}
        setFunction={setGlobalRangeSelected}
      />
      <Slider
        title={<T _str="Global SPS" />}
        subtitle={<T _str="Nº of species per SPS" />}
        {...SPSSelected}
        bucketValues={bucketValue}
        setFunction={setSPSSelected}
      />
    </div>
  );
}

export default SpsLegend;
