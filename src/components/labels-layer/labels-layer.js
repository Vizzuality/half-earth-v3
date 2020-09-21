import { useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { LANDSCAPE_LABELS_LAYERS } from 'constants/layers-groups';
import { layersConfig } from 'constants/mol-layers-configs';
import { stylesConfig } from './labels-layer-styles-config';

const labelsStylesSlugs = [
  'style_1_ter',
  'style_2_ter',
  'style_3_ter',
  'style_4_ter',
  'style_1_aq',
  'style_2_aq',
  'style_3_aq',
  'style_4_aq',
  'Capital_style',
  'Other_style'
];

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
  const { map, countryISO } = props;

  useEffect(() => {
    loadModules(["esri/layers/support/LabelClass"])
    .then(([labelClassConstructor]) => {
      const labelingInfo = labelsStylesSlugs.map(slug => labelClassFactory(labelClassConstructor, slug))
      // Add layers to map and style them
      LANDSCAPE_LABELS_LAYERS.forEach( layerName => {
        const layerConfig = layersConfig[layerName];
        handleLayerCreation(layerConfig, map)
          .then(layer => {
            layer.opacity = 1;
            layer.visible = true;
            layer.labelsVisible = true;
            layer.labelingInfo = labelingInfo;
            if (countryISO) {
              layer.definitionExpression = `GID_0 = '${countryISO}'`
            }
          });
      })
    })
  }, []);

  useEffect(() => {
    LANDSCAPE_LABELS_LAYERS.forEach( layerName => {
      const layerConfig = layersConfig[layerName];
      handleLayerCreation(layerConfig, map)
        .then(layer => {
          if (countryISO) {
            layer.definitionExpression = `GID_0 = '${countryISO}'`
          }
        });
    })
  }, [countryISO])



  return null
}

export default LabelsLayer;