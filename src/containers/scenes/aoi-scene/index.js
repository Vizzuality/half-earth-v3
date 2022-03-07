import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import localforage from 'localforage';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import { loadModules } from 'esri-loader';
import EsriFeatureService from 'services/esri-feature-service';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import { STRINGIFIED_ATTRIBUTES } from 'constants/aois';

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
  getPrecalculatedContextualData,
  setPrecalculatedSpeciesData,
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
import { AREA_TYPES } from 'constants/aois';
import { WDPA_OECM_FEATURE_DATA_LAYER, HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs.js';

// local
import Component from './component.jsx';
import mapStateToProps from './selectors';

const actions = { ...urlActions, ...aoisActions, ...aoisGeometriesActions };

// Protected areas are fetched on protected areas modal except for PA type AOIs
const AOIScene = props => {
  const { changeGlobe, aoiId, aoiStoredGeometry, activeLayers, precalculatedLayerSlug, setAreaTypeSelected, areaTypeSelected, objectId } = props;

  const [taxaData, setTaxaData] = useState([])
  const [geometry, setGeometry] = useState(null);
  const [jsonUtils, setJsonUtils] = useState(null);
  const [contextualData, setContextualData] = useState({})
  const [geometryEngine, setGeometryEngine] = useState(null);
  const [speciesData, setSpeciesData] = useState({ species: [] });
  const [storedArea, setStoredArea] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [tooltipInfo, setTooltipInfo] = useState(null);

  const setAreaType = (attributes) => {
    let areaType = AREA_TYPES.protected;
    if (attributes.GID_1) {
      areaType = AREA_TYPES.subnational;
    } else if (attributes.GID_0) {
      areaType = AREA_TYPES.national;
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

        const setProtectedAreasType = () => {
          // Special case for WDPA areas
          // call to WDPA_OECM_FEATURE_DATA_LAYER with MOL_ID as parameter

          // TODO: Can we get also the geometry from the WDPA_OECM_FEATURE_DATA_LAYER layer?
          EsriFeatureService.getFeatures({
            url: LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
            whereClause: `MOL_ID = '${aoiId}'`,
            returnGeometry: false
          }).then((results) => {
            const { attributes: protectedAreaAttributes } = results[0];
            setContextualData(getPrecalculatedContextualData(protectedAreaAttributes, precalculatedLayerSlug, true, true))
            setPrecalculatedSpeciesData(protectedAreaAttributes, setTaxaData);
          });
        }

        const setNationalOrSubnationalType = () => {
          setContextualData(getPrecalculatedContextualData(attributes, precalculatedLayerSlug));
          setPrecalculatedSpeciesData(attributes, setTaxaData);
        }

        const areaType = setAreaType(attributes);
        if (areaType === AREA_TYPES.protected) {
          setProtectedAreasType();
        } else {
          setNationalOrSubnationalType();
        }
      })
    }

    // PRECALCULATED FUTURE PLACES
    const setFuturePlace = () => {
      changeGlobe({ areaType: AREA_TYPES.futurePlaces })

      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[HALF_EARTH_FUTURE_TILE_LAYER],
        whereClause: `OBJECTID = '${objectId}'`,
        returnGeometry: true
      }).then((results) => {
        const { attributes, geometry } = results[0];
        setPrecalculatedSpeciesData(attributes, setTaxaData);
        setGeometry(geometry);
        const areaName = `Priority place ${attributes.cluster}`;
        setContextualData(getPrecalculatedContextualData({ ...attributes, jsonGeometry: JSON.stringify(geometry), areaName, aoiId }, null, true, true, areaName))
      });
    }

    if (precalculatedLayerSlug && geometryEngine) {
      if (areaTypeSelected === AREA_TYPES.futurePlaces || precalculatedLayerSlug === HALF_EARTH_FUTURE_TILE_LAYER) {
        setFuturePlace()
      }  else {
        setPrecalculatedAOIs();
      }
    }
  }, [precalculatedLayerSlug, geometryEngine, objectId])

  // NOT PRECALCULATED AOIs
  useEffect(() => {
    if (aoiId && geometryEngine && jsonUtils && !precalculatedLayerSlug) {

      const createNewCustomAOI = () => {
        const areaName = 'Custom area';
        const area = calculateGeometryArea(aoiStoredGeometry, geometryEngine);
        const contextualData = { area, areaName, aoiId, isCustom: true }
        // Set data before fetch just to show name and available info
        setContextualData(contextualData);

        const jsonGeometry = aoiStoredGeometry && aoiStoredGeometry.toJSON();
        setGeometry(jsonUtils.fromJSON(jsonGeometry));

        const forageStoredArea = { ...contextualData, jsonGeometry, timestamp: Date.now() };
        writeToForageItem(aoiId, forageStoredArea);
        setStoredArea(forageStoredArea);

        getContextData(aoiStoredGeometry).then((data) => {
          setContextualData({ ...data, ...contextualData });
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
        const { geometry, attributes: { species, ...otherAttributes } } = aoiData;
        setGeometry(geometry);
        setSpeciesData({ species: JSON.parse(species) });
        setContextualData({ ...otherAttributes,
          ...STRINGIFIED_ATTRIBUTES.reduce((acc, key) => {
            acc[key] = JSON.parse(otherAttributes[key]);
            return acc;
          }, {}),
          percentage: otherAttributes.per_global,
          isCustom: true
        })
      }

      const recoverAOIfromLocal = (localStoredAoi) => {
        const { jsonGeometry, species, ...rest } = localStoredAoi;
        const geometry = jsonUtils.fromJSON(jsonGeometry);
        setGeometry(geometry);
        setSpeciesData({ species });
        const contextualData = { ...rest,
          aoiId, isCustom: true };

        setContextualData(contextualData);
      }

      localforage.getItem(aoiId).then((localStoredAoi) => {
        if (localStoredAoi && localStoredAoi.jsonGeometry) {
          setAreaTypeSelected(AREA_TYPES.custom);
          recoverAOIfromLocal(localStoredAoi)
        } else {
          getAoiFromDataBase(aoiId).then((aoiData) => {
            if (aoiData && aoiData[0]) {
              recoverAOIFromDB(aoiData[0])
            } else {
              // If we don't have it anywhere we just execute the GP services job to create one
              createNewCustomAOI()
            }
          }).catch(error => {
            console.error('Could not retrieve AOI', error);
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
    const hasAllData = speciesData && contextualData && !isEmpty(contextualData) && (!contextualData.isCustom || contextualData.protectedAreasList);
    if (!precalculatedLayerSlug && hasAllData) {
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

    if (hasAllData) {
      setLoaded(true);
    }

  }, [speciesData, precalculatedLayerSlug, contextualData]);

  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({ map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER] });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  const handleFuturePlaceClick = (results) => {
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
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      dataLoaded={loaded}
      tooltipInfo={tooltipInfo}
      setTooltipInfo={setTooltipInfo}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(AOIScene);
