// import { useState, useEffect } from 'react';
import { loadModules } from '@esri/react-arcgis';

const tileTypeLoadersMap = {
  tile: 'esri/layers/TileLayer'
}

const ArcgisLagerManager = ({ map, view }) => {
  const { layers } = map;
  const inactiveLayers = layers.items.filter(l => l.visible === false)
  console.log(tileTypeLoadersMap[inactiveLayers[0].type])
  loadModules([`${tileTypeLoadersMap[inactiveLayers[0].type]}`]).then(([tileLayer]) => {
    var layer = new tileLayer({
      url: inactiveLayers[0].url
    });
    console.log(layer)
    map.add(layer, 0)
  })
  return null
}

export default ArcgisLagerManager;