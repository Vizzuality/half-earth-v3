import { createAction, createThunkAction } from 'redux-tools';

const { REACT_APP_GEO_DESCRIBER_API } = process.env;

export const setGeoDescriptionLoading = createAction(
  'SET_GEO_DESCRIPTION_LOADING'
);
export const setGeoDescriptionReady = createAction(
  'SET_GEO_DESCRIPTION_READY'
);
export const setGeoDescriptionError = createAction(
  'SET_GEO_DESCRIPTION_ERROR'
);
export const fetchGeoDescription = createThunkAction(
  'fetchGeoDescription',
  (geojson) => async (dispatch, getState) => {
    const state = getState();

    // do not fetch if already fetched for the same geojson
    if (state.geoDescription.geojson === geojson) return;

    dispatch(setGeoDescriptionLoading(geojson));
    try {
      const response = await fetch(REACT_APP_GEO_DESCRIBER_API, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: geojson
      });

      // when already loading other geojson then ingore this response
      if (getState().geoDescription.geojson !== geojson) return;

      if (!response.ok) {
        throw new Error('Error while loading geodescription');
      }

      const result = await response.json();
      dispatch(setGeoDescriptionReady({
        title: result.data && result.data.title,
        description: result.data && result.data.description
      }));
    } catch (e) {
      console.warn(e);
      dispatch(setGeoDescriptionError(e));
    }
  }
);
