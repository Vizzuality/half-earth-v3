import reducerRegistry from 'reducerRegistry';

import * as actions from './actions';
import reducers, { initialState } from './reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('ui', reduxConfig);

export default actions;
