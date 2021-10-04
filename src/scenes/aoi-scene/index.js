// import React from 'react';
// import Component from './component.jsx';
// import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
// import { layersConfig } from 'constants/mol-layers-configs';
// import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';

// const AoiSceneContainer = (props) => {
//   const { activeLayers } = props;
//   const handleMapLoad = (map, activeLayers) => {
//     setBasemap({map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER]});
//     activateLayersOnLoad(map, activeLayers, layersConfig);
//   }

//   return (
//     <Component
//       onMapLoad={(map) => handleMapLoad(map, activeLayers)}
//       {...props}
//     />
//   )
// }

// export default AoiSceneContainer;




import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import localforage from 'localforage';
import { loadModules } from 'esri-loader';
import mapStateToProps from './selectors';
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
  getPopulationData,
  getAoiFromDataBase, 
  getBiodiversityData,
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

const actions = {...urlActions, aoisGeometriesActions};

const Container = props => {
  const { changeGlobe, aoiId, aoiStoredGeometry, activeLayers, precalculatedLayerSlug } = props;

  const [elu, setEluData] = useState(null);
  const [aoiData, setAoiData] = useState({})
  const [area, setAreaData] = useState(null);
  const [birds, setBirdsData] = useState(null);
  const [mammals, setMammalsData] = useState(null);
  const [reptiles, setReptilesData] = useState(null);
  const [amphibians, setAmphibiansData] = useState(null);
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
              writeToForageItem(aoiId, {jsonGeometry, area});
              fetchDataAndUpdateForageItem(aoiId, getEluData, aoiStoredGeometry).then(data => setEluData(data));
              fetchDataAndUpdateForageItem(aoiId, getPopulationData, aoiStoredGeometry).then(data => setPopulationData(data));
              fetchDataAndUpdateForageItem(aoiId, getLandPressuresData, aoiStoredGeometry).then(data => setPressuresData(data));
              fetchDataAndUpdateForageItem(aoiId, getProtectedAreasListData, aoiStoredGeometry).then(data => setProtectedAreasListData(data));
              fetchDataAndUpdateForageItem(aoiId, getPercentageProtectedData, aoiStoredGeometry).then(data => setPercentageProtectedData(data));
              fetchDataAndUpdateForageItem(aoiId, getBiodiversityData(BIRDS), aoiStoredGeometry).then(data => setBirdsData(data));
              fetchDataAndUpdateForageItem(aoiId, getBiodiversityData(MAMMALS), aoiStoredGeometry).then(data => setMammalsData(data));
              fetchDataAndUpdateForageItem(aoiId, getBiodiversityData(REPTILES), aoiStoredGeometry).then(data => setReptilesData(data));
              fetchDataAndUpdateForageItem(aoiId, getBiodiversityData(AMPHIBIANS), aoiStoredGeometry).then(data => setAmphibiansData(data));
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
      ...birds,
      ...mammals,
      ...reptiles,
      ...pressures,
      ...amphibians,
      ...population,
      ...protectedAreasList,
      ...percentageProtected,
    })
  },[elu, area, birds, mammals, reptiles, amphibians, population, pressures, percentageProtected, protectedAreasList])

  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER]});
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  return (
    <Component
      aoiData={aoiData}
      geometry={geometry}
      handleGlobeUpdating={handleGlobeUpdating}
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(Container);