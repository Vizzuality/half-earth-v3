import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';
import aoisGeometriesActions from 'redux_modules/aois-geometries';

import { loadModules } from 'esri-loader';

import { useT } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
import { writeToForageItem } from 'utils/local-forage-utils';

import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import unionBy from 'lodash/unionBy';

import { AREA_TYPES } from 'constants/aois';
import { HALF_EARTH_FUTURE_TILE_LAYER, FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';

import { setPrecalculatedAOIs, recoverOrCreateNotPrecalculatedAoi } from './aoi-scene-utils';
import Component from './component.jsx';
import mapStateToProps from './selectors';

const actions = { ...urlActions, ...aoisActions, ...aoisGeometriesActions };

const {
  REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL: FEATURE_MERGE_NATIONAL_SUBNATIONAL,
} = process.env;

// Protected areas are fetched on protected areas modal except for PA type AOIs
function AOIScene(props) {
  const {
    changeGlobe,
    aoiId,
    aoiStoredGeometry,
    activeLayers,
    precalculatedLayerSlug,
    setAreaTypeSelected,
    areaTypeSelected,
    objectId,
    categoryActiveLayers,
  } = props;

  const t = useT();

  const [taxaData, setTaxaData] = useState([]);
  const [geometry, setGeometry] = useState(null);
  const [jsonUtils, setJsonUtils] = useState(null);
  const [contextualData, setContextualData] = useState({});
  const [geometryEngine, setGeometryEngine] = useState(null);
  const [speciesData, setSpeciesData] = useState({ species: [] });
  const [storedArea, setStoredArea] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [tooltipInfo, setTooltipInfo] = useState(null);

  const getAreaType = (attributes) => {
    let areaType = AREA_TYPES.protected;
    if (attributes.GID_1) {
      areaType = AREA_TYPES.subnational;
    } else if (attributes.GID_0) {
      areaType = AREA_TYPES.national;
    }
    !FEATURE_MERGE_NATIONAL_SUBNATIONAL && setAreaTypeSelected(areaType);
    return areaType;
  };

  const updatedActiveLayers = useMemo(() => {
    const mergeLayers = unionBy(categoryActiveLayers, activeLayers, 'title');

    return (areaTypeSelected === AREA_TYPES.futurePlaces)
      ? mergeLayers : mergeLayers.filter((l) => l.title !== HALF_EARTH_FUTURE_TILE_LAYER);
  }, [categoryActiveLayers, activeLayers, areaTypeSelected]);

  useEffect(() => {
    loadModules(['esri/geometry/geometryEngine', 'esri/geometry/support/jsonUtils']).then(([geometryEngine, jsonUtils]) => {
      setGeometryEngine(geometryEngine);
      setJsonUtils(jsonUtils);
    });
  }, []);

  // Get PRECALCULATED AOIs
  useEffect(() => {
    if (precalculatedLayerSlug && geometryEngine) {
      setPrecalculatedAOIs({
        areaTypeSelected,
        precalculatedLayerSlug,
        aoiId,
        objectId,
        setGeometry,
        setContextualData,
        setTaxaData,
        setSpeciesData,
        getAreaType,
        changeGlobe,
        t,
      });
    }
  }, [precalculatedLayerSlug, geometryEngine, objectId]);

  // Get NOT PRECALCULATED AOIs
  useEffect(() => {
    if (aoiId && geometryEngine && jsonUtils && !precalculatedLayerSlug) {
      recoverOrCreateNotPrecalculatedAoi({
        aoiStoredGeometry,
        geometryEngine,
        aoiId,
        jsonUtils,
        setContextualData,
        setGeometry,
        setStoredArea,
        setTaxaData,
        setSpeciesData,
        setAreaTypeSelected,
        t,
      });
    }
  }, [aoiId, geometryEngine, jsonUtils]);

  useEffect(() => {
    const orderedSpecies = orderBy([...speciesData.species, ...taxaData], ['has_image', 'conservationConcern'], ['desc', 'desc']);
    setSpeciesData({ species: orderedSpecies });
  }, [taxaData]);

  // Reconcile all data until completely loaded
  useEffect(() => {
    const hasAllData = speciesData
      && contextualData
        && !isEmpty(contextualData)
          && (!contextualData.isCustom || contextualData.protectedAreasList);
    if (!precalculatedLayerSlug && hasAllData) {
      const updatedStoredArea = (speciesData.species && speciesData.species.length > 0) ? {
        ...storedArea,
        species: [...speciesData.species],
        ...contextualData,
      } : {
        ...storedArea,
        ...contextualData,
      };
      writeToForageItem(aoiId, updatedStoredArea);
      setStoredArea(updatedStoredArea, storedArea);
    }

    if (hasAllData) {
      setLoaded(true);
    }
  }, [speciesData, precalculatedLayerSlug, contextualData]);

  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({ map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER] });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  const handleFuturePlaceClick = (results) => {
    if (!results) return;
    const { graphic } = results[0] || {};
    if (!graphic) return;
    const { attributes, geometry } = graphic;
    setTooltipInfo({ attributes, geometry });
  };

  return (
    <Component
      geometry={geometry}
      speciesData={speciesData}
      contextualData={contextualData}
      handleGlobeUpdating={handleGlobeUpdating}
      handleFuturePlaceClick={handleFuturePlaceClick}
      onMapLoad={(map) => handleMapLoad(map, updatedActiveLayers)}
      dataLoaded={loaded}
      tooltipInfo={tooltipInfo}
      setTooltipInfo={setTooltipInfo}
      aoiId={aoiId}
      updatedActiveLayers={updatedActiveLayers}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(AOIScene);
