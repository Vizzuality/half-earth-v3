import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { ease } from 'pixi-ease';
import circleImg from 'images/country-bubble.png'
import * as d3 from 'd3';
import cx from 'classnames';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';
import { ReactComponent as PlusIcon } from 'icons/zoomIn.svg';

import styles from './scatter-plot-styles.module.scss';

const ScatterPlot = ({
  data,
  countryISO,
  changeGlobe,
  xAxisLabels,
  countryChallengesSelectedKey,
  handleSelectNextIndicator,
  handleSelectPreviousIndicator,
}) => {
  const chartSurfaceRef = useRef(null);
  const [countriesArray, setCountriesArray] = useState([]);
  const [chartScale, setChartScale] = useState(null);
  const [tooltipState, setTooltipState] = useState(null);
  const padding = 40; // for chart edges
  const tooltipOffset = 50;
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
      setAppConfig({
        ...appConfig,
        App: new PIXI.Application({
            width: chartSurfaceRef.current.offsetWidth,
            height: chartSurfaceRef.current.offsetHeight,
            transparent: true,
            resolution: window.devicePixelRatio || 1,
        }),
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
    // return function cleanUp() {
    //   chartSurfaceRef.current && chartSurfaceRef.current.remove();
    // }
    }, [chartSurfaceRef.current, data]);

    useEffect(() => {
      if (appConfig.ready && data) {
        const { App, AppContainer, DomContainer, CircleTexture } = appConfig
        DomContainer.appendChild(App.view);
        App.stage.addChild(AppContainer);
        
        const countries = data.map(d => {
          const country = new PIXI.Sprite(CircleTexture);
          country.attributes = d;
          country.anchor.set(0.5);
          country.x = chartScale.xScale(d.xAxisValues[countryChallengesSelectedKey]);
          country.y = chartScale.yScale(d.yAxisValue);
          country.tint = PIXI.utils.string2hex(d.color);
          country.interactive = true;
          country.buttonMode = true;

          AppContainer.addChild(country);
          return country;
        })
        setCountriesArray(countries)
      }
    }, [appConfig.ready, data])

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

    // useEffect(() => {
    //   const { App } = appConfig;
    //   const animatedCountries = [];
      
    //   if (App && countriesArray.length) {
    //     console.log()
    //     countriesArray.forEach((country, index) => {
    //       const animation = ease.add(country, {x: chartScale.xScale(data[index].xAxisValues[countryChallengesSelectedKey])}, {duration: 1500, ease: 'easeInOutExpo', wait: index * 2 });
    //       animatedCountries.push(animation);
    //     })
    //   }
    //   return function cleanUp() {
    //     if (animatedCountries.length) {
    //       console.log(animatedCountries)
    //       animatedCountries.forEach(ease => ease.remove())
    //     }
    //   }
    // }, [countryChallengesSelectedKey])

    useEffect(() => {
      if (countriesArray.length && countryISO) {
        countriesArray.forEach((country, index) => {
          country.removeAllListeners()
          const isSelectedCountry = countryISO === data[index].iso;
          country.width = isSelectedCountry ? 70 : 30;
          country.height = isSelectedCountry ? 70 : 30;
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
              xValue: Number.parseFloat(data[index].xAxisValues[countryChallengesSelectedKey]).toFixed(2),
              xLabel: xAxisLabels[countryChallengesSelectedKey]
            })
            if (!isSelectedCountry) {
              ease.add(country, {
                width: 70,
                height: 70,
              }, {duration: 150, ease: 'easeInOutExpo' });
            }
          });
          
          // mouse leave
          country.on('pointerout', e => {
            setTooltipState(null)
            if (!isSelectedCountry) {
              ease.add(country, {
                width: 30,
                height: 30,
              }, {duration: 150, ease: 'easeInOutExpo' });
            }
          });
    
          country.on('click', e => {
            if (!isSelectedCountry) {
              changeGlobe({countryISO: data[index].iso, countryName: data[index].name, zoom: null, center: null})
            }
          })
        })
      }
    },[countryISO, countriesArray])

  
  return (
    <>
      <span className={styles.chartTitle}>Countries Challenges</span>
      <div className={cx(styles.chartContainer)}>
        <PlusIcon className={styles.plusIcon}/>
        <div className={styles.scatterPlotContainer} ref={chartSurfaceRef}/>
      </div>
      <div className={styles.xAxisContainer}>
        <span className={styles.zeroLabel}>0</span>
        <div className={styles.xAxisLabelContainer}>
          <button onClick={handleSelectPreviousIndicator} style={{ transform: "scaleX(-1)" }}>
            <ArrowButton />
          </button>
          <span className={styles.xAxisLabel}>{xAxisLabels[countryChallengesSelectedKey]}</span>
          <button onClick={handleSelectNextIndicator}>
            <ArrowButton />
          </button>
        </div>
        <PlusIcon className={styles.plusIcon}/>
        {tooltipState &&
          <div className={styles.tooltip} style={{ position: 'absolute', left: `${tooltipState.x + tooltipOffset}px`, top:`${tooltipState.y + tooltipOffset}px`}}>
            <section className={styles.countryLabel} style={{ backgroundColor: tooltipState.color}}>
              <span className={styles.name}>{tooltipState.name} </span>
              <span className={styles.continent}>({tooltipState.continent})</span>
            </section>
            <section className={styles.countryData}>
              <p className={styles.data}>{tooltipState.xLabel}: {tooltipState.xValue}</p>
              <p className={styles.data}>{tooltipState.yLabel}: {tooltipState.yValue}</p>
            </section>
          </div>
        }
      </div>
    </>
  )
}

export default ScatterPlot;