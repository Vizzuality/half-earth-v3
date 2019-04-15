import { createSelector, createStructuredSelector } from 'reselect';
import { getQuery } from 'selectors/location-selectors';

export const getFeaturedGlobeSpec = ({ featuredGlobeSpec }) => featuredGlobeSpec && (featuredGlobeSpec.data || null);
export const getDataGlobeSpec = ({ dataGlobeSpec }) => dataGlobeSpec && (dataGlobeSpec.data || null);

export const getActiveLayers = createSelector(
  getQuery,
  query => {
    if (!query || !query.activeLayers) return null;
    return query.activeLayers;
  }
)

export const getFeaturedGlobeLayers = createSelector(
  getFeaturedGlobeSpec,
  layerSpec => {
    if (!layerSpec) return null;
    return layerSpec.operationalLayers.map(l => ({
      id: l.id,
      title: l.title
    }))
  }
)

export const getDataGlobeLayers = createSelector(
  getDataGlobeSpec,
  layerSpec => {
    if (!layerSpec) return null;
    return layerSpec.operationalLayers.map(l => ({
      id: l.id,
      title: l.title
    }))
  }
)

export default createStructuredSelector({
  featuredGlobeSpec: getFeaturedGlobeSpec,
  featuredGlobeLayers: getFeaturedGlobeLayers,
  dataGlobeSpec: getDataGlobeSpec,
  dataGlobeLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers
})