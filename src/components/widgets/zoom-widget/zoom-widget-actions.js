import { createThunkAction } from 'redux-tools';
import { setComponentStateToUrl } from 'utils/stateToUrl';

export const setGlobeChange = createThunkAction(
  'setGlobeChange',
  change => (dispatch, state) =>
    dispatch(
      setComponentStateToUrl({
        key: 'globe',
        change,
        state
      })
    )
);

export default { setGlobeChange };
