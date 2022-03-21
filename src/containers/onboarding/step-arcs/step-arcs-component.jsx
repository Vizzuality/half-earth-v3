import React from 'react';
import styles from './step-arcs-styles.module.scss';
import cx from 'classnames';

const StepsArcs = ({
  numberOfArcs,
  currentStep,
  radius = 33,
  strokeWidth = 3,
}) => {
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  const CIRCLE_PADDING = 3;
  const describeArc = ({
    x = radius + CIRCLE_PADDING,
    y = radius + CIRCLE_PADDING,
    startAngle,
    endAngle,
  }) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  };

  const numberArray = Array.from(Array(numberOfArcs).keys());
  const stepsLength = 360 / numberOfArcs;
  const PADDING = 5;
  const arcsArray = numberArray.map((n) => ({
    startAngle: n * stepsLength,
    endAngle: (n + 1) * stepsLength - PADDING,
  }));
  return (
    <svg className={styles.stepsCircle}>
      {arcsArray.map((arcStartEnd, i) => (
        <path
          key={`$arc-${i}`}
          className={cx(styles.stepsArc, {
            [styles.active]: currentStep >= i,
          })}
          strokeWidth={strokeWidth}
          d={describeArc(arcStartEnd)}
        />
      ))}
    </svg>
  );
};

export default StepsArcs;
