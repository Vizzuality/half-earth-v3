import { createSelector, createStructuredSelector } from 'reselect';
import { selectGlobeUrlState } from 'selectors/location-selectors';

const selectLocation = ({ location }) => location;

const selectIsFeaturedGlobe = createSelector(selectLocation, location => {
  const path = location.routesMap[location.type].path;
  return path === '/featuredGlobe' ;
})

const getMountFeaturedGlobe = createSelector([selectGlobeUrlState, selectIsFeaturedGlobe], (globeUrlState, isFeaturedGlobe) => {
  return (globeUrlState && globeUrlState.mountFeaturedGlobe) || isFeaturedGlobe;
})

const getMountExpertGlobe = createSelector([selectGlobeUrlState, selectIsFeaturedGlobe], (globeUrlState, isFeaturedGlobe) => {
  return (globeUrlState && globeUrlState.mountExpertGlobe) || !isFeaturedGlobe;
})

const getRoute = createSelector(selectLocation, location => {
  return location.routesMap[location.type];
})

const getQueryParams = createSelector(selectLocation, location => {
  return location.query;
})

export default createStructuredSelector({
  mountFeaturedGlobe: getMountFeaturedGlobe,
  mountExpertGlobe: getMountExpertGlobe,
  queryParams: getQueryParams,
  route: getRoute
})