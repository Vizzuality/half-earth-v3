import { createThunkAction } from 'redux-tools';
import { setComponentStateToUrl } from 'utils/stateToUrl';

export const setScenePadding = createThunkAction(
  'setScenePadding',
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
  setScenePadding
}