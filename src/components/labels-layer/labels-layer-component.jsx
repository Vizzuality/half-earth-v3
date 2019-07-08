import { loadModules } from '@esri/react-arcgis';
import { FEATURES_LABELS_LAYER } from 'constants/base-layers';
import { stylesConfig } from './labels-layer-styles-config';

const labelClassFactory = (LabelClassConstructor, styleGroup) => {
  const config = stylesConfig[styleGroup];
  return new LabelClassConstructor({
    labelPlacement: 'center-center',
    labelExpressionInfo: {
      expression: "$feature.name"
    },
    where: `style = ${styleGroup}`,
    symbol: {
      type: "label-3d",
      symbolLayers: [{
        type: "text",
        font: {
          family: config.fontFamily,
          style: config.fontStyle,
          size: config.fontSize
        },
        material: { color: config.color }
        //halo: { color: [...color, 0.4], size: '1px' }
      }]
    }
  });
}
const LabelsLayerComponent = ({ map }) => {
  const { layers: { items } } = map;
  const labelsLayer = items.find(l => l.id === FEATURES_LABELS_LAYER);
  loadModules(["esri/layers/support/LabelClass"])
    .then(([LabelClass]) => {

      var style_1_ter = labelClassFactory(LabelClass, 'style_1_ter');
      var style_2_ter = labelClassFactory(LabelClass, 'style_2_ter');
      var style_3_ter = labelClassFactory(LabelClass, 'style_3_ter');
      var style_4_ter = labelClassFactory(LabelClass, 'style_4_ter');
      var style_1_aq = labelClassFactory(LabelClass, 'style_1_aq');
      var style_2_aq = labelClassFactory(LabelClass, 'style_2_aq');
      var style_3_aq = labelClassFactory(LabelClass, 'style_3_aq');
      var style_4_aq = labelClassFactory(LabelClass, 'style_4_aq');

      // Add labels to the feature layer
      labelsLayer.opacity = 0;
      labelsLayer.labelsVisible = true;
      labelsLayer.labelingInfo = [style_1_ter, style_2_ter, style_3_ter, style_4_ter, style_1_aq, style_2_aq, style_3_aq, style_4_aq];
    })
  
  return null
}

export default LabelsLayerComponent;