import { useEffect, useState } from 'react';
import { loadModules } from '@esri/react-arcgis';
import { layerManagerVisibility, createLayer } from 'utils/layer-manager-utils'; 



const FeaturedMapLayer = ({ map, view, selectedFeaturedMap, featuredPlacesLayer }) => {

  const [featuredPlacesLayerView, setFeaturedPlacesLayerView] = useState(null);
  const [priorityPolygonsFeatureLayer, setPriorityPolygonsFeatureLayer] = useState(null);

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
      loadModules(["esri/views/layers/support/FeatureFilter"]).then(([FeatureFilter]) => {
        featuredPlacesLayerView.filter = new FeatureFilter({
          where: `ftr_slg = '${selectedFeaturedMap}'`
        });
      })
    }
  }, [featuredPlacesLayerView, selectedFeaturedMap])

  useEffect(() => {
    if (selectedFeaturedMap === 'biodiversityPlaces') {
      if (!priorityPolygonsFeatureLayer) {
        loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
         const priorityPolygonsLayer = new FeatureLayer({
           // URL to the service
           url: "https://utility.arcgis.com/usrsvcs/servers/9d466a49b2594519bd5dbf4a9d38195f/rest/services/disPriorFacet_v1/FeatureServer"
         });
         setPriorityPolygonsFeatureLayer(priorityPolygonsLayer);
       })
      }
    }
  }, [])

  useEffect(() => {
    if (selectedFeaturedMap === 'biodiversityPlaces' && priorityPolygonsFeatureLayer) {

      map.add(priorityPolygonsFeatureLayer);
      const layer = map.layers.items.find(l => l.title === 'DisPriorFacet v1');
      console.log(layer)
    } 
  }, [selectedFeaturedMap, priorityPolygonsFeatureLayer])

  return null;
}


export default FeaturedMapLayer;