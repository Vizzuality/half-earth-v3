import { useEffect, useState } from 'react';
import { get } from 'lodash';

export function useFeaturedPlaceViewCameraChange(view, selectedFeaturedPlace, featuredPlacesLayer, isLandscapeMode) {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    if (selectedFeaturedPlace && featuredPlacesLayer && !isLandscapeMode) {
      const query = featuredPlacesLayer.createQuery();
      query.where = `nam_slg = '${selectedFeaturedPlace}'`
      featuredPlacesLayer.queryFeatures(query).then(result => {
        const lon = get(result, 'features[0].attributes.lon');
        const lat = get(result, 'features[0].attributes.lat');
        setCoords([lon, lat]);
      });
    } else if (!isLandscapeMode) {
      view.goTo({ tilt: 0, zoom: 1 });
    }
  }, [selectedFeaturedPlace, featuredPlacesLayer, isLandscapeMode])

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