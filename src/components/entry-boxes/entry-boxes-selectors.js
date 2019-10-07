import { createSelector, createStructuredSelector } from 'reselect';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER, RAISIG_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';

const getActiveLayers = (state, props) => props.activeLayers;
const getRasters = (state, props) => props.rasters || {};

const getCountedActiveLayers = createSelector(
  [getActiveLayers, getRasters],
  (activeLayers, rasters) => {
    const biodiversityLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Biodiversity').length : 0;
    const protectionLayers = activeLayers ? activeLayers.filter(({ category, title }) => {
      // we have to filter 'RAISIG' layer because activating 'Community-based' checbox selects two layers on the globe: "protected_areas_vector_tile_layer" and "RAISIG_areas_vector_tile_layer"
      return category === 'Existing protection' && title !== RAISIG_AREAS_VECTOR_TILE_LAYER
    }).length : 0; 
    const humanPressureLayer = activeLayers ? activeLayers.filter(({ title }) => title === LAND_HUMAN_PRESSURES_IMAGE_LAYER).length : 0;
    const humanPressureRasters = humanPressureLayer && Object.keys(rasters).filter(key => rasters[key]).length;

    return {
      'Biodiversity': biodiversityLayers,
      'Existing protection': protectionLayers,
      'Human pressures': humanPressureRasters
    };
  }
);

const getRoute = ({ location }) => location.routesMap[location.type];

export default createStructuredSelector({ countedActiveLayers: getCountedActiveLayers, route: getRoute });