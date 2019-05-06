import { createAction } from 'redux-tools';
import { FEATURED } from 'router';

const updateQueryParam = createAction(FEATURED);

export default {
  updateQueryParam
}