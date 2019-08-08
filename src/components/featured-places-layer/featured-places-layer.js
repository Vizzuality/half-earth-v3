import { useEffect, useState } from 'react';
import { loadModules } from '@esri/react-arcgis';



const FeaturedMapLayer = ({ map, view, selectedFeaturedMap }) => {

  const [featuredPlacesLayer, setFeaturedPlacesLayer] = useState(null);
  const [featuredPlacesLayerView, setFeaturedPlacesLayerView] = useState(null);

  useEffect(() => {
    const featuredPlaces = map.layers.items.find(l => l.title === 'featured_places');
    setFeaturedPlacesLayer(featuredPlaces);
  }, [])

  useEffect(() => {
    if (featuredPlacesLayer) {
      view.whenLayerView(featuredPlacesLayer).then(function(layerView){
        setFeaturedPlacesLayerView(layerView);
      })
    }
  }, [featuredPlacesLayer])

  useEffect(() => {
    if (featuredPlacesLayerView) {
      loadModules(["esri/views/layers/support/FeatureFilter"]).then(([FeatureFilter]) => {
        featuredPlacesLayerView.filter = new FeatureFilter({
          where: `ftr_slg = '${selectedFeaturedMap}'`
        });
      })
    }
  }, [featuredPlacesLayerView, selectedFeaturedMap])
  return null;
}


export default FeaturedMapLayer;