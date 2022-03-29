import { createStructuredSelector, createSelector } from 'reselect';
import { selectUiUrlState } from 'selectors/location-selectors';

const getOnBoardingType = createSelector(selectUiUrlState, uiSettings => uiSettings.onBoardingType);
const getOnBoardingStep = createSelector(selectUiUrlState, uiSettings => uiSettings.onBoardingStep);
const getWaitingInteraction = createSelector(selectUiUrlState, uiSettings => uiSettings.waitingInteraction);

const mapStateToProps = createStructuredSelector({
  onBoardingType: getOnBoardingType,
  onBoardingStep: getOnBoardingStep,
  waitingInteraction: getWaitingInteraction
});

export default mapStateToProps;
