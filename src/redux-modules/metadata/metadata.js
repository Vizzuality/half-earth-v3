import reducerRegistry from 'reducerRegistry';

import * as actions from './modal-metadata-actions';
import reducers, { initialState } from './modal-metadata-reducers';

export const reduxConfig = { actions, reducers, initialState };

export default reducerRegistry.registerModule('modalMetadata', reduxConfig);