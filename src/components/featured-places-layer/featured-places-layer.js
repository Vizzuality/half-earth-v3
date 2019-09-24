import { useEffect, useState } from 'react';
import { loadModules } from '@esri/react-arcgis';



const FeaturedMapLayer = ({ map, view, selectedFeaturedMap, featuredPlacesLayer, isLandscapeMode }) => {

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
      featuredPlacesLayerView.visible = true;
      loadModules(["esri/views/layers/support/FeatureFilter"]).then(([FeatureFilter]) => {
        featuredPlacesLayerView.filter = new FeatureFilter({
          where: `ftr_slg = '${selectedFeaturedMap}'`
        });
      })
    } 
  }, [featuredPlacesLayerView, selectedFeaturedMap, isLandscapeMode])

  useEffect(() => {
    if (isLandscapeMode) {
      featuredPlacesLayerView.visible = false;
    }
  }, [isLandscapeMode])

  return null;
}


export default FeaturedMapLayer;