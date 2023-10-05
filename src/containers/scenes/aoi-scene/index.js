import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import aoisGeometriesActions from 'redux_modules/aois-geometries';

import { loadModules } from 'esri-loader';

import { useT } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
import { writeToForageItem } from 'utils/local-forage-utils';

import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import unionBy from 'lodash/unionBy';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';
import {
  FIREFLY_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';

import Component from './component.jsx';
import mapStateToProps from './selectors';
import { recoverOrCreateNotPrecalculatedAoi } from './utils/custom-aoi-scene-utils';
import { setPrecalculatedAOIs } from './utils/precalculated-aois-utils';

const actions = { ...urlActions, ...aoisGeometriesActions };

const INITIAL_SPECIES_STATE = {
  species: [],
};
// Protected areas are fetched on protected areas modal except for PA type AOIs
function AOIScene(props) {
  const {
    changeGlobe,
    aoiId,
    aoiStoredGeometry,
    activeLayers,
    precalculatedLayerSlug,
    objectId,
    activeCategoryLayers,
    changeUI,
  } = props;

  const t = useT();

  const [taxaData, setTaxaData] = useState([]);
  // These are handled independently as they come asyncronously
  const [areReptilesLoaded, setAreReptilesLoaded] = useState(false);
  const [areMammalsLoaded, setAreMammalsLoaded] = useState(false);
  const [areBirdsLoaded, setAreBirdsLoaded] = useState(false);
  const [areAmphibiansLoaded, setAreAmphibiansLoaded] = useState(false);
  const handleLoadedTaxaData = (taxaName) => {
    const loadedFunction = {
      birds: setAreBirdsLoaded,
      mammals: setAreMammalsLoaded,
      reptiles: setAreReptilesLoaded,
      amphibians: setAreAmphibiansLoaded,
    }[taxaName];
    loadedFunction(true);
  };
  const areAllTaxaLoaded = useMemo(
    () =>
      areReptilesLoaded &&
      areMammalsLoaded &&
      areBirdsLoaded &&
      areAmphibiansLoaded,
    [areReptilesLoaded, areMammalsLoaded, areBirdsLoaded, areAmphibiansLoaded]
  );
  const isAnyTaxaLoaded = useMemo(
    () =>
      areReptilesLoaded ||
      areMammalsLoaded ||
      areBirdsLoaded ||
      areAmphibiansLoaded,
    [areReptilesLoaded, areMammalsLoaded, areBirdsLoaded, areAmphibiansLoaded]
  );

  const [geometry, setGeometry] = useState(null);
  const [jsonUtils, setJsonUtils] = useState(null);
  const [contextualData, setContextualData] = useState(null);
  const [geometryEngine, setGeometryEngine] = useState(null);
  const [speciesData, setSpeciesData] = useState(INITIAL_SPECIES_STATE);
  const [storedArea, setStoredArea] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [updatedActiveLayers, setUpdatedActiveLayers] = useState(activeLayers);

  // Reset data when we change AOI (E.g. Country to WDPA)
  useEffect(() => {
    setSpeciesData(INITIAL_SPECIES_STATE);
    setContextualData({});
  }, [precalculatedLayerSlug]);

  // Add future places layer only if the AOI  is a future place
  useEffect(() => {
    if (precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.futurePlaces) {
      setUpdatedActiveLayers(
        unionBy({ title: HALF_EARTH_FUTURE_TILE_LAYER }, activeLayers, 'title')
      );
    }
  }, [precalculatedLayerSlug]);

  useEffect(() => {
    // Add temporary activeCategoryLayers to activeLayers at render and reset the param
    if (activeCategoryLayers) {
      setUpdatedActiveLayers(
        unionBy(activeCategoryLayers, activeLayers, 'title')
      );
      changeUI({ activeCategoryLayers: undefined });
    } else {
      setUpdatedActiveLayers(activeLayers);
    }
  }, [activeLayers]);

  useEffect(() => {
    loadModules([
      'esri/geometry/geometryEngine',
      'esri/geometry/support/jsonUtils',
    ]).then(([_geometryEngine, _jsonUtils]) => {
      setGeometryEngine(_geometryEngine);
      setJsonUtils(_jsonUtils);
    });
  }, []);

  // Get PRECALCULATED AOIs
  useEffect(() => {
    if (precalculatedLayerSlug && geometryEngine) {
      setPrecalculatedAOIs({
        precalculatedLayerSlug,
        aoiId,
        objectId,
        setGeometry,
        setContextualData,
        setTaxaData,
        handleLoadedTaxaData,
        setSpeciesData,
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
        handleLoadedTaxaData,
        setSpeciesData,
        t,
      });
    }
  }, [aoiId, geometryEngine, jsonUtils]);

  useEffect(() => {
    const orderedSpecies = orderBy(
      [...speciesData.species, ...taxaData],
      ['has_image', 'conservationConcern'],
      ['desc', 'desc']
    );
    setSpeciesData({ species: orderedSpecies });
  }, [taxaData]);

  // Reconcile all data until completely loaded
  useEffect(() => {
    if (!precalculatedLayerSlug && isAnyTaxaLoaded) {
      const updatedStoredArea =
        speciesData.species && speciesData.species.length > 0
          ? {
              ...storedArea,
              species: [...speciesData.species],
              ...contextualData,
            }
          : {
              ...storedArea,
              ...contextualData,
            };
      writeToForageItem(aoiId, updatedStoredArea);
      setStoredArea(updatedStoredArea, storedArea);
    }

    if (areAllTaxaLoaded && !contextualData.speciesNumbers) {
      // custom AOI don't have precalculated species numbers so we have to set them up
      const categoryGroupedSpecies =
        speciesData.species && groupBy(speciesData.species, 'category');
      const groupedSpecies =
        categoryGroupedSpecies &&
        Object.keys(categoryGroupedSpecies).reduce((acc, key) => {
          acc[key.split('_')[0]] = categoryGroupedSpecies[key].length;
          return acc;
        }, {});

      // Wait until the numbers are set
      setContextualData({
        ...contextualData,
        speciesNumbers: {
          nspecies: speciesData && speciesData.species.length,
          ...groupedSpecies,
        },
      });
    }

    if (areAllTaxaLoaded && contextualData.speciesNumbers) {
      setLoaded(true);
    }
  }, [speciesData, precalculatedLayerSlug, contextualData]);

  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, initialActiveLayers) => {
    setBasemap({
      map,
      surfaceColor: '#070710',
      layersArray: [FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER],
    });
    activateLayersOnLoad(map, initialActiveLayers, layersConfig);
  };

  const handleFuturePlaceClick = (results) => {
    if (!results) return;
    const { graphic } = results[0] || {};
    if (!graphic) return;
    const { attributes, geometry: graphicGeo } = graphic;
    setTooltipInfo({ attributes, geometry: graphicGeo });
  };

  return (
    <Component
      {...props}
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
      activeLayers={updatedActiveLayers}
    />
  );
}

export default connect(mapStateToProps, actions)(AOIScene);
