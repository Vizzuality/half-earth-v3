import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import { decodeUrlForState, encodeStateForUrl } from 'utils/stateToUrl';

const lazyLoadDataGlobe = (dispatch, getState) => import('redux_modules/data-globe/data-globe-thunks').then(module => module.default(dispatch, getState));
const lazyLoadFeaturedGlobe = (dispatch, getState) => import('redux_modules/featured-globe/featured-globe-thunks').then(module => module.default(dispatch, getState));
const lazyLoadCartoLayers = (dispatch, getState) => import('redux_modules/carto-layers/carto-layers-thunks').then(module => module.default(dispatch, getState));

const dispatchPreFetchThunks = (...thunks) =>
  async (...params) => thunks.forEach(thunk => thunk(...params));

export const DATA = 'location/DATA';
export const FEATURED = 'location/FEATURED';

export const routes = {
  [DATA]: {
    path: '/dataGlobe',
    page: 'data-globe',
    thunk: dispatchPreFetchThunks(
      lazyLoadDataGlobe,
      lazyLoadCartoLayers
    )
  },
  [FEATURED]: {
    path: '/featuredGlobe',
    page: 'featured-globe',
    thunk: lazyLoadFeaturedGlobe
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