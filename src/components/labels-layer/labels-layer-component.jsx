import { loadModules } from '@esri/react-arcgis';
import { LABELS_LAYER_GROUP } from 'constants/layers-slugs';
import { stylesConfig } from './labels-layer-styles-config';

const labelClassFactory = (LabelClassConstructor, styleGroup) => {
  const config = stylesConfig[styleGroup];
  return new LabelClassConstructor({
    labelPlacement: 'above-center',
    labelExpressionInfo: {
      expression: "$feature.name"
    },
    where: `style = '${styleGroup}'`,
    symbol: {
      type: "label-3d",
      symbolLayers: [{
        type: "text",
        font: {
          family: config.fontFamily,
          style: config.fontStyle,
          size: config.fontSize,
          weight: config.fontWeight || "normal"
        },
        material: { color: config.color }
      }]
    }
  });
}

const LabelsLayerComponent = ({ map }) => {
  const { layers: { items } } = map;
  const labelsLayerGroup = items.find(l => l.title === LABELS_LAYER_GROUP);
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
      var style_city_capital = labelClassFactory(LabelClass, 'Capital_style');
      var style_city_other = labelClassFactory(LabelClass, 'Other_style');
      labelsLayerGroup.layers.items.forEach(layer => {
        // Add labels to the feature layer
        layer.opacity = 1;
        layer.visible = true;
        layer.labelsVisible = true;
        layer.labelingInfo = [
          style_1_ter,
          style_2_ter,
          style_3_ter,
          style_4_ter,
          style_1_aq,
          style_2_aq,
          style_3_aq,
          style_4_aq,
          style_city_capital,
          style_city_other
        ];
      })
    })
  
  return null
}

export default LabelsLayerComponent;