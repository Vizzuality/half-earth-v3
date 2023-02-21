import { createAction, createThunkAction } from 'redux-tools';

import CONTENTFUL from 'services/contentful/contentful';

const CONFIG = { imageWidth: 300, imageHeight: 190 };

export const fetchFeaturedMapPlacesFail = createAction(
  'fetchFeaturedMapPlacesFail'
);
export const fetchFeaturedMapPlacesReady = createAction(
  'fetchFeaturedMapPlacesReady'
);

export const setFeaturedMapPlaces = createThunkAction(
  'setFeaturedMapPlaces',
  ({ slug, locale }) =>
    async (dispatch, state) => {
      const {
        featuredMapPlaces: { data },
      } = state();
      try {
        const places = await CONTENTFUL.getFeaturedPlacesData(
          slug,
          CONFIG,
          locale
        );
        const dataObject = places.reduce((acc, place) => {
          const description = [];
          if (place.description) {
            place.description.content.forEach((paragraph) => {
              const p = paragraph.content.reduce((accum, sentence) => {
                if (
                  sentence.nodeType === 'text' &&
                  sentence.marks[0] &&
                  sentence.marks[0].type === 'bold'
                )
                  return `${accum}<p><b>${sentence.value}</b></p>`;
                if (sentence.nodeType === 'text')
                  return `${accum}<p>${sentence.value}</p>`;
                return accum;
              }, '');
              description.push(p);
            });
          }
          return {
            ...acc,
            [place.slug]: {
              title: place.title,
              imageUrl: place.image,
              description: description.join('\n'),
            },
          };
        }, {});
        dispatch(
          fetchFeaturedMapPlacesReady({ data: { ...data, [slug]: dataObject } })
        );
      } catch (e) {
        console.warn(e);
        dispatch(fetchFeaturedMapPlacesFail(e));
      }
    }
);
