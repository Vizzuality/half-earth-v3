import { createAction } from 'redux-tools';
import { APP } from 'router';

export const updateQueryParam = createAction(APP, payload => payload);