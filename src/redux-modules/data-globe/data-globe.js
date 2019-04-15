import reducerRegistry from 'reducerRegistry';

import * as actions from './data-globe-actions';
import reducers, { initialState } from './data-globe-reducers';

const reduxConfig = { actions, reducers, initialState };

export default reducerRegistry.registerModule('dataGlobeSpec', reduxConfig);