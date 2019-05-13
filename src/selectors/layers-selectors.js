import { createSelector, createStructuredSelector } from 'reselect';

export const selectFeaturedGlobeSpec = ({ featuredGlobeSpec }) => featuredGlobeSpec && (featuredGlobeSpec.data || null);
export const selectDataGlobeSpec = ({ dataGlobeSpec }) => dataGlobeSpec && (dataGlobeSpec.data || null);

export const getFeaturedGlobeLayers = createSelector(
  selectFeaturedGlobeSpec,
  layerSpec => {
    if (!layerSpec) return null;
    return layerSpec.operationalLayers.map(l => ({
      id: l.id,
      title: l.title
    }))
  }
)

export const getDataGlobeLayers = createSelector(
  selectDataGlobeSpec,
  layerSpec => {
    if (!layerSpec) return null;
    return layerSpec.operationalLayers.map(l => ({
      id: l.id,
      title: l.title
    }))
  }
)

export default createStructuredSelector({
  featuredGlobeSpec: selectFeaturedGlobeSpec,
  featuredGlobeLayers: getFeaturedGlobeLayers,
  dataGlobeSpec: selectDataGlobeSpec,
  dataGlobeLayers: getDataGlobeLayers
})