import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { findLayerInMap } from 'utils/layer-manager-utils';
import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

export function useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace) {
  const [coords, setCoords] = useState(null);
  const [featuredPlacesLayer, setFeaturedPlacesLayer] = useState(null);
  useEffect(() => {
    const layer = findLayerInMap(FEATURED_PLACES_LAYER, map);
    setFeaturedPlacesLayer(layer);
  }, [])

  useEffect(() => {
    if (selectedFeaturedPlace && featuredPlacesLayer) {
      const query = featuredPlacesLayer.createQuery();
      query.where = `nam_slg = '${selectedFeaturedPlace}'`
      featuredPlacesLayer.queryFeatures(query).then(result => {
        const lon = get(result, 'features[0].geometry.longitude');
        const lat = get(result, 'features[0].geometry.latitude');
        setCoords([lon, lat]);
      });
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
      view.goTo(featuredPlace, options)
        .catch(function(error) {
          // Avoid displaying console errors when transition is aborted by user interacions
          if (error.name !== "AbortError") {
            console.error(error);
          }
        });
    }
  }, [coords])
}
