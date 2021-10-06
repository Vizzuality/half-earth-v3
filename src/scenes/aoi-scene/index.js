import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import localforage from 'localforage';
import { loadModules } from 'esri-loader';
import mapStateToProps from './selectors';
import EsriFeatureService from 'services/esri-feature-service';
import * as urlActions from 'actions/url-actions';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import {
  fetchDataAndUpdateForageItem,
  writeToForageItem
} from 'utils/local-forage-utils';
import { calculateGeometryArea } from 'utils/analyze-areas-utils';
import { 
  getEluData,
  getSpeciesData,
  getPopulationData,
  getAoiFromDataBase, 
  getLandPressuresData,
  getProtectedAreasListData,
  getPercentageProtectedData,
} from 'utils/geo-processing-services';
import {
  BIRDS,
  MAMMALS,
  REPTILES,
  AMPHIBIANS,
} from 'constants/geo-processing-services';

import Component from './component.jsx';
import { LAYERS_URLS } from 'constants/layers-urls';

const actions = {...urlActions, aoisGeometriesActions};

const Container = props => {
  const { changeGlobe, aoiId, aoiStoredGeometry, activeLayers, precalculatedLayerSlug } = props;

  const [elu, setEluData] = useState(null);
  const [speciesData, setSpeciesData] = useState({species: []})
  const [taxaData, setTaxaData] = useState([])
  const [contextualData, setContextualData] = useState({})
  const [area, setAreaData] = useState(null);
  const [geometry, setGeometry] = useState(null);
  const [jsonUtils, setJsonUtils] = useState(null);
  const [pressures, setPressuresData] = useState(null);
  const [population, setPopulationData] = useState(null);
  const [geometryEngine, setGeometryEngine] = useState(null);
  const [percentageProtected, setPercentageProtectedData] = useState(null);
  const [protectedAreasList, setProtectedAreasListData] = useState(null);

  useEffect(() => {
    loadModules(["esri/geometry/geometryEngine", "esri/geometry/support/jsonUtils"]).then(([geometryEngine, jsonUtils]) => {
      setGeometryEngine(geometryEngine);
      setJsonUtils(jsonUtils);
    })
  }, [])

  useEffect(() => {
    if (precalculatedLayerSlug && geometryEngine) {
      console.log('PRECALCULATED DATA', precalculatedLayerSlug)
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[precalculatedLayerSlug],
        whereClause: `MOL_ID = '${aoiId}'`,
        returnGeometry: true
      }).then((features) => {
        console.log(features)
        const { geometry, attributes } = features[0];
        console.log(attributes.amphibians)
        // const amphibians = JSON.parse(attributes.amphibians);
        // console.log(amphibians)
        setGeometry(geometry);
        const area = calculateGeometryArea(geometry, geometryEngine)
        setAreaData({area});
      })
    }
  }, [precalculatedLayerSlug, geometryEngine])

  
  useEffect(() => {
    if (geometryEngine &&  jsonUtils && !precalculatedLayerSlug) {
      localforage.getItem(aoiId).then((localStoredAoi) => {
        if (localStoredAoi) {
          const { jsonGeometry, species, ...rest } = localStoredAoi;
          setSpeciesData({species});
          setContextualData({ ...rest })
          setGeometry(jsonUtils.fromJSON(jsonGeometry));
        } else {
            getAoiFromDataBase(aoiId).then((aoiData) => {
            if (aoiData) {
              console.log('data from arcgisonline', aoiData)
              const { geometry, species, ...rest } = aoiData;
              setGeometry(geometry);
              setSpeciesData(species);
              setContextualData({ ...rest })
            } else {
              const area = calculateGeometryArea(aoiStoredGeometry, geometryEngine);
              const jsonGeometry = aoiStoredGeometry.toJSON();
              setAreaData({area});
              setGeometry(jsonUtils.fromJSON(jsonGeometry));
              writeToForageItem(aoiId, {jsonGeometry, area});
              fetchDataAndUpdateForageItem(aoiId, getEluData, aoiStoredGeometry).then(data => setEluData(data));
              fetchDataAndUpdateForageItem(aoiId, getPopulationData, aoiStoredGeometry).then(data => setPopulationData(data));
              fetchDataAndUpdateForageItem(aoiId, getLandPressuresData, aoiStoredGeometry).then(data => setPressuresData(data));
              fetchDataAndUpdateForageItem(aoiId, getProtectedAreasListData, aoiStoredGeometry).then(data => setProtectedAreasListData(data));
              fetchDataAndUpdateForageItem(aoiId, getPercentageProtectedData, aoiStoredGeometry).then(data => setPercentageProtectedData(data));
              getSpeciesData(BIRDS, aoiStoredGeometry).then(data => setTaxaData(data));
              getSpeciesData(MAMMALS, aoiStoredGeometry).then(data => setTaxaData(data));
              getSpeciesData(REPTILES, aoiStoredGeometry).then(data => setTaxaData(data));
              getSpeciesData(AMPHIBIANS, aoiStoredGeometry).then(data => setTaxaData(data));
            }
          }) 
        }
      }).catch((error) => {
        console.error(error)
      })
    }

  }, [aoiId, geometryEngine, jsonUtils])

  useEffect(() => {
    setContextualData({
      ...elu,
      ...area,
      ...pressures,
      ...population,
      ...protectedAreasList,
      ...percentageProtected,
    })
  },[elu, area, population, pressures, percentageProtected, protectedAreasList]);

  useEffect(() => {
    setSpeciesData({
      species: [
        ...speciesData.species,
        ...taxaData
      ]
    })
  },[taxaData])


  useEffect(() => {
    if(speciesData.species.length > 0 && !precalculatedLayerSlug) {
      writeToForageItem(aoiId, {species: [...speciesData.species]});
    }
  },[speciesData, precalculatedLayerSlug]);


  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER]});
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  return (
    <Component
      geometry={geometry}
      speciesData={speciesData}
      contextualData={contextualData}
      handleGlobeUpdating={handleGlobeUpdating}
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(Container);