import { loadModules } from '@esri/react-arcgis';
import { FEATURES_LABELS_LAYER } from 'constants/base-layers';

const labelClassFactory = (LabelClassConstructor, feature, color, minScale, maxScale) => {
  return new LabelClassConstructor({
    labelExpressionInfo: {
      expression: "$feature.name" // Text for labels comes from COUNTY field
    },
    // where: `featurecla = ${feature} AND featurecla = `,
    labelPlacement: 'center-center',
    // minScale: "$feature.max_scale",
    // maxScale: "$feature.min_scale",
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

      var mountains = labelClassFactory(LabelClass, 'Range/mtn', [49,163,84], 4500000, 1000);
      // var basins = labelClassFactory(LabelClass, 'Basin', [239, 189, 136], 3500000, 1000);
      // var deserts = labelClassFactory(LabelClass, 'Desert', [239, 189, 136], 3500000, 1000);
      // var geoArea = labelClassFactory(LabelClass, 'Geoarea', [239, 189, 136], 2500000, 1000);
      // var islands = labelClassFactory(LabelClass, 'Island', [239, 189, 136], 10000000, 1000);
      // var archipielago = labelClassFactory(LabelClass, 'Continent', [239, 189, 136], 130000000, 10000000);

      // Add labels to the feature layer
      labelsLayer.opacity = 0;
      labelsLayer.labelsVisible = true;
      labelsLayer.labelingInfo = [mountains];
    })
  
  return null
}

export default LabelsLayerComponent;