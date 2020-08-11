import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { ease } from 'pixi-ease';
import circleImg from 'images/country-bubble.png'
import * as d3 from 'd3';
import cx from 'classnames';

import styles from './scatter-plot-styles.module.scss';

const ScatterPlot = ({
  data,
  xAxisTicks,
  yAxisTicks,
  countryISO,
  xAxisLabels,
  onBubbleClick,
  countryChallengesSelectedKey,
}) => {
  const chartSurfaceRef = useRef(null);
  const [countriesArray, setCountriesArray] = useState([]);
  const [chartScale, setChartScale] = useState(null);
  const [tooltipState, setTooltipState] = useState(null);
  const padding = 40; // for chart edges
  const tooltipOffset = 50;
  const bigBubble = 90;
  const smallBubble = 45;
  const [appConfig, setAppConfig ] = useState({
    ready: false,
    App: null,
    DomContainer: null,
    AppContainer: null,
    CircleTexture: null
  })


  // init PIXI app and pixi viewport
  useEffect(() => {
    if (chartSurfaceRef.current && data) {
      const App = new PIXI.Application({
        width: chartSurfaceRef.current.offsetWidth,
        height: chartSurfaceRef.current.offsetHeight,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        resizeTo: chartSurfaceRef.current,
        resizeThrottle: 250,
      })

      setAppConfig({
        ...appConfig,
        App,
        DomContainer: chartSurfaceRef.current,
        AppContainer: new PIXI.Container(),
        CircleTexture: PIXI.Texture.from(circleImg),
        ready: true
      })

      const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
          return d.xAxisValues[countryChallengesSelectedKey];
      })])
      .range([padding, chartSurfaceRef.current.offsetWidth - padding * 2]);

      const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
          return d.yAxisValue;
      })])
      .range([chartSurfaceRef.current.offsetHeight - padding, padding])

      setChartScale({ xScale, yScale })
    }
    }, [chartSurfaceRef.current, data]);

    useEffect(() => {
      if (appConfig.ready) {
        const { App, AppContainer, DomContainer, CircleTexture } = appConfig
        AppContainer.sortableChildren = true;
        DomContainer.appendChild(App.view);
        App.stage.addChild(AppContainer);
        
        const bubbles = data.map(d => {
          const bubbleWrapper = new PIXI.Container();
          bubbleWrapper.y = chartScale.yScale(d.yAxisValue);
          bubbleWrapper.x = chartScale.xScale(d.xAxisValues[countryChallengesSelectedKey]);
          const country = new PIXI.Sprite(CircleTexture);
          country.attributes = d;
          country.anchor.set(0.5);
          country.tint = PIXI.utils.string2hex(d.color);
          country.interactive = true;
          country.buttonMode = true;
          const textStyle = new PIXI.TextStyle({fontFamily: 'Arial, sans', fontSize: 16, fill: '#ffffff'})
          const countryIsoText = new PIXI.Text(d.iso, textStyle);
          countryIsoText.anchor.set(0.5)
          bubbleWrapper.addChild(country);
          bubbleWrapper.addChild(countryIsoText);
          AppContainer.addChild(bubbleWrapper);
          return bubbleWrapper;
        })
        setCountriesArray(bubbles)
      }
    }, [appConfig.ready])

    useEffect(() => {
      if (countriesArray.length) {
        const newXScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.xAxisValues[countryChallengesSelectedKey];
        })])
        .range([padding, chartSurfaceRef.current.offsetWidth - padding * 2])
        countriesArray.forEach((country, index) => {
          ease.add(country, {x: newXScale(data[index].xAxisValues[countryChallengesSelectedKey])}, {duration: 1500, ease: 'easeInOutExpo', wait: index * 2 });
        })
      }
    }, [countryChallengesSelectedKey])

    useEffect(() => {
      if (countriesArray.length && countryISO) {
        countriesArray.forEach((bubble, index) => {
          const { children } = bubble;
          const country = children[0];
          country.removeAllListeners()
          const isSelectedCountry = countryISO === data[index].iso;
          if (isSelectedCountry) { bubble.zIndex = 1}
          country.width = isSelectedCountry ? bigBubble : smallBubble;
          country.height = isSelectedCountry ? bigBubble : smallBubble;
          country.alpha = 0.6;
          
          country.blendMode = isSelectedCountry ? PIXI.BLEND_MODES.NORMAL : PIXI.BLEND_MODES.ADD;
          if (isSelectedCountry) {
            ease.add(country, {alpha: 1}, {reverse: true, repeat: true, duration: 700, ease: 'easeInOutExpo'});
          } else {
            ease.removeEase(country);
          }
          country.on('pointerover', e => {
            setTooltipState({
              x: e.data.global.x,
              y: e.data.global.y,
              name: data[index].name,
              continent: data[index].continent,
              color: data[index].color,
              yValue: Number.parseFloat(data[index].yAxisValue).toFixed(2),
              yLabel: 'Species Protection Index',
              xValue: filter => data[index].xAxisValues[filter],
              xLabel: filter => xAxisLabels[filter]
            })
            if (!isSelectedCountry) {
              ease.add(country, {
                width: bigBubble,
                height: bigBubble,
              }, {duration: 150, ease: 'easeInOutExpo' });
            }
          });
          
          // mouse leave
          country.on('pointerout', e => {
            setTooltipState(null)
            if (!isSelectedCountry) {
              ease.add(country, {
                width: smallBubble,
                height: smallBubble,
              }, {duration: 150, ease: 'easeInOutExpo' });
            }
          });
    
          country.on('click', e => {
            if (!isSelectedCountry) {
              onBubbleClick({ countryISO: data[index].iso, countryName: data[index].name })
            }
          })
        })
      }
    },[countryISO, countriesArray])

  
  return (
    <>
      <div className={cx(styles.chartContainer)}>
        <div className={styles.scatterPlotContainer} ref={chartSurfaceRef}>
          <div className={styles.yAxisTicksContainer}>
            {yAxisTicks && yAxisTicks.map(tick => <span className={styles.tick}>{tick}</span>)}
          </div>
          <div className={styles.xAxisTicksContainer}>
            {xAxisTicks && xAxisTicks.map(tick => <span className={styles.tick}>{tick}</span>)}
          </div>
        </div>
        {tooltipState &&
          <div className={styles.tooltip} style={{ position: 'absolute', left: `${tooltipState.x + tooltipOffset}px`, top:`${tooltipState.y + tooltipOffset}px`}}>
            <section className={styles.countryLabel} style={{ backgroundColor: tooltipState.color}}>
              <span className={styles.name}>{tooltipState.name} </span>
              <span className={styles.continent}>({tooltipState.continent})</span>
            </section>
            <section className={styles.countryData}>
              <p className={styles.data}>{tooltipState.xLabel(countryChallengesSelectedKey)}: {tooltipState.xValue(countryChallengesSelectedKey)}</p>
              <p className={styles.data}>{tooltipState.yLabel}: {tooltipState.yValue}</p>
            </section>
          </div>
        }
      </div>
    </>
  )
}

export default ScatterPlot;