import reducerRegistry from 'reducerRegistry';

import * as actions from './actions';
import reducers, { initialState } from './reducers';

export const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('map-tooltip', reduxConfig);

export default actions;