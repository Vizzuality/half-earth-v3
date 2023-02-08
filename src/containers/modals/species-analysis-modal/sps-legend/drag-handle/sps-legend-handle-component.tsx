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

import { motion } from 'framer-motion';

import styles from './styles.module.scss';

import SPSHandleProps from '.';

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

export default DragHandle;
