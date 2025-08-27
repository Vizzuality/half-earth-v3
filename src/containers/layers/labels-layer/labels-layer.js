import { useEffect } from 'react';
import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { findLayerInMap } from 'utils/layer-manager-utils';

import LabelClass from '@arcgis/core/layers/support/LabelClass.js';

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
  'Other_style',
];

const labelClassFactory = (LabelClassConstructor, styleGroup) => {
  const config = stylesConfig[styleGroup];
  return new LabelClassConstructor({
    labelPlacement: 'above-center',
    labelExpressionInfo: {
      expression: '$feature.name',
    },
    where: `style = '${styleGroup}'`,
    symbol: {
      type: 'label-3d',
      symbolLayers: [
        {
          type: 'text',
          font: {
            family: config.fontFamily,
            style: config.fontStyle,
            size: config.fontSize,
            weight: config.fontWeight || 'normal',
          },
          material: { color: config.color },
          halo: { size: 1 },
        },
      ],
    },
  });
};

function LabelsLayer(props) {
  const { map, activeLayers } = props;
  useEffect(() => {
    let cancelled = false;
    const applyStyleSafely = async (layer, labelingInfo) => {
      try {
        await layer.when();
        if (cancelled || layer.destroyed) return;
        layer.opacity = 1;
        layer.labelsVisible = true;
        layer.labelingInfo = labelingInfo;
        if (layer.title === LANDSCAPE_FEATURES_LABELS_LAYER) {
          layer.renderer = {
            type: 'simple',
            symbol: {
              type: 'simple-marker',
              size: 0,
            },
          };
        }
      } catch (e) {
        // Silently ignore if layer was removed during init
      }
    };

    const styleLayers = (layers) => {
      const labelingInfo = labelsStylesSlugs.map((slug) =>
        labelClassFactory(LabelClass, slug)
      );
      layers.forEach((layer) => {
        applyStyleSafely(layer, labelingInfo);
      });
    };

    const layers = LANDSCAPE_LABELS_LAYERS.map((layer) =>
      findLayerInMap(layer, map)
    ).filter(Boolean);
    if (layers.length) {
      styleLayers(layers);
    }

    return () => {
      cancelled = true;
    };
  }, [activeLayers, map]);

  return null;
}

export default connect(null, urlActions)(LabelsLayer);
