/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import {
  findLayerInMap,
  addLayerToActiveLayers,
} from 'utils/layer-manager-utils';

import LabelClass from '@arcgis/core/layers/support/LabelClass';

import { COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';

function CountryLabelsLayerComponent(props) {
  const { map, countryISO, changeGlobe, activeLayers } = props;

  const [labelingInfo, setLabelingInfo] = useState(null);
  const [countryLabelsLayer, setCountryLabelsLayer] = useState(null);

  useEffect(() => {
    const _labelingInfo = new LabelClass({
      labelExpressionInfo: {
        expression: '$feature.NAME_0',
      },
      symbol: {
        type: 'text',
        color: [213, 207, 202],
        font: {
          size: 10,
          weight: 'normal',
        },
        haloColor: [0, 0, 0, 255],
        haloSize: 1,
      },
    });
    setLabelingInfo(_labelingInfo);
  }, [countryISO]);

  useEffect(() => {
    const styleLayer = (layer) => {
      layer.opacity = 0.9;
      layer.labelsVisible = true;
      layer.minScale = 36060039.65489027;
      layer.labelingInfo = [labelingInfo];
      if (countryISO) {
        layer.definitionExpression = `NOT GID_0 = '${countryISO}'`;
      }
      layer.renderer = {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          size: 0,
        },
      };
    };

    if (labelingInfo) {
      if (countryLabelsLayer) {
        styleLayer(countryLabelsLayer);
      } else {
        const layer = findLayerInMap(COUNTRIES_LABELS_FEATURE_LAYER, map);
        if (layer) {
          setCountryLabelsLayer(layer);
        } else {
          addLayerToActiveLayers({
            slug: COUNTRIES_LABELS_FEATURE_LAYER,
            activeLayers,
            callback: changeGlobe,
          });
        }
      }
    }
  }, [labelingInfo, activeLayers, countryLabelsLayer]);

  return null;
}

export default CountryLabelsLayerComponent;
