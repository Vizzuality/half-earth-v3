import React from 'react';
import { loadModules } from '@esri/react-arcgis';
import { layersConfig } from 'constants/mol-layers-configs';
import Component from './biodiversity-layers-component';

const BiodiversityLayerContainer = props => {

  const createLayer = layer => {
    loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
      const { map } = props;
      const { url, title, slug } = layer;
      const tileLayer = new WebTileLayer({
        urlTemplate: url,
        title: title,
        id: slug,
        opacity: 0.5,
        maxScale: 2800000
      })
      map.add(tileLayer);
    });
  }

  const flyToLayerExtent = bbox => {
    const { view } = props;
    loadModules(["esri/geometry/Extent"]).then(([Extent]) => {
      const [xmin, ymin, xmax, ymax] = bbox;
      const target = new Extent({
        xmin, xmax, ymin, ymax
      })
      view.goTo({target});
    })
  }

  const handleSimpleLayerToggle = layerName => {
    const { handleLayerToggle } = props;
    const layer = layersConfig.find(l => l.title === layerName);
    handleLayerToggle(layer.slug);
  }

  const handleExclusiveLayerToggle = (layerToAdd, layerToRemove) => {
    const { map, exclusiveLayerToggle } = props;
    const addLayer = layersConfig.find(l => l.title === layerToAdd);
    const removeLayer = layersConfig.find(l => l.title === layerToRemove);
    const layerExists = map.layers.items.some(l => l.id === addLayer.slug);
    const removeSlug = removeLayer && removeLayer.slug;
    if (layerExists) {
      exclusiveLayerToggle(addLayer.slug, removeSlug);
      addLayer.bbox && flyToLayerExtent(addLayer.bbox);
    } else {
      createLayer(addLayer);
      exclusiveLayerToggle(addLayer.slug, removeSlug);
      addLayer.bbox && flyToLayerExtent(addLayer.bbox);
    }
  }
  return <Component handleExclusiveLayerToggle={handleExclusiveLayerToggle} handleSimpleLayerToggle={handleSimpleLayerToggle} {...props}/>
}

export default BiodiversityLayerContainer;
