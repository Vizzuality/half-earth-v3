import React, { useMemo } from 'react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';

import type { SPSHandleProps } from './types.d';

const STEP_WIDTH = 80;

function DragHandle({
  isMin = false,
  setFunction,
  min,
  max,
  valuesLength,
  handleDragStart,
  handleDragEnd,
}: SPSHandleProps) {
  const xPercentage = useMemo(
    () => `${((isMin ? min : max) * 100) / valuesLength}%`,
    [isMin, min, max]
  );
  const updateMinMax = (target) => {
    const indexChange: number = Math.round(target / STEP_WIDTH);
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
      const updatedRange = {
        min: isMin ? updatedMinValue() : min,
        max: isMin ? max : updatedMaxValue(),
      };
      setFunction(updatedRange);
    }

    // The position change will be made on the animate prop
    return 0;
  };

  return (
    <motion.div
      drag="x"
      whileHover={{ scale: 1.1 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragConstraints={{
        left: isMin ? -STEP_WIDTH * min : -STEP_WIDTH * max,
        right: isMin
          ? STEP_WIDTH * (valuesLength - min)
          : STEP_WIDTH * (valuesLength - max),
      }}
      dragElastic={0}
      dragMomentum={false}
      initial={{ transform: 'translateX(0)' }}
      animate={{ left: xPercentage }}
      transition={{ duration: 0, type: 'spring' }}
      className={cx(styles.handle, { [styles.handleMin]: isMin })}
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
