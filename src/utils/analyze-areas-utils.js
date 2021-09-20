import { loadModules } from 'esri-loader';
import _intersectionBy from 'lodash/intersectionBy';
import sha1 from 'sha1';
import { LAYERS_URLS } from 'constants/layers-urls';
import {
  ECOREGIONS_FEATURE_LAYER,
  PROTECTED_AREAS_FEATURE_LAYER
} from 'constants/layers-slugs';
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';
import { ECOREGIONS, POLITICAL_BOUNDARIES, PROTECTED_AREAS, } from 'constants/analyze-areas-constants';

function getSource({ layerSlug, searchFields, name, outFields = ["*"], maxSuggestions = 4}) {
  console.log({ layerSlug, searchFields, name})
  return loadModules("esri/layers/FeatureLayer").then((FeatureLayer) => ({
      layer: new FeatureLayer({
        url: LAYERS_URLS[layerSlug],
        title: layerSlug,
      }),
      outFields,
      searchFields,
      name,
      maxSuggestions
    })
  );
}

export function getEcoregionsSearchSource() {
  return getSource({
    layerSlug: ECOREGIONS_FEATURE_LAYER,
    searchFields: ["ECO_ID"],
    name: "Ecoregions"
  })
}

export function getAdminsSearchSource() {
  return getSource({
    layerSlug: ECOREGIONS_FEATURE_LAYER,
    searchFields: ["ISO_CODE"],
    name: "Admin areas"
  })
}

export function getProtectedAreasSearchSource() {
  return getSource({
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

export const searchSources = async selectedSource => {
  switch (selectedSource) {
    case ECOREGIONS:
      return await getEcoregionsSearchSource();
    case PROTECTED_AREAS:
      return await getProtectedAreasSearchSource();
    case POLITICAL_BOUNDARIES:
      return await getAdminsSearchSource();
    default:
      return await getAdminsSearchSource();
  }
}