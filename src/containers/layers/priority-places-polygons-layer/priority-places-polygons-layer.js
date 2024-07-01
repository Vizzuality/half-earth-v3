import { useEffect, useState } from 'react';

import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';

import {
  PRIORITY_PLACES_POLYGONS,
  PRIORITY_POLYGONS_GRAPHIC_LAYER,
} from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';

function PriorityPlacesPolygonsLayer({
  view,
  selectedFeaturedMap,
  selectedTaxa,
}) {
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
    // eslint-disable-next-line no-underscore-dangle
    const _graphicsLayer = new GraphicsLayer({
      id: PRIORITY_POLYGONS_GRAPHIC_LAYER,
      title: PRIORITY_POLYGONS_GRAPHIC_LAYER,
      graphics: [],
    });
    view.map.add(_graphicsLayer);
    setGraphicsLayer(_graphicsLayer);
  }, []);

  // Create layer from the service to query it later
  useEffect(() => {
    if (selectedFeaturedMap === 'priorPlaces') {
      if (!priorityPolygonsLayer) {
        const layerConfig = layersConfig[PRIORITY_PLACES_POLYGONS];
        const getLayer = () => {
          switch (layerConfig.type) {
            case 'FeatureLayer':
              return FeatureLayer;
            case 'TileLayer':
              return TileLayer;
            case 'WebTileLayer':
              return WebTileLayer;
            default:
              console.warn('Invalid layer type', layerConfig.type);
              return WebTileLayer;
          }
        };
        const Layer = getLayer();
        const layer = new Layer({
          url: `${layerConfig.url}`,
          title: layerConfig.title,
        });
        setPriorityPolygonsLayer(layer);
      }
    }
  }, [selectedFeaturedMap]);

  const taxaQuery = (layer, taxa) => {
    const query = layer.createQuery();
    query.where = `taxa_slg = '${taxa}'`;
    return query;
  };

  const createGraphicsArray = (features) => {
    const createGraphic = (feature) => {
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
    return features.map((feature) => createGraphic(feature));
  };

  // Query layer and create graphics if not done before
  useEffect(() => {
    if (selectedFeaturedMap === 'priorPlaces' && priorityPolygonsLayer) {
      if (!polygons[selectedTaxa]) {
        const taxaQueryObject = taxaQuery(priorityPolygonsLayer, selectedTaxa);
        priorityPolygonsLayer
          .queryFeatures(taxaQueryObject)
          .then(async (results) => {
            const { features } = results;
            const graphicsArray = await createGraphicsArray(
              features,
              selectedTaxa
            );
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
      if (graphicsLayer) {
        graphicsLayer.graphics = [];
      }
    };
  }, [polygons, graphicsLayer, selectedTaxa, selectedFeaturedMap]);

  return null;
}

export default PriorityPlacesPolygonsLayer;
