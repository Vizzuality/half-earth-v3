/* eslint-disable max-len */
import {
  getPrecalculatedContextualData,
  setPrecalculatedSpeciesData,
} from 'utils/geo-processing-services';

import EsriFeatureService from 'services/esri-feature-service';

import { SPECIFIC_REGIONS_TILE_LAYER } from 'constants/layers-slugs.js';
import { LAYERS_URLS } from 'constants/layers-urls';

// PRECALCULATED SPECIFIC REGIONS
export const setSpecificRegion = ({
  aoiId,
  setGeometry,
  setContextualData,
  setTaxaData,
  handleLoadedTaxaData,
  setSpeciesData,
}) => {
  setSpeciesData({ species: [] }); // First reset species data
  const region = aoiId.replace('region-', '');

  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[SPECIFIC_REGIONS_TILE_LAYER],
    whereClause: `region = '${region}'`,
    returnGeometry: true,
  }).then((results) => {
    const { attributes, geometry } = results[0];
    const { NAME } = attributes;
    setPrecalculatedSpeciesData(attributes, setTaxaData, handleLoadedTaxaData);
    setGeometry(geometry);

    setContextualData(
      getPrecalculatedContextualData({
        data: {
          ...attributes,
          jsonGeometry: JSON.stringify(geometry),
          areaName: NAME,
          aoiId,
        },
        includeProtectedAreasList: true,
        includeAllData: true,
        areaName: NAME,
      })
    );
  });
};
