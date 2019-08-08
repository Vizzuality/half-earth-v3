import reducerRegistry from 'reducerRegistry';

import * as actions from './selected-featured-map-actions';
import reducers, { initialState } from './selected-featured-map-reducers';

export const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('selectedFeaturedMap', reduxConfig);

export default actions;