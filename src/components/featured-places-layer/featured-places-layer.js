import { useEffect, useState } from 'react';
import { loadModules } from '@esri/react-arcgis';



const FeaturedMapLayer = ({ view, selectedFeaturedMap, selectedTaxa, featuredPlacesLayer }) => {

  const [featuredPlacesLayerView, setFeaturedPlacesLayerView] = useState(null);

  // store featured places layer view to query against it
  useEffect(() => {
    if (featuredPlacesLayer) {
      view.whenLayerView(featuredPlacesLayer).then(function(layerView){
        setFeaturedPlacesLayerView(layerView);
      })
    }
  }, [featuredPlacesLayer])

  // display only the places belonging to the selected featured map
  useEffect(() => {
    if (featuredPlacesLayerView) {
      const whereClause = selectedFeaturedMap === 'priorPlaces' ? `txSlug = '${selectedTaxa}'` : `ftr_slg = '${selectedFeaturedMap}'`
      loadModules(["esri/views/layers/support/FeatureFilter"]).then(([FeatureFilter]) => {
        featuredPlacesLayerView.filter = new FeatureFilter({
          where: whereClause
        });
      })
    }
  }, [featuredPlacesLayerView, selectedFeaturedMap, selectedTaxa])

  return null;
}


export default FeaturedMapLayer;