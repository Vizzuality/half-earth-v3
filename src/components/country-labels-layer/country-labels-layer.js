import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { loadModules } from 'esri-loader';
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';


const LabelsLayer = props => {
  const { map, view, changeGlobe } = props;

  const getLabelsLayer = (results) => {
    if (!results.length) return null;
    return results.find(result => result.graphic.layer.id === COUNTRIES_LABELS_FEATURE_LAYER)
  }

const onLabelClick = (event) => {
  event.stopPropagation();
  view.hitTest(event).then( response => {
    const { results } = response;
    const labelsLayer = getLabelsLayer(results);
    if (labelsLayer) {
      const { graphic } = labelsLayer;
      const { attributes } = graphic;
      changeGlobe({countryISO: attributes.GID_0});
    }
  })
}
const onLabelHover = (event) => {
  event.stopPropagation();
  view.hitTest(event).then( response => {
    const { results } = response;
    const labelsLayer = results.length && results.find(result => result.graphic.layer.id === COUNTRIES_LABELS_FEATURE_LAYER);
    if (labelsLayer) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  })
}

  useEffect(() => {
    const eventHandler = view.on("click", onLabelClick)
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [])

  useEffect(() => {
    const eventHandler = view.on("pointer-move", onLabelHover);
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [])


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
            family: "Helvetica",
            size: 12,
            weight: "normal"
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

export default connect(null, urlActions)(LabelsLayer);