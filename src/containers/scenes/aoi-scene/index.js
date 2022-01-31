import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import localforage from 'localforage';
import orderBy from 'lodash/orderBy';
import { loadModules } from 'esri-loader';
import EsriFeatureService from 'services/esri-feature-service';
import aoisGeometriesActions from 'redux_modules/aois-geometries';

// actions
import aoisActions from 'redux_modules/aois';
import * as urlActions from 'actions/url-actions';

// utils
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
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

// constants
import {
  BIRDS,
  MAMMALS,
  REPTILES,
  AMPHIBIANS,
} from 'constants/geo-processing-services';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { NATIONAL_BOUNDARIES_TYPE, SUBNATIONAL_BOUNDARIES_TYPE, PROTECTED_AREAS_TYPE, CUSTOM_AOI_TYPE } from 'constants/aois';
import { WDPA_OECM_FEATURE_DATA_LAYER } from 'constants/layers-slugs.js';

// local
import Component from './component.jsx';
import mapStateToProps from './selectors';

const actions = { ...urlActions, ...aoisActions, ...aoisGeometriesActions };

const Container = props => {
  const { changeGlobe, aoiId, aoiStoredGeometry, activeLayers, precalculatedLayerSlug, setAreaTypeSelected } = props;

  const [taxaData, setTaxaData] = useState([])
  const [geometry, setGeometry] = useState(null);
  const [jsonUtils, setJsonUtils] = useState(null);
  const [contextualData, setContextualData] = useState({})
  const [geometryEngine, setGeometryEngine] = useState(null);
  const [speciesData, setSpeciesData] = useState({ species: [] });
  const [storedArea, setStoredArea] = useState(null);

  const setAreaType = (attributes) => {
    let areaType = PROTECTED_AREAS_TYPE;
    if (attributes.GID_1) {
      areaType = SUBNATIONAL_BOUNDARIES_TYPE;
    } else if (attributes.GID_0) {
      areaType = NATIONAL_BOUNDARIES_TYPE;
    }
    setAreaTypeSelected(areaType);
    return areaType;
  }

  useEffect(() => {
    loadModules(["esri/geometry/geometryEngine", "esri/geometry/support/jsonUtils"]).then(([geometryEngine, jsonUtils]) => {
      setGeometryEngine(geometryEngine);
      setJsonUtils(jsonUtils);
    })
  }, [])

  // PRECALCULATED AOIs
  useEffect(() => {
    const setPrecalculatedAOIs = () => {
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[precalculatedLayerSlug],
        whereClause: `MOL_ID = '${aoiId}'`,
        returnGeometry: true
      }).then((features) => {
        const { geometry, attributes } = features[0];
        setGeometry(geometry);

        const areaType = setAreaType(attributes);

        const setProtectedAreasType = () => {
          // Special case for WDPA areas
          // call to WDPA_OECM_FEATURE_DATA_LAYER with MOL_ID as parameter
          EsriFeatureService.getFeatures({
            url: LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
            whereClause: `MOL_ID = '${attributes.MOL_ID}'`,
            returnGeometry: false
          }).then((results) => {
            const { attributes: protectedAreaAttributes } = results[0];
            setContextualData(getPrecalculatedContextualData(protectedAreaAttributes, precalculatedLayerSlug, true, true))
          });
        }

        const setCustomAOIType = () => {
          setContextualData(getPrecalculatedContextualData(attributes, precalculatedLayerSlug, true));
        }

        const setNationalOrSubnationalType = () => {
          setContextualData(getPrecalculatedContextualData(attributes, precalculatedLayerSlug));
        }

        const setPrecalculatedSpeciesData = () => {
          getPrecalculatedSpeciesData(BIRDS, attributes.birds).then(data => setTaxaData(data));
          getPrecalculatedSpeciesData(MAMMALS, attributes.mammals).then((data) => {
            // WHALES IDS NEED TO BE TEMPORARILY DISCARDED (2954, 2955)
            setTaxaData(data.filter((sp) => sp.sliceNumber !== 2954 && sp.sliceNumber !== 2955));
          });
          getPrecalculatedSpeciesData(REPTILES, attributes.reptiles).then(data => setTaxaData(data));
          getPrecalculatedSpeciesData(AMPHIBIANS, attributes.amphibians).then(data => setTaxaData(data));
        };

        if (areaTypeSelected === PROTECTED_AREAS_TYPE) {
          setProtectedAreasType();
        } else if (areaTypeSelected === CUSTOM_AOI_TYPE) {
          setCustomAOIType();
        } else {
          setNationalOrSubnationalType();
        }

        // Common to all area types
        setPrecalculatedSpeciesData();
      })
    }

    if (precalculatedLayerSlug && geometryEngine) {
      setPrecalculatedAOIs();
    }
  }, [precalculatedLayerSlug, geometryEngine])

  // NOT PRECALCULATED AOIs
  useEffect(() => {
    if (aoiId && geometryEngine && jsonUtils && !precalculatedLayerSlug) {

      const createNewCustomAOI = () => {
        const areaName = 'Custom area';
        const area = calculateGeometryArea(aoiStoredGeometry, geometryEngine);
        const contextualData = { area, areaName, isCustom: true, aoiId }
        // Set data before fetch just to show name and available info
        setContextualData(contextualData);

        const jsonGeometry = aoiStoredGeometry && aoiStoredGeometry.toJSON();
        setGeometry(jsonUtils.fromJSON(jsonGeometry));

        const forageStoredArea = { ...contextualData, jsonGeometry, timestamp: Date.now() };
        writeToForageItem(aoiId, forageStoredArea);
        setStoredArea(forageStoredArea);

        getContextData(aoiStoredGeometry).then((data) => {
          setContextualData({ area, areaName, ...data });
        });

        [BIRDS, MAMMALS, REPTILES, AMPHIBIANS].forEach(taxa => {
          getSpeciesData(taxa, aoiStoredGeometry).then((data) => {
            let dataWithoutWhales = data;
            // WHALES IDS NEED TO BE TEMPORARILY DISCARDED (2954, 2955)
            if (taxa === MAMMALS) {
              dataWithoutWhales = dataWithoutWhales.filter((sp) => sp.sliceNumber !== 2954 && sp.sliceNumber !== 2955);
            }
            setTaxaData(dataWithoutWhales);
          });
        })
      }

      const recoverAOIFromDB = (aoiData) => {
        const { geometry, species, ...rest } = aoiData;
        setGeometry(geometry);
        setSpeciesData({ species: orderBy(species, ['has_image', 'conservationConcern'], ['desc', 'desc']) });
        setContextualData({ ...rest, aoiId, isCustom: false })
      }

      const recoverAOIfromLocal = (localStoredAoi) => {
        const { jsonGeometry, species, ...rest } = localStoredAoi;
        const geometry = jsonUtils.fromJSON(jsonGeometry);
        setGeometry(geometry);
        setSpeciesData({ species });

        const contextualData = { ...rest, aoiId, isCustom: true };

        setContextualData(contextualData);
      }

      localforage.getItem(aoiId).then((localStoredAoi) => {
        if (localStoredAoi && localStoredAoi.jsonGeometry) {
          recoverAOIfromLocal(localStoredAoi)
        } else {
          getAoiFromDataBase(aoiId).then((aoiData) => {
            if (aoiData) {
              recoverAOIFromDB(aoiData)
            } else {
              // If we don't have it anywhere we just execute the GP services job to create one
              createNewCustomAOI()
            }
          })
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }, [aoiId, geometryEngine, jsonUtils])

  useEffect(() => {
    const orderedSpecies = orderBy([...speciesData.species, ...taxaData], ['has_image', 'conservationConcern'], ['desc', 'desc']);
    setSpeciesData({ species: orderedSpecies });
  }, [taxaData])


  useEffect(() => {
    if (!precalculatedLayerSlug) {
      const updatedStoredArea = (speciesData.species && speciesData.species.length > 0) ? {
        ...storedArea,
        species: [...speciesData.species],
        ...contextualData
      } : {
        ...storedArea,
        ...contextualData

      }

      writeToForageItem(aoiId, updatedStoredArea);
      setStoredArea(updatedStoredArea, storedArea);
    }
  }, [speciesData, precalculatedLayerSlug, contextualData]);

  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({ map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER] });
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
