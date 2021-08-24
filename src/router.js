import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import { decodeUrlForState, encodeStateForUrl } from 'utils/stateToUrl';

export const DATA = 'location/DATA';
export const FEATURED = 'location/FEATURED';
export const NATIONAL_REPORT_CARD = 'location/NATIONAL_REPORT_CARD';
export const AREA_OF_INTEREST = 'location/AREA_OF_INTEREST';
export const MAP_IFRAME = 'location/MAP_IFRAME';

export const routes = {
  [DATA]: {
    path: '/dataGlobe',
    page: 'data-globe'
  },
  [FEATURED]: {
    path: '/featuredGlobe',
    page: 'featured-globe'
  },
  [MAP_IFRAME]: {
    path: '/map',
    page: 'map-iframe'
  },
  [NATIONAL_REPORT_CARD]: {
    path: '/nrc/:iso/:view?',
    page: 'nrc'
  },
  [AREA_OF_INTEREST]: {
    path: '/aoi/:id?',
    page: 'aoi'
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