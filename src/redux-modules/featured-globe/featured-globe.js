import reducerRegistry from 'reducerRegistry';

import * as actions from './featured-globe-actions';
import reducers, { initialState } from './featured-globe-reducers';

const reduxConfig = { actions, reducers, initialState };

export default reducerRegistry.registerModule('featuredGlobeSpec', reduxConfig);