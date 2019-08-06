import { createThunkAction } from 'redux-tools';
import { setComponentStateToUrl } from 'utils/stateToUrl';

export const setFeaturedGlobeSettings = createThunkAction(
  'setFeaturedGlobeSettings',
  change => (dispatch, state) =>
    dispatch(
      setComponentStateToUrl({
        key: 'globe',
        change,
        state
      })
    )
);

export default {
  setFeaturedGlobeSettings
}