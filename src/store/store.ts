import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import type { Location } from 'redux-first-router';
import thunk from 'redux-thunk';

import router from '../router';

import reducerRegistry from './reducerRegistry';
import { middleware as analyticsMiddleware } from './store-middleware/analytics/analytics';

const middlewares = [thunk, router.middleware, analyticsMiddleware.trackEvents];

reducerRegistry.register('location', router.reducer);

const initialReducers = combineReducers(reducerRegistry.getReducers());

const getStore = () => {
  const store = createStore(
    initialReducers,
    compose(router.enhancer, applyMiddleware(...middlewares))
  );
  reducerRegistry.setChangeListener((asyncReducers) =>
    store.replaceReducer(combineReducers(asyncReducers))
  );

  return store;
};

export default getStore;

const store = getStore();

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type GetState = () => {
  location: Location;
};
