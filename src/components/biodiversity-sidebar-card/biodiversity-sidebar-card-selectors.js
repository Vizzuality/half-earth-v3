import { BIODIVERSITY_DEFAULT_TAB } from 'constants/ui-params';
import { selectUiUrlState } from 'selectors/location-selectors';
import { createSelector, createStructuredSelector } from 'reselect';

export const getLayerVariant = createSelector(
  [selectUiUrlState],
  (uiState) =>
    (uiState && uiState.biodiversityLayerVariant) || BIODIVERSITY_DEFAULT_TAB
);


export default createStructuredSelector({
  biodiversityLayerVariant: getLayerVariant
})