import { createSelector, createStructuredSelector } from 'reselect';

const selectFeaturedMaps = ({ featuredMapsList }) => (featuredMapsList && featuredMapsList.data) || null;

const getFeaturedMapsList = createSelector(
  selectFeaturedMaps,
  featuredMaps => {
    if (!featuredMaps) return null;
    return featuredMaps;
  }
)

export default createStructuredSelector({
  featuredMapsList: getFeaturedMapsList
})
