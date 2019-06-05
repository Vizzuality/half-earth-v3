const features_content = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: []
  }
}

export const esriGeometryToGeojson = (geometry) => {
  const geojsonObject = { 
    geojson: { 
      type: 'FeatureCollection', 
      features: [
        { 
          ...features_content, 
          geometry: { 
            coordinates: geometry.rings
          } 
        }
      ] 
    }
  };

  return JSON.stringify(geojsonObject)
}