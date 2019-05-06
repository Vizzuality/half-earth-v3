import { createAction } from 'redux-tools';
import { DATA } from 'router';

const updateQueryParam = createAction(DATA);

export default {
  updateQueryParam
}