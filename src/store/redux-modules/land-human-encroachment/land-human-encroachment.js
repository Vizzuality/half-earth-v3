import reducerRegistry from 'reducerRegistry';

import * as actions from './land-human-encroachment-actions';
import reducers, { initialState } from './land-human-encroachment-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('landHumanEncroachment', reduxConfig);

export default actions;
