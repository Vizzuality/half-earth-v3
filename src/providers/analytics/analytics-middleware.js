import * as actions from './analytics-actions';

export const trackEvents = ({ dispatch }) => next => action => {
  if (action.meta && action.meta.analytics) {
    dispatch(actions.trackEvent(action.meta.analytics));
  }
  next(action);
};
