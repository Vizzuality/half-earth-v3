/* eslint-disable max-len */
import {
  getPrecalculatedContextualData,
  setPrecalculatedSpeciesData,
} from 'utils/geo-processing-services';

import EsriFeatureService from 'services/esri-feature-service';

import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs.js';
import { LAYERS_URLS } from 'constants/layers-urls';

// PRECALCULATED FUTURE PLACES
export const setFuturePlace = ({
  aoiId,
  objectId,
  setGeometry,
  setContextualData,
  setTaxaData,
  handleLoadedTaxaData,
  setSpeciesData,
  t,
}) => {
  setSpeciesData({ species: [] }); // First reset species data

  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[HALF_EARTH_FUTURE_TILE_LAYER],
    whereClause: `OBJECTID = '${objectId}'`,
    returnGeometry: true,
  }).then((results) => {
    const { attributes, geometry } = results[0];
    setPrecalculatedSpeciesData(attributes, setTaxaData, handleLoadedTaxaData);
    setGeometry(geometry);
    const areaName = `${t('Priority place')} ${attributes.cluster}`;
    setContextualData(
      getPrecalculatedContextualData({
        data: {
          ...attributes,
          jsonGeometry: JSON.stringify(geometry),
          areaName,
          aoiId,
        },
        includeProtectedAreasList: true,
        includeAllData: true,
        areaName,
      })
    );
  });
};
