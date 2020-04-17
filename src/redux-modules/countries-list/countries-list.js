import reducerRegistry from 'reducerRegistry';

import * as actions from './countries-list-actions';
import reducers, { initialState } from './countries-list-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('countriesList', reduxConfig);

export default actions;
