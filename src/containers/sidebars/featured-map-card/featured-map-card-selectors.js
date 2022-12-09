import { createSelector, createStructuredSelector } from 'reselect';

const selectFeaturedMapsList = ({ featuredMapsList }) =>
  featuredMapsList.data || null;

const getFeaturedMapsList = createSelector(
  selectFeaturedMapsList,
  (featuredMaps) => {
    if (!featuredMaps) return null;
    return featuredMaps;
  }
);

export default createStructuredSelector({
  featuredMapsList: getFeaturedMapsList,
});
