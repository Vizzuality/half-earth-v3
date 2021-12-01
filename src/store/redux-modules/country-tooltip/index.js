import reducerRegistry from 'reducerRegistry';

import * as actions from './actions';
import reducers, { initialState } from './reducers';

export const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('countryTooltip', reduxConfig);

export default actions;