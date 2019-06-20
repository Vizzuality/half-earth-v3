import { loadModules } from '@esri/react-arcgis';
import { FEATURES_LABELS_LAYER } from 'constants/base-layers';

const labelClassFactory = (LabelClassConstructor, feature, color) => {
  return new LabelClassConstructor({
    labelExpressionInfo: {
      expression: "$feature.name" // Text for labels comes from COUNTY field
    },
    where: `featurecla = ${feature}`,
    labelPlacement: 'center-center',
    symbol: {
      type: "label-3d",
      symbolLayers: [{
        type: "text",
        material: { color: 'black' },
        size: 8, // points
        halo: { color: [...color, 0.4], size: '1px' }
      }]
    }
  });
}
const LabelsLayerComponent = ({ map }) => {
  const { layers: { items } } = map;
  const labelsLayer = items.find(l => l.id === FEATURES_LABELS_LAYER);
  loadModules(["esri/layers/support/LabelClass"])
    .then(([LabelClass]) => {

      var mountains = labelClassFactory(LabelClass, 'Range/mtn', [49,163,84]);
      var basins = labelClassFactory(LabelClass, 'Basin', [239, 189, 136]);
      var deserts = labelClassFactory(LabelClass, 'Desert', [239, 189, 136]);
      var geoArea = labelClassFactory(LabelClass, 'Geoarea', [239, 189, 136]);
      var islands = labelClassFactory(LabelClass, 'Island group', [239, 189, 136]);

      // Add labels to the feature layer
      labelsLayer.opacity = 0;
      labelsLayer.labelsVisible = true;
      labelsLayer.labelingInfo = [mountains, basins, deserts, geoArea, islands];
    })
  
  return null
}

export default LabelsLayerComponent;