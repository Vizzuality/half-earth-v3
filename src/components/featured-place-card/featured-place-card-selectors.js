import { createSelector, createStructuredSelector } from 'reselect';

const selectFeaturedMapsList = ({ featuredMapsList }) => featuredMapsList.data || null;

const getFeaturedMapsList = createSelector(
  selectFeaturedMapsList,
  featuredMaps => {
    if (!featuredMaps) return null;
    featuredMaps.forEach(map => {
      map.sourceText = map.slug === "priorPlaces" ? "Half-Earth:Our Planet’s Fight for Life" : null;
    });
    return featuredMaps;
  }
)

export default createStructuredSelector({
  featuredMapsList: getFeaturedMapsList
})