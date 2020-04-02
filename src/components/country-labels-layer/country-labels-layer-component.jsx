import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { COUNTRIES_LABELS_FEATURE_LAYER, GRAPHIC_LAYER } from 'constants/layers-slugs';
import { findLayerInMap } from 'utils/layer-manager-utils';
import { simplePictureMarker } from 'utils/graphic-layer-utils';
import mapPinIcon from 'icons/map_pin.svg'
import { layersConfig } from 'constants/mol-layers-configs';

const CountryLabelsLayerComponent = props => {
  const { map, isLandscapeMode, countryISO, isCountryMode, countryName } = props;

  const [labelingInfo, setLabelingInfo] = useState(null)
  const [layerReady, setLayerReady] = useState(false)

  useEffect(() => {
    loadModules(["esri/layers/support/LabelClass"])
    .then(([LabelClass]) => {
      const _labelingInfo = new LabelClass({
        labelPlacement: "above-center",
        labelExpressionInfo: {
          expression: "$feature.NAME_0"
        },
        where: countryName && isCountryMode ? `NAME_0 <> '${countryName}'` : null,
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
  }, [countryName, isCountryMode]);

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

  useEffect(() => {
    let graphicLayer;
    let countryPinMarker;
    if (layerReady) {
      loadModules(["esri/Graphic"])
      .then(([Graphic]) => {
        graphicLayer = findLayerInMap(GRAPHIC_LAYER, map);
        const query = layerReady.createQuery();
        query.where = `GID_0 = '${countryISO}'`
        layerReady.queryFeatures(query).then(results => {
          const { features } = results;
          countryPinMarker = new Graphic({
            geometry: features[0].geometry,
            symbol: simplePictureMarker(mapPinIcon)
          });
          countryPinMarker.symbol.yoffset = -10;
          graphicLayer.add(countryPinMarker)
        })
      })
    }
    return function cleanUp() {
      if (graphicLayer) { graphicLayer.remove(countryPinMarker)}
    }
  }, [layerReady, countryISO])

  return null;
}

export default CountryLabelsLayerComponent;