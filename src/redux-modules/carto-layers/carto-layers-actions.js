import { createAction } from 'redux-tools';

export const setDatasetsLoading = createAction('carto-layers/SET_LAYERS_LOADING');
export const setDatasetsReady = createAction('carto-layers/SET_LAYERS_READY');
export const setDatasetsError = createAction('carto-layers/SET_LAYERS_ERROR');
