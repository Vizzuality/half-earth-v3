import { createThunkAction } from 'redux-tools';

const { gtag } = window;

export const trackEvent = createThunkAction(
  'trackEvent',
  ({ category, action, label }) =>
    () =>
      gtag &&
      gtag('event', action, {
        event_category: category,
        event_label: label,
      })
);
