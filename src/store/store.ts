import {
    applyMiddleware, combineReducers, compose, legacy_createStore as createStore
} from 'redux';
import thunk from 'redux-thunk';
import { reduxConfig as AOIsGeometriesReduxConfig } from 'store/redux-modules/aois-geometries';
import {
    reduxConfig as countryDataReduxConfig
} from 'store/redux-modules/country-data/country-data';
import {
    reduxConfig as featuredMapPlacesReduxConfig
} from 'store/redux-modules/featured-map-places/featured-map-places';
import {
    reduxConfig as featureMapReduxConfig
} from 'store/redux-modules/featured-map/featured-map';
import {
    reduxConfig as featureMapsListReduxConfig
} from 'store/redux-modules/featured-maps-list/featured-maps-list';
import { reduxConfig as metadataReduxConfig } from 'store/redux-modules/metadata/metadata';
import { reduxConfig as uiReduxConfig } from 'store/redux-modules/ui';

import router from '../router';
import reducerRegistry from './reducerRegistry';
import { middleware as analyticsMiddleware } from './store-middleware/analytics/analytics';

import type { Location } from 'redux-first-router';
const middlewares = [thunk, router.middleware, analyticsMiddleware.trackEvents];

reducerRegistry.register('location', router.reducer);

// TODO: We have some race conditions so we need to make sure that this data is registered before data loading
// Recommended to change to redux-toolkit  https://redux-toolkit.js.org/
// This will allow us to use slices and have code splitting without the risk of race conditions
reducerRegistry.registerModule('countryData', countryDataReduxConfig);
reducerRegistry.registerModule('ui', uiReduxConfig);
reducerRegistry.registerModule('featuredMapsList', featureMapsListReduxConfig);
reducerRegistry.registerModule('featuredMap', featureMapReduxConfig);
reducerRegistry.registerModule('featuredMapPlaces', featuredMapPlacesReduxConfig);
reducerRegistry.registerModule('aoisGeometries', AOIsGeometriesReduxConfig);
reducerRegistry.registerModule('metadata', metadataReduxConfig);

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
