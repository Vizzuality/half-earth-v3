import { LAYERS_URLS } from 'constants/layers-urls';
import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs.js';
import {
  LOOKUP_TABLES,
  BIRDS,
  MAMMALS,
  REPTILES,
  AMPHIBIANS,
} from 'constants/geo-processing-services';

import EsriFeatureService from 'services/esri-feature-service';


const getPrecalculatedSpeciesData = (crfName, jsonSlices) => {
  const data = JSON.parse(jsonSlices);
  return new Promise((resolve, reject) => {
    const ids = data.map(f => f.SliceNumber);
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[LOOKUP_TABLES[crfName]],
      whereClause: `SliceNumber IN (${ids.toString()})`,
    }).then((features) => {
      const result = features
        .map((f) => ({
            category: crfName,
            name: f.attributes.scientific_name,
        }))
        .filter(f => f.name !== null)
      resolve(result);
    }).catch((error) => {
      reject(error)
    });
  })
}

const setPrecalculatedSpeciesData = (attributes, setTaxaData) => {
  getPrecalculatedSpeciesData(BIRDS, attributes.birds).then(data => setTaxaData(data));
  getPrecalculatedSpeciesData(MAMMALS, attributes.mammals).then((data) => {
    // WHALES IDS NEED TO BE TEMPORARILY DISCARDED (2954, 2955)
    setTaxaData(data.filter((sp) => sp.sliceNumber !== 2954 && sp.sliceNumber !== 2955));
  });
  getPrecalculatedSpeciesData(REPTILES, attributes.reptiles).then(data => setTaxaData(data));
  getPrecalculatedSpeciesData(AMPHIBIANS, attributes.amphibians).then(data => setTaxaData(data));
};

export const setFuturePlace = ({  objectId,  setTaxaData, setSpeciesData}) => {
  setSpeciesData({ species: [] });

  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[HALF_EARTH_FUTURE_TILE_LAYER],
    whereClause: `OBJECTID = '${objectId}'`,
    returnGeometry: true
  }).then((results) => {
    const { attributes } = results[0];
    setPrecalculatedSpeciesData(attributes, setTaxaData);
  });
}