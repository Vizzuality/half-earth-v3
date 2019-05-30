import reducerRegistry from 'reducerRegistry';
import * as actions from './carto-layers-actions';
import reducers, { initialState } from './carto-layers-reducers';

export const reduxConfig = { actions, reducers, initialState };

export default reducerRegistry.registerModule('cartoLayers', reduxConfig);