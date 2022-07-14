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

// change the 'lang' key in url
export const changeLang = createThunkAction(
  'changeLang',
  change => (dispatch, state) =>
    dispatch(
      setComponentStateToUrl({
        key: 'lang',
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

export const browsePage = createThunkAction(
  'browsePage',
  routerAction => (dispatch) => dispatch(routerAction)
)

export default {
  changeUI,
  changeGlobe,
  changeLang,
  browsePage
}
