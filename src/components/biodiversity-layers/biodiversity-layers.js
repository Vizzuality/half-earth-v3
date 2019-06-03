import React from 'react';
import { loadModules } from '@esri/react-arcgis';
import { layersConfig } from 'constants/mol-layers-configs';
import Component from './biodiversity-layers-component';

const BiodiversityLayerContainer = props => {

  const handleLayerUpdate = option => {
    const { map, handleLayerToggle } = props;
    const selectedLayer = layersConfig.find(l => l.title === option);
    const layerExists = map.layers.items.some(l => l.id === selectedLayer.slug);
    if (layerExists) {
      handleLayerToggle(selectedLayer.slug)
    } else {
      loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
        const tileLayer = new WebTileLayer({
          urlTemplate: selectedLayer.url,
          title: selectedLayer.title,
          id: selectedLayer.slug,
          opacity: 0.5,
          maxScale: 2800000
        })
        map.add(tileLayer)
        handleLayerToggle(selectedLayer.slug)
      });
    }
  }
  return <Component handleLayerUpdate={handleLayerUpdate} {...props}/>
}

export default BiodiversityLayerContainer;