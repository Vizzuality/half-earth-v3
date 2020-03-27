import reducerRegistry from 'reducerRegistry';

import * as actions from './country-extent-actions';
import reducers, { initialState } from './country-extent-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('countryExtent', reduxConfig);

export default actions;
