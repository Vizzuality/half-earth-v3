import reducerRegistry from 'reducerRegistry';

import * as actions from './countries-geometries-actions';
import reducers, { initialState } from './countries-geometries-reducers';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('countriesGeometries', reduxConfig);

export default actions;
