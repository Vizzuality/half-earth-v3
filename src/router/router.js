import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import qs from 'qs';

export const APP = 'location/APP';

export const routes = {
  [APP]: {
    path: '/',
    page: 'index.js'
  },
  [NOT_FOUND]: { path: '/404', thunk: dispatch => dispatch(redirect({ type: APP })) }
};

const options = {
  querySerializer: qs
}

export default connectRoutes(routes, options);