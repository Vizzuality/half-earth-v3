import { createAction, createThunkAction } from 'redux-tools';
  import CONTENTFUL from 'services/contentful';
  const CONFIG = { imageWidth: 300, imageHeight: 190 };
export const setFeaturedMapPlaces = createThunkAction('setFeaturedMapPlaces', (slug) => async (dispatch, state) => {
  const { featuredMapPlaces: { data }} = state();
  if (!data || !data[slug]) {
    try {
      const places = await CONTENTFUL.getFeaturedPlacesData(slug, CONFIG);
      const dataObject = places.reduce((acc, place) => {
        const description = [];
        place.description && place.description.content.forEach((paragraph) => {
          const p = paragraph.content.reduce((acc, sentence) => {
            if (sentence.nodeType === 'text') return acc + sentence.value;
            return acc;
          }, '');
          description.push(p);
        })
        return { ...acc,
            [place.slug]: {
              title: place.title,
              imageUrl: place.image,
              description: description.join('\n')
            }
          }
      }, {})
      dispatch(fetchFeaturedMapPlacesReady({ data: { ...data, [slug]: dataObject} }));
    } catch (e) {
      console.warn(e);
      dispatch(fetchFeaturedMapPlacesFail(e));
    }
  }
});

export const fetchFeaturedMapPlacesFail = createAction('fetchFeaturedMapPlacesFail');
export const fetchFeaturedMapPlacesReady = createAction('fetchFeaturedMapPlacesReady');