import reducerRegistry from 'reducerRegistry';

import * as actions from './species-actions';
import reducers, { initialState } from './species-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('speciesData', reduxConfig);

export default actions; 