import { createAction, createThunkAction } from 'redux-tools';

import CONTENTFUL from 'services/contentful';

const CONFIG = { imageWidth: 1000, imageHeight: 1000 };

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
        let places = await CONTENTFUL.getFeaturedPlacesData(
          slug,
          CONFIG,
          locale
        );

        if (places[0].hasOwnProperty('dateTime') && places[0].hasOwnProperty('hepmLink')) {
          places = places.slice().sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        }

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
              link: place.link,
              hepmLink: place.hepmLink,
              dateTime: place.dateTime,
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
