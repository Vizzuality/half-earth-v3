/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import {
  findLayerInMap,
  addLayerToActiveLayers,
} from 'utils/layer-manager-utils';

import LabelClass from '@arcgis/core/layers/support/LabelClass';

import { REGIONS_LABELS_LAYER } from 'constants/layers-slugs';

function RegionsLabelsLayerComponent(props) {
  const { map, changeGlobe, activeLayers } = props;

  const [labelingInfo, setLabelingInfo] = useState(null);
  const [regionsLabelsLayer, setRegionsLabelsLayer] = useState(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let cancelled = false;
    const styleLayer = async (layer) => {
      try {
        await layer.when();
        if (cancelled || layer.destroyed) return;
        layer.opacity = 0;
        layer.labelsVisible = true;
        layer.minScale = 10000000; // When the regions are clickable
        layer.labelingInfo = [labelingInfo];
      } catch (e) {
        // ignore if layer is gone
      }
    };
    if (labelingInfo) {
      if (regionsLabelsLayer) {
        styleLayer(regionsLabelsLayer);
      } else {
        const layer = findLayerInMap(REGIONS_LABELS_LAYER, map);
        if (layer) {
          setRegionsLabelsLayer(layer);
        } else {
          addLayerToActiveLayers({
            slug: REGIONS_LABELS_LAYER,
            activeLayers,
            callback: changeGlobe,
            opacity: 0,
          });
        }
      }
    }
    return () => {
      cancelled = true;
    };
  }, [labelingInfo, activeLayers, regionsLabelsLayer, map, changeGlobe]);

  return null;
}

export default RegionsLabelsLayerComponent;
