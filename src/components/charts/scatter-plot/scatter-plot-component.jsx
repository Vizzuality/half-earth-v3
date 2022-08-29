import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@transifex/react';
import { format } from 'd3-format';

import * as d3 from 'd3';
import cx from 'classnames';

import { getLocaleNumber } from 'utils/data-formatting-utils';
import { getCountryNames } from 'constants/translation-constants';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';

import styles from './scatter-plot-styles.module.scss';

const TickLines = ({
  tickLine,
  bubble,
  countryChallengesSelectedKey,
  chartScale,
}) => {
  if (!tickLine || tickLine !== bubble.iso) return null;
  return (
    <g>
      <line
        x1={chartScale.xScale(bubble.xAxisValues[countryChallengesSelectedKey])}
        y1={chartScale.yScale(bubble.yAxisValue)}
        x2={chartScale.xScale(bubble.xAxisValues[countryChallengesSelectedKey])}
        y2="100%"
        strokeWidth="1"
        stroke="#ffffff"
        strokeDasharray="2 3"
      />
      <line
        x2={chartScale.xScale(bubble.xAxisValues[countryChallengesSelectedKey])}
        y1={chartScale.yScale(bubble.yAxisValue)}
        x1="0"
        y2={chartScale.yScale(bubble.yAxisValue)}
        strokeWidth="1"
        stroke="#ffffff"
        strokeDasharray="2 3"
      />
    </g>
  );
};

