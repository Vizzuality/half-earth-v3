import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

export const setSelectedFeaturedPlace = (event, view, changeUI) => {
  view.hitTest(event).then(function(response) {
    const featuredPoint = response.results.filter((result) => result.graphic.layer.title === FEATURED_PLACES_LAYER);
    const selectedFeaturedPlace = featuredPoint.length ? featuredPoint[0].graphic.attributes.nam_slg : null;
    if (selectedFeaturedPlace) changeUI({ selectedFeaturedPlace });
  });
}