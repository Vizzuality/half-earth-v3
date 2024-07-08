import { useEffect, useState } from 'react';

import { findLayerInMap } from 'utils/layer-manager-utils';

import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter.js';

import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

function FeaturedMapLayer({
  map,
  view,
  selectedFeaturedMap,
  isFullscreenActive,
  selectedTaxa,
}) {
  const [featuredPlacesLayerView, setFeaturedPlacesLayerView] = useState(null);
  const [featuredPlacesLayer, setFeaturedPlacesLayer] = useState(null);

  useEffect(() => {
    const layer = findLayerInMap(FEATURED_PLACES_LAYER, map);
    setFeaturedPlacesLayer(layer);
  }, []);

  // store featured places layer view to query against it
  useEffect(() => {
    if (view && featuredPlacesLayer) {
      view.whenLayerView(featuredPlacesLayer).then((layerView) => {
        setFeaturedPlacesLayerView(layerView);
      });
    }
  }, [featuredPlacesLayer, view]);

  // display only the places belonging to the selected featured map
  useEffect(() => {
    if (featuredPlacesLayerView) {
      const whereClause =
        selectedFeaturedMap === 'priorPlaces'
          ? `taxa_slg = '${selectedTaxa}'`
          : `ftr_slg = '${selectedFeaturedMap}'`;

      featuredPlacesLayerView.filter = new FeatureFilter({
        where: whereClause,
      });
    }
  }, [featuredPlacesLayerView, selectedFeaturedMap, selectedTaxa]);

  useEffect(() => {
    if (featuredPlacesLayerView) {
      featuredPlacesLayerView.visible = true;
    }
  }, [isFullscreenActive]);

  return null;
}

export default FeaturedMapLayer;
