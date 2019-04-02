import React from 'react';
import { Scene } from '@esri/react-arcgis';



const GlobeComponent = () => {
  return (
    <Scene
      style={{ width: '100vw', height: '100vh' }}
      mapProperties={{ basemap: 'satellite' }}
    />
  )
}

export default GlobeComponent;