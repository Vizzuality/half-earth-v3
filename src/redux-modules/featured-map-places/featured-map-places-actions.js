import { createAction, createThunkAction } from 'redux-tools';
  import CONTENTFUL from 'services/contentful';

export const setFeaturedMapPlaces = createThunkAction('setFeaturedMapPlaces', (slug) => async (dispatch, state) => {
  const { featuredMapPlaces: { data }} = state();
  if (!data) {
    try {
      const data = await CONTENTFUL.getFeaturedPlacesData(slug);
      const dataObject = data.reduce((acc, place) => {
        return { ...acc,
            [place.slug]: {
              title: place.title,
              imageUrl: place.image,
              description: place.description.content[0].content[0].value
            }
          }
      }, {})
      dispatch(fetchFeaturedMapPlacesReady({ data: dataObject }));
    } catch (e) {
      console.warn(e);
      dispatch(fetchFeaturedMapPlacesFail(e));
    }
  }
});

export const fetchFeaturedMapPlacesFail = createAction('fetchFeaturedMapPlacesFail');
export const fetchFeaturedMapPlacesReady = createAction('fetchFeaturedMapPlacesReady');