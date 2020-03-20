import reducerRegistry from 'reducerRegistry';

import * as actions from './country-data-actions';
import reducers, { initialState } from './country-data-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('countryData', reduxConfig);

export default actions;
