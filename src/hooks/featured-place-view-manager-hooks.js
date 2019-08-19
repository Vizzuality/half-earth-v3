import { useEffect, useState } from 'react';
import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

export function useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace) {
const [coords, setCoords] = useState(null);
const { layers } = map;
const featuredPlacesLayer = layers.items.find(l => l.title === FEATURED_PLACES_LAYER);
const query = featuredPlacesLayer.createQuery();
useEffect(() => {
  if (selectedFeaturedPlace) {
    query.where = `nam_slg = '${selectedFeaturedPlace}'`
    featuredPlacesLayer.queryFeatures(query).then(result => {
      const { lon, lat } = result.features[0].attributes;
      setCoords([lon, lat]);
    });
  } else {
    view.goTo({ tilt: 0, zoom: 1 });
  }
}, [selectedFeaturedPlace])

  useEffect(() => {
    if (coords) {
      const tilt = 35;
      const heading = 0;
      const zoom = 6;
      const target = coords;
      const featuredPlace = { target, zoom, tilt, heading };
      const options = {
        speedFactor: 0.5,
        duration: 1000
      }
      view.goTo(featuredPlace, options);
    }
  }, [coords])
}