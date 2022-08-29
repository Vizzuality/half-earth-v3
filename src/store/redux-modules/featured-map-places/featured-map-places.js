import reducerRegistry from 'reducerRegistry';

import * as actions from './featured-map-places-actions';
import reducers, { initialState } from './featured-map-places-reducers';

export const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('featuredMapPlaces', reduxConfig);

export default actions;
