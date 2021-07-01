import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import { findLayerInMap } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';
import { LANDSCAPE_LABELS_LAYERS } from 'constants/layers-groups';
import { LANDSCAPE_FEATURES_LABELS_LAYER } from 'constants/layers-slugs';
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
  const { map, countryISO, activeLayers } = props;
  const [labelsLayers, setLabelsLayers] = useState(null);
  useEffect(() => {
    const styleLayers = (layers) => {
      loadModules(["esri/layers/support/LabelClass"])
      .then(([labelClassConstructor]) => {
        const labelingInfo = labelsStylesSlugs.map(slug => labelClassFactory(labelClassConstructor, slug))
        layers.forEach(layer => {
          layer.opacity = 1;
          layer.labelsVisible = true;
          layer.labelingInfo = labelingInfo;
          if (layer.title === LANDSCAPE_FEATURES_LABELS_LAYER) {
            // Hides the dots but keeps the landscape feature layers
            layer.renderer = {
              type: 'simple',
              symbol: {
                type: 'simple-marker',
                size: 0
              }
            }
          }
        });
      });
    };

    const layers = LANDSCAPE_LABELS_LAYERS.map(layer => findLayerInMap(layer, map)).filter(Boolean);
    if (layers.length) {
      styleLayers(layers);
      setLabelsLayers(layers);
    }
  }, [activeLayers]);

  return null
}

export default connect(null, urlActions)(LabelsLayer);