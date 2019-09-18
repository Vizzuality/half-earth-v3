import { useEffect, useState } from 'react';
import { loadModules } from '@esri/react-arcgis';
import { layerInMap } from 'utils/layer-manager-utils';
import { PRIORITY_PLACES_POLYGONS, PRIORITY_POLYGONS_GRAPHIC_LAYER } from 'constants/layers-slugs';
import layersConfig from 'constants/layers-config';



const FeaturedMapLayer = ({ map, view, selectedFeaturedMap, selectedTaxa, featuredPlacesLayer, handleLayerToggle }) => {
  const priorityPolygonsInitialState = {
    'all': null,
    'amphibians': null,
    'birds': null,
    'mammals': null,
    'reptiles': null
  }

  const [featuredPlacesLayerView, setFeaturedPlacesLayerView] = useState(null);
  const [ priorityPolygonsLayer, setPriorityPolygonsLayer ] = useState(null);
  const [ graphicsLayer, setGraphicsLayer ] = useState(null);
  const [ polygons, setPolygons ] = useState(priorityPolygonsInitialState);

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

  useEffect(() => {
    loadModules(
      [
        "esri/layers/GraphicsLayer"
      ]).then(([GraphicsLayer]) => {
        const _graphicsLayer = new GraphicsLayer({
          id: PRIORITY_POLYGONS_GRAPHIC_LAYER,
          title: PRIORITY_POLYGONS_GRAPHIC_LAYER,
          graphics: []
        });
        view.map.add(_graphicsLayer);
        setGraphicsLayer(_graphicsLayer);
      })
  }, [])

  useEffect(() => {
    if (selectedFeaturedMap === 'priorPlaces') {
      const layerExists = layerInMap(PRIORITY_PLACES_POLYGONS, map);
      if (!layerExists) {
        const layerConfig = layersConfig[PRIORITY_PLACES_POLYGONS];
        loadModules([`esri/layers/${layerConfig.type}`])
          .then(([LayerConstructor]) => {
            const layer = new LayerConstructor({
              url: `${layerConfig.url}`,
              title: layerConfig.title
            });
            setPriorityPolygonsLayer(layer);
          })
      }
      handleLayerToggle(PRIORITY_PLACES_POLYGONS);
    }
  }, [selectedFeaturedMap])

  useEffect(() => {
    if (selectedFeaturedMap === 'priorPlaces' && priorityPolygonsLayer) {
      if (polygons[selectedTaxa]) {
        graphicsLayer.addMany(polygons[selectedTaxa]);
      } else {
        const taxaQueryObject = taxaQuery(priorityPolygonsLayer, selectedTaxa);
        priorityPolygonsLayer.queryFeatures(taxaQueryObject)
        .then(async function(results) {
          const { features } = results;
          const graphicsArray = await createGraphicsArray(features, selectedTaxa);
          setPolygons({ ...polygons, [selectedTaxa]: graphicsArray });
          graphicsLayer.addMany(graphicsArray);
        })
      }
    }
    return function cleanUp() {
      if (graphicsLayer) { graphicsLayer.graphics = [] };
    }
  }, [selectedFeaturedMap, graphicsLayer, priorityPolygonsLayer, selectedTaxa])

  const taxaQuery = (layer, taxa) => {
    const query = layer.createQuery();
    query.where = `txSlug = '${taxa}'`
    return query;
  }
  
  const createGraphicsArray = (features, taxa) => {
    return loadModules(["esri/Graphic"])
      .then(([Graphic]) => {
        const taxaStyles = layersConfig[PRIORITY_PLACES_POLYGONS].styles[taxa];
        return features.map(feature => createGraphic(feature, Graphic, taxaStyles));
      })
  }

  const createGraphic = (feature, Graphic, taxaStyles) => {
    const { geometry } = feature;
    const { fillRgb, fillOpacity, outlineRgb, outlineOpacity } = taxaStyles;
    return new Graphic({
    symbol: {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "fill",
          material: { color: [...fillRgb, fillOpacity], },
          outline: {
            color: [...outlineRgb, outlineOpacity],
            size: 1
          }
        }
      ]
    },
    geometry
  });
  }


  return null;
}


export default FeaturedMapLayer;