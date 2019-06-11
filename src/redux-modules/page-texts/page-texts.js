import reducerRegistry from 'reducerRegistry';

import * as actions from './page-texts-actions';
import reducers, { initialState } from './page-texts-reducers';

export const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('pageTexts', reduxConfig);

export default actions;