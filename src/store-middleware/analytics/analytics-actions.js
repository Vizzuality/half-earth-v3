import { createThunkAction } from 'redux-tools';

const { gtag } = window;

export const trackEvent = createThunkAction('trackEvent', ({ category, action, label }) =>
  dispatch => gtag('event', action, {
    'event_category': category,
    'event_label': label
  }));
