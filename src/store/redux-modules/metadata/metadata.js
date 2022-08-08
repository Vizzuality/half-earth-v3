import reducerRegistry from 'reducerRegistry';

import * as actions from './metadata-actions';
import reducers, { initialState } from './metadata-reducers';

export const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('metadata', reduxConfig);

export default actions;
