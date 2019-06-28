import { createThunkAction } from 'redux-tools';

const { ga } = window;

export const trackEvent = createThunkAction('trackEvent', params =>
  dispatch => ga('send', 'event', ...params));
