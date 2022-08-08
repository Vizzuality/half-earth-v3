import reducerRegistry from 'reducerRegistry';

import * as actions from './scene-actions';
import reducers, { initialState } from './scene-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('scene', reduxConfig);

export default actions;
