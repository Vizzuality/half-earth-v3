import reducerRegistry from 'reducerRegistry';

import * as actions from './grid-cell-data-actions';
import reducers, { initialState } from './grid-cell-data-reducers';

const reduxConfig = { actions, reducers, initialState };

export default reducerRegistry.registerModule('gridCellData', reduxConfig);