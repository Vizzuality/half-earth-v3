import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import localforage from 'localforage';
import { loadModules } from 'esri-loader';
import mapStateToProps from './selectors';
import * as urlActions from 'actions/url-actions';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import { fetchDataAndUpdateForageAoi, writeToItem } from 'utils/local-forage-utils';
import { calculateGeometryArea } from 'utils/analyze-areas-utils';
import { getEluData, getPopulationData, getProtectedAreasListData, getLandPressuresData, getPercentageProtectedData, getAoiFromDataBase } from 'utils/geo-processing-services';
import { DATA } from 'router'

import Component from './component.jsx';

const actions = {...urlActions, aoisGeometriesActions};

const Container = props => {
  const { changeGlobe, aoiId, aoiStoredGeometry, precalculatedLayerSlug, browsePage } = props;

  const [elu, setEluData] = useState(null);
  const [aoiData, setAoiData] = useState({})
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

  // useEffect(() => {
  //   if (precalculatedLayerSlug) {
  //     console.log('PRECALCULATED DATA', precalculatedLayerSlug)
  //   }
  // }, [precalculatedLayerSlug])

  // Add aoi to local storage historic
  useEffect(() => {
    if (geometryEngine &&  jsonUtils) {
      localforage.getItem(aoiId).then((localStoredAoi) => {
        if (localStoredAoi) {
          const { jsonGeometry, ...rest } = localStoredAoi;
          setAoiData({ ...rest });
          setGeometry(jsonUtils.fromJSON(jsonGeometry));
        } else {
            getAoiFromDataBase(aoiId).then((aoiData) => {
            if (aoiData) {
              console.log('data from arcgisonline', aoiData)
              setAoiData(aoiData);
            } else {
              const area = calculateGeometryArea(aoiStoredGeometry, geometryEngine);
              const jsonGeometry = aoiStoredGeometry.toJSON();
              setAreaData({area});
              setGeometry(jsonUtils.fromJSON(jsonGeometry));
              writeToItem(aoiId, {jsonGeometry, area});
              fetchDataAndUpdateForageAoi(aoiId, getEluData, aoiStoredGeometry).then(data => setEluData(data));
              fetchDataAndUpdateForageAoi(aoiId, getPopulationData, aoiStoredGeometry).then(data => setPopulationData(data));
              fetchDataAndUpdateForageAoi(aoiId, getLandPressuresData, aoiStoredGeometry).then(data => setPressuresData(data));
              fetchDataAndUpdateForageAoi(aoiId, getProtectedAreasListData, aoiStoredGeometry).then(data => setProtectedAreasListData(data));
              fetchDataAndUpdateForageAoi(aoiId, getPercentageProtectedData, aoiStoredGeometry).then(data => setPercentageProtectedData(data));
            }
          }) 
        }
      }).catch((error) => {
        console.error(error)
      })
    }

  }, [aoiId, geometryEngine, jsonUtils])

  useEffect(() => {
    setAoiData({
      ...elu,
      ...area,
      ...pressures,
      ...population,
      ...protectedAreasList,
      ...percentageProtected,
    })
  },[elu, area, population, pressures, percentageProtected, protectedAreasList])

  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  

  return (
    <Component
      aoiData={aoiData}
      geometry={geometry}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(Container);