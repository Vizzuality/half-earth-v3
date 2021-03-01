import { LAYER_VARIANTS } from 'constants/landscape-view-constants';
import { selectUiUrlState } from 'selectors/location-selectors';
import { createSelector, createStructuredSelector } from 'reselect';

export const getLayerVariant = createSelector([selectUiUrlState], (uiState) => (
  (uiState && uiState.biodiversityLayerVariant) || LAYER_VARIANTS.PRIORITY
));


export default createStructuredSelector({
  biodiversityLayerVariant: getLayerVariant
})