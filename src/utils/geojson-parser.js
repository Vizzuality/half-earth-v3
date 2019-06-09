export const esriGeometryToGeojson = (geometry) => {
  const geojsonObject = {
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: geometry.rings
          }
        }
      ]
    }
  };

  return JSON.stringify(geojsonObject);
};
