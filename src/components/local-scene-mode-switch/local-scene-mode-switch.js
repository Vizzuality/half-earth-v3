import React, { useState, useEffect }  from 'react';
import { loadModules } from 'esri-loader';
import { LAYERS_URLS } from 'constants/layers-urls';
import { COUNTRIES_DATA_FEATURE_LAYER } from 'constants/layers-slugs';
import * as d3 from 'd3';
import { CONTINENT_COLORS } from 'constants/country-mode-constants';

import Component from './local-scene-mode-switch-component';

const LocalSceneModeSwitch = (props) => {
  const [countriesDataLayer, setCountriesDataLayer] = useState(null);
  const [scatterPlotData, setScatterPlotData] = useState([]);

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countriesDataLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_DATA_FEATURE_LAYER]
      });
      _countriesDataLayer.outFields = ['*'];
      setCountriesDataLayer(_countriesDataLayer)
    });
  }, []);

  const getCircleSize = (areaSize, maxArea) => {
    const MIN_R_SIZE = 2;
    const MAX_R_SIZE = 42;
    return Math.round(MAX_R_SIZE * areaSize / maxArea + MIN_R_SIZE);
    // return Math.round(MAX_R_SIZE * Math.log(areaSize) / Math.log(maxArea) + MIN_R_SIZE);
    // return 12;
  }

  useEffect(() => {
    if (countriesDataLayer) {
      const query = countriesDataLayer.createQuery();
      countriesDataLayer.queryFeatures(query)
      .then((results) => {
        const { features } = results;
        const biggestCountryArea = d3.max(features, ({ attributes }) => {
          return attributes.Area;
        });
        const _scatterPlotData = features.map(({ attributes }) => {
          return {
            size: getCircleSize(attributes.Area, biggestCountryArea),
            color: CONTINENT_COLORS[attributes.continent] || '#fff',
            iso: attributes.GID_0,
            xAxisValues: {
              Population2016: attributes.Population2016,
              GNI_PPP: attributes.GNI_PPP,
              prop_hm_very_high: attributes.prop_hm_very_high,
              total_endemic: attributes.total_endemic,
              N_SPECIES: attributes.N_SPECIES
            },
            yAxisValue: attributes.SPI
          };
        })
        setScatterPlotData(_scatterPlotData);
      })
      .catch((error) => {
      });
    }
  }, [countriesDataLayer])

  return <Component scatterPlotData={scatterPlotData}/>
}

export default LocalSceneModeSwitch;