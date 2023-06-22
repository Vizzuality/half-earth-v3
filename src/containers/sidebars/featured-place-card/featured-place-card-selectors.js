import { createSelector, createStructuredSelector } from 'reselect';

const selectFeaturedMapsList = ({ featuredMapsList }) =>
  featuredMapsList?.data || null;
const selectFeaturedMapPlaces = ({ featuredMapPlaces }) =>
  featuredMapPlaces?.data || null;

const getFeaturedMapsList = createSelector(
  selectFeaturedMapsList,
  (featuredMaps) => {
    if (!featuredMaps) return null;
    featuredMaps.forEach((map) => {
      map.sourceText =
        map.slug === 'bestPlaces'
          ? 'Half-Earth: Our Planet’s Fight for Life'
          : null;
    });
    return featuredMaps;
  }
);

export default createStructuredSelector({
  featuredMapsList: getFeaturedMapsList,
  featuredMapPlaces: selectFeaturedMapPlaces,
});