const ScatterPlot = ({
  data,
  yAxisTicks,
  countryISO,
  onBubbleClick,
  handleContainerClick,
  countryChallengesSelectedKey,
}) => {
  const locale = useLocale();
  const chartSurfaceRef = useRef(null);
  const [chartScale, setChartScale] = useState(null);
  const [tooltipState, setTooltipState] = useState(null);
  const [tickLine, setTickLine] = useState(null);
  const [xAxisValue, setXAxisValue] = useState(null);
  const [yAxisValue, setYAxisValue] = useState(null);
  const padding = 50; // for chart edges
  const tooltipOffset = 20;

  const countryNames = useCallback(getCountryNames, [locale]);
  const getX = (e, ref) => e.clientX - ref.current.getBoundingClientRect().left;
  const getY = (e, ref) => e.clientY - ref.current.getBoundingClientRect().top;

  const minXValue = (data, selectedKey) =>
    d3.min(data, (d) => d.xAxisValues[selectedKey]);
  const maxXValue = (data, selectedKey) =>
    d3.max(data, (d) => d.xAxisValues[selectedKey]);

  const percentageFormat = format('.0f');
  const currencyFormatting = format('$,.2f');

  const countryChallengesChartFormats = {
    [COUNTRY_ATTRIBUTES.Pop2020]: (value) => getLocaleNumber(value, locale),
    GNI_PPP: (value) => `${currencyFormatting(value)} B`,
    [COUNTRY_ATTRIBUTES.hm_vh_ter]: (value) => `${percentageFormat(value)}%`,
    [COUNTRY_ATTRIBUTES.prop_protected_ter]: (value) =>
      `${percentageFormat(value)}%`,
    [COUNTRY_ATTRIBUTES.protection_needed_ter]: (value) =>
      `${percentageFormat(value)}%`,
    [COUNTRY_ATTRIBUTES.total_endemic_ter]: (value) =>
      getLocaleNumber(value, locale),
    [COUNTRY_ATTRIBUTES.nspecies_ter]: (value) =>
      getLocaleNumber(value, locale),
  };

  const formatFunction =
    countryChallengesChartFormats[countryChallengesSelectedKey];

  const getXAxisTicks = (data, selectedKey) => {
    if (!data || !selectedKey) return null;
    const highValue = d3.max(data, (d) => d.xAxisValues[selectedKey]);
    const lowValue = d3.min(data, (d) => d.xAxisValues[selectedKey]);
    const formatFunction = countryChallengesChartFormats[selectedKey];
    return [formatFunction(lowValue), formatFunction(highValue)];
  };

  const xAxisTicks = getXAxisTicks(data, countryChallengesSelectedKey);

  const calculateScale = () => {
    if (data && chartSurfaceRef.current) {
      const xScale = d3
        .scaleLinear()
        .domain([
          minXValue(data, countryChallengesSelectedKey),
          maxXValue(data, countryChallengesSelectedKey),
        ])
        .range([padding, chartSurfaceRef.current.offsetWidth - padding]);
      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([chartSurfaceRef.current.offsetHeight - padding, padding]);

      setChartScale({ xScale, yScale });
    }
  };

  useEffect(() => {
    calculateScale();
    window.addEventListener('resize', () => {
      calculateScale();
    });
  }, [data, countryChallengesSelectedKey, chartSurfaceRef.current]);

  const animationTransitionConfig = {
    type: 'spring',
    damping: 20,
    stiffness: 200,
  };

  return (
    <>
      <div className={cx(styles.chartContainer)} onClick={handleContainerClick}>
        <div className={styles.scatterPlotContainer} ref={chartSurfaceRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.chartSurfaceSvg}
            height="100%"
            width="110%"
          >
            {chartScale &&
              data.map((bubble) => (
                <g
                  key={bubble.iso}
                  onClick={() =>
                    onBubbleClick({
                      countryISO: bubble.iso,
                      countryName: countryNames[bubble.name] || bubble.name,
                    })
                  }
                >
                  <TickLines
                    tickLine={tickLine}
                    bubble={bubble}
                    countryChallengesSelectedKey={countryChallengesSelectedKey}
                    chartScale={chartScale}
                  />
                  <AnimatePresence>
                    {bubble.iso === countryISO && (
                      <motion.circle
                        key={`${bubble.iso}-aura`}
                        transition={animationTransitionConfig}
                        className={cx({
                          [styles.animatedBubble]: bubble.iso === countryISO,
                        })}
                        animate={{
                          cx: chartScale.xScale(
                            bubble.xAxisValues[countryChallengesSelectedKey]
                          ),
                        }}
                        exit={{ cx: 0 }}
                        cy={chartScale.yScale(bubble.yAxisValue)}
                        r={bubble.size}
                        fill={bubble.color}
                      />
                    )}
                    <motion.circle
                      key={bubble.iso}
                      transition={animationTransitionConfig}
                      animate={{
                        cx: chartScale.xScale(
                          bubble.xAxisValues[countryChallengesSelectedKey]
                        ),
                      }}
                      exit={{ cx: 0 }}
                      cy={chartScale.yScale(bubble.yAxisValue)}
                      r={bubble.size}
                      fill={bubble.color}
                      strokeWidth="2"
                      stroke="#040E14"
                    />
                  </AnimatePresence>
                  <foreignObject
                    width={bubble.size * 2}
                    height={bubble.size * 2}
                    key={bubble.iso}
                    y={chartScale.yScale(bubble.yAxisValue) - bubble.size}
                    x={
                      chartScale.xScale(
                        bubble.xAxisValues[countryChallengesSelectedKey]
                      ) - bubble.size
                    }
                    requiredExtensions="http://www.w3.org/1999/xhtml"
                    onMouseEnter={(e) => {
                      setTooltipState({
                        x: getX(e, chartSurfaceRef),
                        y: getY(e, chartSurfaceRef),
                        name: bubble.name,
                        continent: bubble.continent,
                        color: bubble.color,
                      });
                      setTickLine(bubble.iso);
                      setXAxisValue(
                        bubble.xAxisValues[countryChallengesSelectedKey]
                      );
                      setYAxisValue(bubble.yAxisValue);
                    }}
                    onMouseLeave={() => {
                      setTooltipState(null);
                      setTickLine(null);
                      setXAxisValue(null);
                      setYAxisValue(null);
                    }}
                  >
                    <div className={styles.bubbleTextContainer}>
                      <span className={styles.bubbleText}>{bubble.iso}</span>
                    </div>
                  </foreignObject>
                </g>
              ))}
          </svg>

          <div className={styles.yAxisTicksContainer}>
            {yAxisTicks &&
              yAxisTicks.map((tick) => (
                <span className={styles.tick} key={`y-${tick}`}>
                  {tick}
                </span>
              ))}
          </div>
          {yAxisValue && (
            <span
              className={cx(styles.tickValue, styles.yAxis)}
              style={{
                position: 'absolute',
                top: `${chartScale.yScale(yAxisValue)}px`,
              }}
            >
              {getLocaleNumber(yAxisValue, locale)}
            </span>
          )}
          {xAxisValue && (
            <span
              className={cx(styles.tickValue, styles.xAxis)}
              style={{
                position: 'absolute',
                left: `${chartScale.xScale(xAxisValue)}px`,
              }}
            >
              {formatFunction(xAxisValue)}
            </span>
          )}
          <div className={styles.xAxisTicksContainer}>
            {xAxisTicks &&
              xAxisTicks.map((tick, index) => (
                <span className={styles.tick} key={`x-${tick}-${index}`}>
                  {tick}
                </span>
              ))}
          </div>
        </div>
        {tooltipState && (
          <div
            className={styles.tooltip}
            style={{
              position: 'absolute',
              left: `${tooltipState.x + tooltipOffset}px`,
              top: `${tooltipState.y + tooltipOffset}px`,
            }}
          >
            <section
              className={styles.countryLabel}
              style={{ backgroundColor: tooltipState.color }}
            >
              <span className={styles.name}>{tooltipState.name} </span>
              <span className={styles.continent}>
                ({tooltipState.continent})
              </span>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default ScatterPlot;
