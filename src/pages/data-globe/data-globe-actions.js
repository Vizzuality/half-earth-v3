import { createThunkAction } from 'redux-tools';
import { setComponentStateToUrl } from 'utils/stateToUrl';

export const setDataGlobeSettings = createThunkAction(
  'setDataGlobeSettings',
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
  setDataGlobeSettings
}