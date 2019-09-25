import reducerRegistry from 'reducerRegistry';

import * as actions from './tutorial-actions';
import reducers, { initialState } from './tutorial-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('tutorial', reduxConfig);

export default actions; 