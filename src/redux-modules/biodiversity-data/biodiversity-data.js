import reducerRegistry from 'reducerRegistry';

import * as actions from './biodiversity-data-actions';
import reducers, { initialState } from './biodiversity-data-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('biodiversityData', reduxConfig);

export default actions;