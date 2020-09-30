import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import {
  findLayerInMap,
  addLayerToActiveLayers
} from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';
import { LANDSCAPE_LABELS_LAYERS } from 'constants/layers-groups';
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
  const { map, countryISO, activeLayers, changeGlobe } = props;
  const [labelsLayers, setLabelsLayers] = useState(null);
  useEffect(() => {
    const styleLayers = (layers) => {
      loadModules(["esri/layers/support/LabelClass"])
      .then(([labelClassConstructor]) => {
        const labelingInfo = labelsStylesSlugs.map(slug => labelClassFactory(labelClassConstructor, slug))
        layers.forEach(layer => {
          layer.opacity = 1;
          layer.visible = true;
          layer.labelsVisible = true;
          layer.labelingInfo = labelingInfo;
          if (countryISO) {
            layer.definitionExpression = `GID_0 = '${countryISO}'`
          }
        });
      });
    };

    if (labelsLayers) {
      styleLayers(labelsLayers);
    } else {
      const layers = LANDSCAPE_LABELS_LAYERS.map(layer => findLayerInMap(layer, map)).filter(Boolean);
      if (layers.length) {
        setLabelsLayers(layers);
      } else {
        LANDSCAPE_LABELS_LAYERS.forEach(layer =>
          addLayerToActiveLayers(
            layer,
            activeLayers,
            changeGlobe
          )
        )
      }
    }
  }, [labelsLayers]);

  useEffect(() => {
    if (countryISO && labelsLayers) {
      labelsLayers.forEach(layer => {
        layer.definitionExpression = `GID_0 = '${countryISO}'`;
      });
    }
  }, [countryISO, labelsLayers]);

  return null
}

export default connect(null, urlActions)(LabelsLayer);