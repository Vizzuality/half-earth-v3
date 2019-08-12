import reducerRegistry from 'reducerRegistry';

import * as actions from './featured-maps-list-actions';
import reducers, { initialState } from './featured-maps-list-reducers';

export const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('featuredMapsList', reduxConfig);

export default actions;