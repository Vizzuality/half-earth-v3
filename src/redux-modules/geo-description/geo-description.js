import reducerRegistry from 'reducerRegistry';
import sagaRegistry from 'sagaRegistry';

import * as actions from './geo-description-actions';
import reducers, { initialState } from './geo-description-reducers';
import sagas from './geo-description-sagas';

const reduxConfig = { actions, reducers, initialState };

reducerRegistry.registerModule('geoDescription', reduxConfig);
sagaRegistry.register('geoDescriptionSagas', sagas);

export default actions;
