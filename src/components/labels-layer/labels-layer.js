import { useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { LABELS_LAYERS } from 'constants/layers-groups';
import { layersConfig } from 'constants/mol-layers-configs';
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
        material: { color: config.color },
        halo: { size: 1 }
      }]
    }
  });
}

const LabelsLayer = props => {
  const { map } = props;

  useEffect(() => {
    loadModules(["esri/layers/support/LabelClass"])
    .then(([labelClassConstructor]) => {
      var style_1_ter = labelClassFactory(labelClassConstructor, 'style_1_ter');
      var style_2_ter = labelClassFactory(labelClassConstructor, 'style_2_ter');
      var style_3_ter = labelClassFactory(labelClassConstructor, 'style_3_ter');
      var style_4_ter = labelClassFactory(labelClassConstructor, 'style_4_ter');
      var style_1_aq = labelClassFactory(labelClassConstructor, 'style_1_aq');
      var style_2_aq = labelClassFactory(labelClassConstructor, 'style_2_aq');
      var style_3_aq = labelClassFactory(labelClassConstructor, 'style_3_aq');
      var style_4_aq = labelClassFactory(labelClassConstructor, 'style_4_aq');
      var style_city_capital = labelClassFactory(labelClassConstructor, 'Capital_style');
      var style_city_other = labelClassFactory(labelClassConstructor, 'Other_style');
      // Add layers to map and style them
      LABELS_LAYERS.forEach( layerName => {
        const layerConfig = layersConfig[layerName];
        handleLayerCreation(layerConfig, map)
          .then(layer => {
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
          });
      })
    })
  }, [])


  return null
}

export default LabelsLayer;