import React, { useEffect, useState } from 'react';
import { Scene, loadModules } from '@esri/react-arcgis';


const CustomWebSceneComponent = ({ onLoad, children, loadElement, basemapId}) => {
  const [basemap, setBasemap] = useState();
  useEffect(() => {
    loadModules(["esri/Basemap"]).then(([Basemap])=> {
      const bm = new Basemap({
        portalItem: {
          id: basemapId // WGS84 Streets Vector webmap
        }
      });
      setBasemap(bm)
    })
  }, [basemap])
  return (
    <Scene
    style={{ width: '100vw', height: '100vh' }}
    mapProperties={{ basemap: basemap || 'satellite' }}
    viewProperties={{
        center: [-122.4443, 47.2529],
        zoom: 6
    }}/>
  )
}

export default CustomWebSceneComponent;