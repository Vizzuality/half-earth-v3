import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router';
import { createBrowserHistory } from 'history';
import querySerializer from 'qs';

const history = createBrowserHistory();

export const APP = 'location/APP';

export const routes = {
  [APP]: {
    path: '/',
    page: 'index.js'
  },
  [NOT_FOUND]: { path: '/404', thunk: dispatch => dispatch(redirect({ type: APP })) }
};

export default connectRoutes(history, routes, { querySerializer });