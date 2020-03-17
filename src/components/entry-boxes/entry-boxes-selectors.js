import { createSelector, createStructuredSelector } from 'reselect';
import { RAISIG_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

const getActiveLayers = (state, props) => props.activeLayers;

const getCountedActiveLayers = createSelector(
  [getActiveLayers],
  (activeLayers) => {
    const biodiversityLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Biodiversity').length : 0;
    const humanPressureLayer = activeLayers ? activeLayers.filter(({ category }) => category === 'Human pressures').length : 0;
    const protectionLayers = activeLayers ? activeLayers.filter(({ category, title }) => {
      // we have to filter 'RAISIG' layer because activating 'Community-based' checbox selects two layers on the globe: "protected_areas_vector_tile_layer" and "RAISIG_areas_vector_tile_layer"
      return category === 'Existing protection' && title !== RAISIG_AREAS_VECTOR_TILE_LAYER
    }).length : 0;

    return {
      [LAYERS_CATEGORIES.BIODIVERSITY]: biodiversityLayers,
      [LAYERS_CATEGORIES.PROTECTION]: protectionLayers,
      [LAYERS_CATEGORIES.LAND_PRESSURES]: humanPressureLayer
    };
  }
);

const getRoute = ({ location }) => location.routesMap[location.type];

export default createStructuredSelector({ countedActiveLayers: getCountedActiveLayers, route: getRoute });