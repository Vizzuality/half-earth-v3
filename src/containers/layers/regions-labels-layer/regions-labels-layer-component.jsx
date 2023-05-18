/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import { loadModules } from 'esri-loader';

import {
  findLayerInMap,
  addLayerToActiveLayers,
} from 'utils/layer-manager-utils';

import { REGIONS_LABELS_LAYER } from 'constants/layers-slugs';

function RegionsLabelsLayerComponent(props) {
  const { map, changeGlobe, activeLayers } = props;

  const [labelingInfo, setLabelingInfo] = useState(null);
  const [regionsLabelsLayer, setRegionsLabelsLayer] = useState(null);

  useEffect(() => {
    loadModules(['esri/layers/support/LabelClass'])
      .then(([LabelClass]) => {
        const _labelingInfo = new LabelClass({
          labelExpressionInfo: {
            expression: '$feature.NAME_1',
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
  }, []);

  useEffect(() => {
    const styleLayer = (layer) => {
      layer.opacity = 0;
      layer.labelsVisible = true;
      layer.minScale = 10000000; // When the regions are clickable
      layer.labelingInfo = [labelingInfo];
      layer.renderer = {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          size: 0,
        },
      };
    };
    if (labelingInfo) {
      if (regionsLabelsLayer) {
        styleLayer(regionsLabelsLayer);
      } else {
        const layer = findLayerInMap(REGIONS_LABELS_LAYER, map);
        if (layer) {
          setRegionsLabelsLayer(layer);
        } else {
          addLayerToActiveLayers(
            REGIONS_LABELS_LAYER,
            activeLayers,
            changeGlobe
          );
        }
      }
    }
  }, [labelingInfo, activeLayers, regionsLabelsLayer]);

  return null;
}

export default RegionsLabelsLayerComponent;
