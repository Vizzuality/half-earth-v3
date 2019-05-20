import { createSelector, createStructuredSelector } from 'reselect';
import { selectAnimationsUrlState } from 'selectors/location-selectors';
import initialState from 'pages/data-globe/data-globe-initial-state';

const getAnimationsSettings = createSelector(selectAnimationsUrlState, animationsUrlState => {
  return {
    ...initialState.animations,
    ...animationsUrlState
  }
})

const getCategoryBoxesAnimationEnded = createSelector(getAnimationsSettings, animationsSettings => animationsSettings.categoryBoxesAnimationEnded)

export default createStructuredSelector({
  isCategoryBoxesAnimationEnded: getCategoryBoxesAnimationEnded
})