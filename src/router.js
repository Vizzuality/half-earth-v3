import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import { decodeUrlForState, encodeStateForUrl } from 'utils/stateToUrl';

export const LANDING = 'location/';
export const DATA = 'location/DATA';
export const FEATURED = 'location/FEATURED';
export const NATIONAL_REPORT_CARD = 'location/NATIONAL_REPORT_CARD';
export const NATIONAL_REPORT_CARD_LANDING = 'location/NATIONAL_REPORT_CARD_LANDING';
export const AREA_OF_INTEREST = 'location/AREA_OF_INTEREST';

export const routes = {
  [LANDING]: {
    path: '/',
    page: 'landing'
  },
  [DATA]: {
    path: '/dataGlobe',
    page: 'data-globe'
  },
  [FEATURED]: {
    path: '/featuredGlobe',
    page: 'featured-globe'
  },
  [NATIONAL_REPORT_CARD]: {
    path: '/nrc/:iso/:view?',
    page: 'nrc'
  },
  [NATIONAL_REPORT_CARD_LANDING]: {
    path: '/nrc',
    page: 'nrc-landing'
  },
  [AREA_OF_INTEREST]: {
    path: '/aoi/:id?',
    page: 'aoi'
  },
  [NOT_FOUND]: { path: '/404', thunk: dispatch => dispatch(redirect({ type: LANDING })) }
};

const options = {
  querySerializer: {
    parse: decodeUrlForState,
    stringify: encodeStateForUrl
  },
}

export default connectRoutes(routes, options);
