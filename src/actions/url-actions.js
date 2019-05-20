import { createThunkAction } from 'redux-tools';
import { setComponentStateToUrl } from 'utils/stateToUrl';

// change the 'ui' key in url
export const changeUI = createThunkAction(
  'changeUI',
  change => (dispatch, state) =>
    dispatch(
      setComponentStateToUrl({
        key: 'ui',
        change,
        state
      })
    )
);

export const changeGlobe = createThunkAction(
  'changeGlobe',
  change => (dispatch, state) =>
    dispatch(
      setComponentStateToUrl({
        key: 'globe',
        change,
        state
      })
    )
);

export const changeAnimations = createThunkAction(
  'changeAnimations',
  change => (dispatch, state) =>
    dispatch(
      setComponentStateToUrl({
        key: 'animations',
        change,
        state
      })
    )
);

export default {
  changeUI,
  changeGlobe,
  changeAnimations
}