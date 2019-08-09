import { createSelector, createStructuredSelector } from 'reselect';

const selectFeaturedMaps = ({ selectedFeaturedMap }) => selectedFeaturedMap.data || null;

const getSelectedFeaturedMap = createSelector(
  selectFeaturedMaps,
  featuredMaps => {
    if (!featuredMaps) return null;
    return featuredMaps;
  }
)

export default createStructuredSelector({
  featuredMaps: getSelectedFeaturedMap
})