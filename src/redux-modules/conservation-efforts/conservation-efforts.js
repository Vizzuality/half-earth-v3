import reducerRegistry from 'reducerRegistry';

import * as actions from './conservation-efforts-actions';
import reducers, { initialState } from './conservation-efforts-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('conservationEffortsData', reduxConfig);

export default actions;