import { loadModules } from 'esri-loader';
import _intersectionBy from 'lodash/intersectionBy';
import sha1 from 'sha1';
import { LAYERS_URLS } from 'constants/layers-urls';
import {
  ECOREGIONS_FEATURE_LAYER,
  PROTECTED_AREAS_FEATURE_LAYER
} from 'constants/layers-slugs';
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';

function getSource({FeatureLayer, layerSlug, searchFields, name, outFields = ["*"], maxSuggestions = 4}) {
  return ({
    layer: new FeatureLayer({
      url: LAYERS_URLS[layerSlug],
      title: layerSlug,
    }),
    outFields,
    searchFields,
    name,
    maxSuggestions
  })
}

export function getEcoregionsSearchSource(FeatureLayer) {
  return getSource({
    FeatureLayer,
    layerSlug: ECOREGIONS_FEATURE_LAYER,
    searchFields: ["ECO_ID"],
    name: "Ecoregions"
  })
}

export function getAdminsSearchSource(FeatureLayer) {
  return getSource({
    FeatureLayer,
    layerSlug: ECOREGIONS_FEATURE_LAYER,
    searchFields: ["ISO_CODE"],
    name: "Admin areas"
  })
}

export function getProtectedAreasSearchSource(FeatureLayer) {
  return getSource({
    FeatureLayer,
    layerSlug: PROTECTED_AREAS_FEATURE_LAYER,
    searchFields:  ["WDPA_PID"],
    name: "Protected Areas"
  })
}

export function logGeometryArea(geometry) {
  loadModules(["esri/geometry/geometryEngine"])
    .then(([geometryEngine]) => {
      const SQ_KM_WKID = 109414;
      const area = geometryEngine.geodesicArea(geometry, SQ_KM_WKID)
      console.log('AREA', area, 'KM2')
    })
}

export function getSelectedAnalysisLayer(activeLayers) {
  const intersectionArray = _intersectionBy(PRECALCULATED_AOI_OPTIONS, activeLayers, 'title');
  return intersectionArray[0];
}

export function createHashFromGraphic(graphic) {
  const ringsArray = graphic.geometry.rings;
  const flatRings = ringsArray.flat(Infinity);
  return sha1(flatRings.toString())
}