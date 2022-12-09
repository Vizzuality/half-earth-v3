import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { selectUiUrlState } from 'selectors/location-selectors';

import aoiSceneConfig from 'scenes/aoi-scene/config';

const getUiSettings = createSelector(selectUiUrlState, (uiUrlState) => {
  return {
    ...aoiSceneConfig.ui,
    ...uiUrlState,
  };
});

const selectMetadataData = ({ metadata }) =>
  metadata && (!isEmpty(metadata.data) || null);
const getActiveCategory = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.activeCategory
);
export const getOnboardingType = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.onboardingType
);
export const getOnboardingStep = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.onboardingStep
);
export const getOnWaitingInteraction = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.waitingInteraction
);

export default createStructuredSelector({
  hasMetadata: selectMetadataData,
  activeCategory: getActiveCategory,
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
});
