import { createStore, compose } from 'redux';

import router from './router';
import reducers from './reducers';

// check release notes for more context
// https://github.com/zalmoxisus/redux-devtools-extension/releases/tag/v2.7.0
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancers(router.enhancer)
);