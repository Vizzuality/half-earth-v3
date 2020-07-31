import React from 'react';
import { animated, useSprings } from 'react-spring';
import * as d3 from 'd3';
import cx from 'classnames';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';

import styles from './scatter-plot-styles.module.scss';

const ScatterPlot = ({
  data,
  className,
  xAxisSelectedKey,
  handleSelectNextIndicator,
  handleSelectPreviousIndicator,
  xAxisLabels
}) => {
  const canvasWidth = 700;
  const canvasHeight = 400;
  const padding = 40;  // for chart edges

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
        return d.xAxisValues[xAxisSelectedKey];
    })])
    .range([padding, canvasWidth - padding * 2]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
        return d.yAxisValue;
    })])
    .range([canvasHeight - padding, padding]);
    
  const springs = useSprings(data.length, data.map(d => (
    {
      cx: xScale(d.xAxisValues[xAxisSelectedKey]) || padding,
      opacity: !!d.xAxisValues[xAxisSelectedKey] ? 0.6 : 0
    }
  )));
  
  return (
    <div className={className}>
      <div className={cx(styles.chartContainer)}>
        <div className={styles.scatterPlotContainer}>
          <svg width={canvasWidth} height={canvasHeight}>
            {springs && springs.map((animatedProps, i) => (
              <animated.circle
                style={{
                  cy: yScale(data[i].yAxisValue),
                  r: data[i].size,
                  fill: data[i].color,
                  ...animatedProps
                }}
              />
            ))}
          </svg>
        </div>
      </div>
      <div className={styles.xAxisContainer}>
        <button onClick={handleSelectPreviousIndicator} style={{ transform: "scaleX(-1)" }}>
          <ArrowButton />
        </button>
        <span className={styles.xAxisLabel}>{xAxisLabels[xAxisSelectedKey]}</span>
        <button onClick={handleSelectNextIndicator}>
          <ArrowButton />
        </button>
      </div>
    </div>
  )
}

export default ScatterPlot;