import { useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';


const LabelsLayer = props => {
  const { map } = props;

  useEffect(() => {
    loadModules(["esri/layers/support/LabelClass"])
    .then(([LabelClass]) => {
      const labelingInfo = new LabelClass({
        labelPlacement: 'center-along',
        labelExpressionInfo: {
          expression: "$feature.NAME_0"
        },
        symbol: {
          type: "text",
          color: [213,207,202],
          font: {
            family: "EB Garamond",
            size: 13,
            weight: "bold"
          },
          haloColor: [0, 0, 0, 255],
          haloSize: 1
        }
      });
        const layerConfig = layersConfig[COUNTRIES_LABELS_FEATURE_LAYER];
        handleLayerCreation(layerConfig, map)
          .then(layer => {
            layer.opacity = 0.7;
            layer.visible = true;
            layer.labelsVisible = true;
            layer.minScale = 35000000;
            layer.maxScale = 35000;
            layer.labelingInfo = [labelingInfo];
            layer.renderer = {
              type: "simple",  // autocasts as new SimpleRenderer()
              symbol: {
                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                size: 0
              }
            };
          });
    })
  }, [])


  return null
}

export default LabelsLayer;