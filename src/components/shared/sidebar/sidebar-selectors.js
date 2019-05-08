import { createSelector, createStructuredSelector } from 'reselect';
import { selectUiUrlState } from 'selectors/location-selectors';
import initialState from './initial-state';

const getUiSettings = createSelector(selectUiUrlState, uiUrlState => {
  return {
    ...initialState,
    ...uiUrlState
  }
})

const getScenePadding = createSelector(getUiSettings, uiSettings => uiSettings && uiSettings.isPaddingActive)

export default createStructuredSelector({
  isPaddingActive: getScenePadding
})