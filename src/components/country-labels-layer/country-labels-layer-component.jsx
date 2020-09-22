import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';

const CountryLabelsLayerComponent = props => {
  const { map, isLandscapeMode, countryName } = props;

  const [labelingInfo, setLabelingInfo] = useState(null)
  const [layerReady, setLayerReady] = useState(false)

  useEffect(() => {
    loadModules(["esri/layers/support/LabelClass"])
    .then(([LabelClass]) => {
      const _labelingInfo = new LabelClass({
        labelExpressionInfo: {
          expression: "$feature.NAME_0"
        },
        symbol: {
          type: "text",
          color: [213,207,202],
          font: {
            family: "Helvetica",
            size: 12,
            weight: "normal"
          },
          haloColor: [0, 0, 0, 255],
          haloSize: 1
        }
      });
      setLabelingInfo(_labelingInfo);
    })
  }, [countryName]);

  useEffect(() => {
      if (labelingInfo) {
        const layerConfig = layersConfig[COUNTRIES_LABELS_FEATURE_LAYER];
        handleLayerCreation(layerConfig, map)
          .then(layer => {
            layer.opacity = 0.7;
            layer.visible = true;
            layer.labelsVisible = true;
            layer.minScale = 35000000;
            layer.labelingInfo = [labelingInfo];
            layer.renderer = {
              type: "simple",
              symbol: {
                type: "simple-marker",
                size: 0
              }
            }
            setLayerReady(layer);
          });
      }
  }, [labelingInfo])

  useEffect(() => {
    if (layerReady) {
      layerReady.visible = !isLandscapeMode;
      layerReady.labelsVisible = !isLandscapeMode;
    }
  }, [layerReady, isLandscapeMode])


  return null;
}

export default CountryLabelsLayerComponent;