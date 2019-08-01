import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import { decodeUrlForState, encodeStateForUrl } from 'utils/stateToUrl';

export const DATA = 'location/DATA';
export const FEATURED = 'location/FEATURED';
export const MAP_IFRAME = 'location/MAP_IFRAME';

// *page* key indicates which container is the entry-point for that route
export const routes = {
  [DATA]: {
    path: '/v2',
    page: 'experiences'
  },
  [DATA]: {
    path: '/dataGlobe',
    page: 'experiences'
  },
  [FEATURED]: {
    path: '/featuredGlobe',
    page: 'experiences'
  },
  [MAP_IFRAME]: {
    path: '/map',
    page: 'map-iframe'
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
