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

  const handleLayerUpdate = option => {
    const { map, handleLayerToggle } = props;
    const selectedLayer = layersConfig.find(l => l.title === option);
    const layerExists = map.layers.items.some(l => l.id === selectedLayer.slug);
    const { slug, bbox } = selectedLayer;
    if (layerExists) {
      handleLayerToggle(slug);
      bbox && flyToLayerExtent(bbox);
    } else {
      createLayer(selectedLayer);
      handleLayerToggle(slug);
      bbox && flyToLayerExtent(bbox);
    }
  }
  return <Component handleLayerUpdate={handleLayerUpdate} {...props}/>
}

export default BiodiversityLayerContainer;