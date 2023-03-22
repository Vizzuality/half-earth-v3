/* eslint-disable max-len */
import {
  getPrecalculatedContextualData,
  setPrecalculatedSpeciesData,
} from 'utils/geo-processing-services';

import EsriFeatureService from 'services/esri-feature-service';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';
import {
  WDPA_OECM_FEATURE_DATA_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
} from 'constants/layers-slugs.js';
import { LAYERS_URLS } from 'constants/layers-urls';

import { setFuturePlace } from './future-places-utils';
import { setSpecificRegion } from './specific-regions-utils';

// PRECALCULATED AOIs: COUNTRIES, REGIONS, WDPAs, FUTURE PLACES, SPECIFIC REGIONS
export const setPrecalculatedAOIs = ({
  precalculatedLayerSlug,
  aoiId,
  objectId,
  setGeometry,
  setContextualData,
  setTaxaData,
  handleLoadedTaxaData,
  setSpeciesData,
  t,
  // eslint-disable-next-line consistent-return
}) => {
  if (precalculatedLayerSlug === HALF_EARTH_FUTURE_TILE_LAYER) {
    return setFuturePlace({
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

  if (precalculatedLayerSlug === SPECIFIC_REGIONS_TILE_LAYER) {
    return setSpecificRegion({
      aoiId,
      objectId,
      setGeometry,
      setContextualData,
      setTaxaData,
      handleLoadedTaxaData,
      setSpeciesData,
    });
  }

  // WDPA have an url array instead of a single url
  const url = Array.isArray(LAYERS_URLS[precalculatedLayerSlug])
    ? LAYERS_URLS[precalculatedLayerSlug][0]
    : LAYERS_URLS[precalculatedLayerSlug];

  EsriFeatureService.getFeatures({
    url,
    whereClause: `MOL_ID = '${aoiId}'`,
    returnGeometry: true,
  }).then((features) => {
    if (features && features[0]) {
      const { geometry, attributes } = features[0];
      setGeometry(geometry);

      const setProtectedAreasType = () => {
        // Special case for WDPA areas
        // call to WDPA_OECM_FEATURE_DATA_LAYER with MOL_ID as parameter

        EsriFeatureService.getFeatures({
          url: LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
          whereClause: `MOL_ID = '${aoiId}'`,
          returnGeometry: false,
        }).then((results) => {
          const { attributes: protectedAreaAttributes } = results[0];
          setContextualData(
            getPrecalculatedContextualData({
              data: protectedAreaAttributes,
              includeProtectedAreasList: true,
              includeAllData: true,
            })
          );
          setPrecalculatedSpeciesData(
            protectedAreaAttributes,
            setTaxaData,
            handleLoadedTaxaData
          );
        });
      };

      const setNationalOrSubnationalType = () => {
        setContextualData(getPrecalculatedContextualData({ data: attributes }));
        setPrecalculatedSpeciesData(
          attributes,
          setTaxaData,
          handleLoadedTaxaData
        );
      };

      if (precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.protectedAreas) {
        setProtectedAreasType();
      } else {
        setNationalOrSubnationalType();
      }
    } else {
      console.warn(`No data for ${aoiId}`);
    }
  });
};
