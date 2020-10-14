import reducerRegistry from 'reducerRegistry';

import * as actions from './user-config-actions';
import reducers, { initialState } from './user-config-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('userConfig', reduxConfig);

export default actions;
