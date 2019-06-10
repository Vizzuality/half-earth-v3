import reducerRegistry from 'reducerRegistry';

import * as actions from './geo-description-actions';
import reducers, { initialState } from './geo-description-reducers';

const reduxConfig = { actions, reducers, initialState };

export default reducerRegistry.registerModule('geoDescription', reduxConfig);
