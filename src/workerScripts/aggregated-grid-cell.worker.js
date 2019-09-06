if ('function' === typeof importScripts) {
  /* global importScripts */
  importScripts('https://js.arcgis.com/4.12/');

  // onmessage = function (e) {
  //   console.log(e)
  //   const data = JSON.parse(e.data);
  //   console.log(data)
  //   switch(data.type) {
  //     case 'multipleGridCell':
  //         require([
  //           "esri/geometry/geometryEngine"
  //         ], function(geometryEngine ) {
  //           const aggregatedGridCells = geometryEngine.union(data.results.features.map(gc => gc.geometry));
  //           postMessage({
  //             status: 'COMPLETED',
  //             type: data.type,
  //             payload: JSON.stringify(aggregatedGridCells)
  //           })
  //         })
  //       break;
  //     case 'singleGridCell':
  //       console.log('no aggregation')
  //       break;
        
  //     default:
  //       throw new Error(`Action ${data.type} is not handled by cool-worker`);
  //   }
  // }

  onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log(data)
    const extent = data.viewExtent;
    require(['esri/layers/FeatureLayer', 'esri/geometry/Extent'], function(FeatureLayer, Extent) {
      const layer = new FeatureLayer({
        url: "https://utility.arcgis.com/usrsvcs/servers/e6c05ee3ee7b45af9577904bf9238529/rest/services/Biodiversity_Facets_Dissolved/FeatureServer/0"
      });
      const query = layer.createQuery();
      query.geometry = new Extent(extent);
      query.spatialRelationship = "contains";
      
      layer.queryFeatures(query).then(function(results) {
        console.log(results)
      })
    })
  }
}