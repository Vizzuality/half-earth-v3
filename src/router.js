import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import { decodeUrlForState, encodeStateForUrl } from 'utils/stateToUrl';

const lazyLoadDataGlobe = (dispatch, getState) => import('redux_modules/data-globe/data-globe-thunks').then(module => module.default(dispatch, getState));
const lazyLoadFeaturedGlobe = (dispatch, getState) => import('redux_modules/featured-globe/featured-globe-thunks').then(module => module.default(dispatch, getState));

export const DATA = 'location/DATA';
export const FEATURED = 'location/FEATURED';
export const MAP_IFRAME = 'location/MAP_IFRAME';

// *page* key indicates which container is the entry-point for that route
export const routes = {
  [DATA]: {
    path: '/v2',
    page: 'experiences',
    thunk: lazyLoadDataGlobe
  },
  [DATA]: {
    path: '/dataGlobe',
    page: 'experiences',
    thunk: lazyLoadDataGlobe
  },
  [FEATURED]: {
    path: '/featuredGlobe',
    page: 'experiences',
    thunk: lazyLoadFeaturedGlobe
  },
  [MAP_IFRAME]: {
    path: '/map',
    page: 'map-iframe',
    thunk: lazyLoadDataGlobe
  },
  [NOT_FOUND]: { path: '/404', thunk: dispatch => dispatch(redirect({ type: DATA })) }
};

const options = {
  querySerializer: {
    parse: decodeUrlForState,
    stringify: encodeStateForUrl
  },
}

export default connectRoutes(routes, options);
