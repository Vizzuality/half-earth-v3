import { createAction, createThunkAction } from 'redux-tools';

export const fetchFeaturedMapReady = createAction(
  'fetchFeaturedMapReady'
);
export const fetchFeaturedMapFail = createAction(
  'fetchFeaturedMapFail'
);

export const setFeaturedMap = createThunkAction(
  'setFeaturedMap',
  ({ slug }) =>
    async (dispatch, state) => {
      const {
        featuredMap: { data },
      } = state();
        dispatch(
          fetchFeaturedMapReady({ data: slug  })
        );
    }
);
