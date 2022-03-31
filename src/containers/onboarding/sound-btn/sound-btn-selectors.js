import { createStructuredSelector, createSelector } from 'reselect';
import { selectUiUrlState } from 'selectors/location-selectors';

const getOnboardingType = createSelector(selectUiUrlState, uiSettings => uiSettings.onboardingType);
const getOnboardingStep = createSelector(selectUiUrlState, uiSettings => uiSettings.onboardingStep);
const getWaitingInteraction = createSelector(selectUiUrlState, uiSettings => uiSettings.waitingInteraction);

const mapStateToProps = createStructuredSelector({
  onboardingType: getOnboardingType,
  onboardingStep: getOnboardingStep,
  waitingInteraction: getWaitingInteraction
});

export default mapStateToProps;
