import { createThunkAction } from 'redux-tools';
import { setComponentStateToUrl } from 'utils/stateToUrl';

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

export default {
  changeUI
}