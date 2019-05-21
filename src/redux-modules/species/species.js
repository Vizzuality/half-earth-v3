import reducerRegistry from 'reducerRegistry';

import * as actions from './species-actions';
import reducers, { initialState } from './species-reducers';

export const reduxConfig = { actions, reducers, initialState };

export default reducerRegistry.registerModule('species', reduxConfig);