import { createAction } from 'redux-tools';
import { DATA } from 'router';
import { FEATURED } from 'router';

export const updateFeaturedGlobeQueryParam = createAction(FEATURED);
export const updateDataGlobeQueryParam = createAction(DATA);