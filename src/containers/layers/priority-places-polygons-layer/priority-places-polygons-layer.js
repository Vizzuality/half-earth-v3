import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { PRIORITY_PLACES_POLYGONS, PRIORITY_POLYGONS_GRAPHIC_LAYER } from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';

function PriorityPlacesPolygonsLayer({ view, selectedFeaturedMap, selectedTaxa }) {
  const priorityPolygonsInitialState = {
    all: null,
    amphibians: null,
    birds: null,
    mammals: null,
    reptiles: null,
  };
  const [priorityPolygonsLayer, setPriorityPolygonsLayer] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);
  const [polygons, setPolygons] = useState(priorityPolygonsInitialState);

  useEffect(() => {
    loadModules(
      [
        'esri/layers/GraphicsLayer',
      ],
    ).then(([GraphicsLayer]) => {
      const _graphicsLayer = new GraphicsLayer({
        id: PRIORITY_POLYGONS_GRAPHIC_LAYER,
        title: PRIORITY_POLYGONS_GRAPHIC_LAYER,
        graphics: [],
      });
      view.map.add(_graphicsLayer);
      setGraphicsLayer(_graphicsLayer);
    });
  }, []);

  // Create layer from the service to query it later
  useEffect(() => {
    if (selectedFeaturedMap === 'priorPlaces') {
      if (!priorityPolygonsLayer) {
        const layerConfig = layersConfig[PRIORITY_PLACES_POLYGONS];
        loadModules([`esri/layers/${layerConfig.type}`])
          .then(([LayerConstructor]) => {
            const layer = new LayerConstructor({
              url: `${layerConfig.url}`,
              title: layerConfig.title,
            });
            setPriorityPolygonsLayer(layer);
          });
      }
    }
  }, [selectedFeaturedMap]);

  // Query layer and create graphics if not done before
  useEffect(() => {
    if (selectedFeaturedMap === 'priorPlaces' && priorityPolygonsLayer) {
      if (!polygons[selectedTaxa]) {
        const taxaQueryObject = taxaQuery(priorityPolygonsLayer, selectedTaxa);
        priorityPolygonsLayer.queryFeatures(taxaQueryObject)
          .then(async (results) => {
            const { features } = results;
            const graphicsArray = await createGraphicsArray(features, selectedTaxa);
            setPolygons({ ...polygons, [selectedTaxa]: graphicsArray });
          });
      }
    }
  }, [selectedFeaturedMap, priorityPolygonsLayer, selectedTaxa]);

  // Add polygons to graphic layer
  useEffect(() => {
    if (selectedFeaturedMap === 'priorPlaces' && graphicsLayer) {
      graphicsLayer.addMany(polygons[selectedTaxa]);
    }
    return function cleanUp() {
      if (graphicsLayer) { graphicsLayer.graphics = []; }
    };
  }, [polygons, graphicsLayer, selectedTaxa, selectedFeaturedMap]);

  const taxaQuery = (layer, taxa) => {
    const query = layer.createQuery();
    query.where = `taxa_slg = '${taxa}'`;
    return query;
  };

  const createGraphicsArray = (features, taxa) => {
    return loadModules(['esri/Graphic'])
      .then(([Graphic]) => {
        return features.map((feature) => createGraphic(feature, Graphic));
      });
  };

  const createGraphic = (feature, Graphic) => {
    const { geometry } = feature;
    return new Graphic({
      symbol: {
        type: 'polygon-3d',
        symbolLayers: [
          {
            type: 'fill',
            material: { color: [6, 100, 246, 0.6] },
            outline: {
              color: [6, 100, 246, 1],
              size: 1,
            },
          },
        ],
      },
      geometry,
    });
  };
  return null;
}

export default PriorityPlacesPolygonsLayer;
