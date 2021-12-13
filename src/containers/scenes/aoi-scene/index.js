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
  writeToForageItem
} from 'utils/local-forage-utils';
import { calculateGeometryArea } from 'utils/analyze-areas-utils';
import { 
  getSpeciesData,
  getContextData,
  getAoiFromDataBase, 
  getPrecalculatedSpeciesData,
  getPrecalculatedContextualData,
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

  const [taxaData, setTaxaData] = useState([])
  const [geometry, setGeometry] = useState(null);
  const [jsonUtils, setJsonUtils] = useState(null);
  const [contextualData, setContextualData] = useState({})
  const [geometryEngine, setGeometryEngine] = useState(null);
  const [speciesData, setSpeciesData] = useState({species: []})

  useEffect(() => {
    loadModules(["esri/geometry/geometryEngine", "esri/geometry/support/jsonUtils"]).then(([geometryEngine, jsonUtils]) => {
      setGeometryEngine(geometryEngine);
      setJsonUtils(jsonUtils);
    })
  }, [])

  // This is where we fetch the precalculated AOIs data
  useEffect(() => {
    if (precalculatedLayerSlug && geometryEngine) {
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[precalculatedLayerSlug],
        whereClause: `MOL_ID = '${aoiId}'`,
        returnGeometry: true
      }).then((features) => {
        const { geometry, attributes } = features[0];
        setGeometry(geometry);
        setContextualData(getPrecalculatedContextualData(attributes, precalculatedLayerSlug))
        getPrecalculatedSpeciesData(BIRDS, attributes.birds).then(data => setTaxaData(data));
        getPrecalculatedSpeciesData(MAMMALS, attributes.mammals).then(data => setTaxaData(data));
        getPrecalculatedSpeciesData(REPTILES, attributes.reptiles).then(data => setTaxaData(data));
        getPrecalculatedSpeciesData(AMPHIBIANS, attributes.amphibians).then(data => setTaxaData(data));
      })
    }
  }, [precalculatedLayerSlug, geometryEngine])

  
  useEffect(() => {
    if (aoiId && geometryEngine &&  jsonUtils && !precalculatedLayerSlug) {
      localforage.getItem(aoiId).then((localStoredAoi) => {
        // If the AOI is not precalculated
        // we first search on the AOIs history stored on the browser
        if (localStoredAoi && localStoredAoi.species && localStoredAoi.jsonGeometry) {
          const { jsonGeometry, species, ...rest } = localStoredAoi;
          setSpeciesData({species});
          setContextualData({ ...rest })
          setGeometry(jsonUtils.fromJSON(jsonGeometry));
        } else {
            // We then try to get the calculations from the 
            // shared AOIs database on the servers
            getAoiFromDataBase(aoiId).then((aoiData) => {
            if (aoiData) {
              const { geometry, species, ...rest } = aoiData;
              setGeometry(geometry);
              setSpeciesData(species);
              setContextualData({ ...rest })
            } else {
              // An if we don't have it anywhere we just execute the GP services job
              const areaName = 'Custom area';
              const jsonGeometry = aoiStoredGeometry.toJSON();
              const area = calculateGeometryArea(aoiStoredGeometry, geometryEngine);
              setContextualData({area, areaName});
              setGeometry(jsonUtils.fromJSON(jsonGeometry));
              writeToForageItem(aoiId, {jsonGeometry, area, areaName, timestamp: Date.now()});
              getContextData(aoiStoredGeometry).then(data => setContextualData({ area, areaName, ...data }));
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

  useEffect(() => {
    if(!precalculatedLayerSlug) {
      writeToForageItem(aoiId, {...contextualData});
    }
  },[contextualData, precalculatedLayerSlug]);

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