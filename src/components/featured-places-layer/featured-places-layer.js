import { useEffect, useState } from 'react';
import { loadModules } from '@esri/react-arcgis';



const FeaturedMapLayer = ({ view, selectedFeaturedMap, featuredPlacesLayer, isLandscapeMode, isFullscreenActive,  selectedTaxa }) => {
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
      const whereClause = selectedFeaturedMap === 'priorPlaces' ? `taxa_slg = '${selectedTaxa}'` : `ftr_slg = '${selectedFeaturedMap}'`
      featuredPlacesLayerView.visible = true;
      loadModules(["esri/views/layers/support/FeatureFilter"]).then(([FeatureFilter]) => {
        featuredPlacesLayerView.filter = new FeatureFilter({
          where: whereClause
        });
      })
    } 
  }, [featuredPlacesLayerView, selectedFeaturedMap, isLandscapeMode, selectedTaxa])

  useEffect(() => {
    if(featuredPlacesLayerView)
      featuredPlacesLayerView.visible = !isLandscapeMode && !isFullscreenActive;

  }, [isLandscapeMode, isFullscreenActive])

  return null;
}


export default FeaturedMapLayer;