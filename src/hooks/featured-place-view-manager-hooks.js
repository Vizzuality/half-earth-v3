import { useEffect, useState } from 'react';

export function useFeaturedPlaceViewCameraChange(view, selectedFeaturedPlace, featuredPlacesLayer) {
const [coords, setCoords] = useState(null);
useEffect(() => {
  if (selectedFeaturedPlace && featuredPlacesLayer) {
    const query = featuredPlacesLayer.createQuery();
    query.where = `nam_slg = '${selectedFeaturedPlace}'`
    featuredPlacesLayer.queryFeatures(query).then(result => {
      const { lon, lat } = result.features[0].attributes;
      setCoords([lon, lat]);
    });
  } else {
    view.goTo({ tilt: 0, zoom: 1 });
  }
}, [selectedFeaturedPlace, featuredPlacesLayer])

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