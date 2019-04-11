import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import qs from 'qs';

const lazyLoadDataGlobe = (dispatch, getState) => import('redux_modules/data-globe/data-globe-thunks').then(module => module.default(dispatch, getState));
const lazyLoadFeaturedGlobe = (dispatch, getState) => import('redux_modules/featured-globe/featured-globe-thunks').then(module => module.default(dispatch, getState));

export const APP = 'location/APP';
export const FEATURED = 'location/FEATURED';

export const routes = {
  [APP]: {
    path: '/dataGlobe',
    page: 'index.js',
    thunk: lazyLoadDataGlobe
  },
  [FEATURED]: {
    path: '/featuredGlobe',
    page: 'index.js',
    thunk: lazyLoadFeaturedGlobe
  },
  [NOT_FOUND]: { path: '/404', thunk: dispatch => dispatch(redirect({ type: APP })) }
};

const options = {
  querySerializer: qs
}

export default connectRoutes(routes, options);