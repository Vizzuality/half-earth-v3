/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import { loadModules } from 'esri-loader';

import {
  findLayerInMap,
  addLayerToActiveLayers,
} from 'utils/layer-manager-utils';

import { COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';

function CountryLabelsLayerComponent(props) {
  const { map, countryISO, changeGlobe, activeLayers } = props;

  const [labelingInfo, setLabelingInfo] = useState(null);
  const [countryLabelsLayer, setCountryLabelsLayer] = useState(null);

  useEffect(() => {
    loadModules(['esri/layers/support/LabelClass'])
      .then(([LabelClass]) => {
        const _labelingInfo = new LabelClass({
          labelExpressionInfo: {
            expression: '$feature.NAME_0',
          },
          symbol: {
            type: 'text',
            color: [213, 207, 202],
            font: {
              family: 'Helvetica',
              size: 10,
              weight: 'normal',
            },
            haloColor: [0, 0, 0, 255],
            haloSize: 1,
          },
        });
        setLabelingInfo(_labelingInfo);
      })
      .catch((error) => {
        console.warn(error);
      });
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
          addLayerToActiveLayers(
            COUNTRIES_LABELS_FEATURE_LAYER,
            activeLayers,
            changeGlobe
          );
        }
      }
    }
  }, [labelingInfo, activeLayers, countryLabelsLayer]);

  return null;
}

export default CountryLabelsLayerComponent;
