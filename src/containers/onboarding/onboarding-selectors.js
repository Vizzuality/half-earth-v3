import { createSelector, createStructuredSelector } from 'reselect';
import { selectUiUrlState } from 'selectors/location-selectors';

const getOnboardingType = createSelector(selectUiUrlState, uiState => uiState.onboardingType);
const getOnboardingStep = createSelector(selectUiUrlState, uiState => uiState.onboardingStep);
const getOnWaitingInteraction = createSelector(selectUiUrlState, uiState => uiState.waitingInteraction);

export default createStructuredSelector({
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getOnWaitingInteraction,
})
