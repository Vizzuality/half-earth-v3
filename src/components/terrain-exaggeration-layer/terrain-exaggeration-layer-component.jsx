import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

const exaggeratedElevationLayerComponent = ({ map, exaggeration = 2}) => {

  useEffect(() => {
    loadModules(["esri/layers/ElevationLayer", "esri/layers/BaseElevationLayer"]).then(([ElevationLayer, BaseElevationLayer]) => {
      const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
    
        properties: {
          exaggeration
        },
      
        load: function () {
          this._elevation = new ElevationLayer({
            url: "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
          });
      
          this.addResolvingPromise(this._elevation.load());
        },
      
        fetchTile: function (level, row, col) {
          // calls fetchTile() on the elevationlayer for the tiles
          // visible in the view
          return this._elevation.fetchTile(level, row, col)
            .then(function (data) {
      
              var exaggeration = this.exaggeration;
              for (var i = 0; i < data.values.length; i++) {
                data.values[i] = data.values[i] * exaggeration;
              }
      
              return data;
            }.bind(this));
        }
      });
    
      map.ground.layers = [new ExaggeratedElevationLayer()];
    })

    return () => {
      map.ground.layers = [];
    }
  }, [])

  return null
};

export default exaggeratedElevationLayerComponent;