import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import router from './router';
import reducerRegistry from './reducerRegistry';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, router.middleware, sagaMiddleware];

reducerRegistry.register('location', router.reducer);

const initialReducers = combineReducers(reducerRegistry.getReducers());

// check release notes for more context
// https://github.com/zalmoxisus/redux-devtools-extension/releases/tag/v2.7.0
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    initialReducers,
    composeEnhancers(router.enhancer, applyMiddleware(...middlewares))
  );
  reducerRegistry.setChangeListener(asyncReducers =>
    store.replaceReducer(combineReducers(asyncReducers))
  );
  sagaMiddleware.run(rootSaga)

  return store;
};
