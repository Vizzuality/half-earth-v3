import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import {
  layerManagerToggle,
  replaceLayerFromActiveLayers
} from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';

import Component from './biodiversity-layers-component';
import { layerToggleAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { layerToggleAnalyticsEvent, ...urlActions }

const BiodiversityLayerContainer = props => {
  const flyToLayerExtent = bbox => {
    const { view } = props;
    loadModules(["esri/geometry/Extent"]).then(([Extent]) => {
      const [xmin, ymin, xmax, ymax] = bbox;
      const target = new Extent({
        xmin, xmax, ymin, ymax
      })
      view.goTo({target})
        .catch(function(error) {
          // Avoid displaying console errors when transition is aborted by user interacions
          if (error.name !== "AbortError") {
            console.error(error);
          }
        });
    })
  }

  const handleSimpleLayerToggle = (layerName, isSelected) => {
    const {
      layerToggleAnalyticsEvent,
      activeLayers,
      changeGlobe,
      activeCategory = LAYERS_CATEGORIES.BIODIVERSITY
    } = props;
    const layer = layersConfig[layerName];
    if (layer) {
      layerManagerToggle(layer.slug, activeLayers, changeGlobe, activeCategory);
      layerToggleAnalyticsEvent({ slug: layer.slug });

      if (!isSelected) {
        layer.bbox && flyToLayerExtent(layer.bbox);
      }
    }
  }

  const handleExclusiveLayerToggle = (layerToAdd, layerToRemove) => {
    const { activeLayers, changeGlobe, layerToggleAnalyticsEvent } = props;
    const layer = layersConfig[layerToAdd];
    const removeLayer = layersConfig[layerToRemove];
    layerToggleAnalyticsEvent({ slug: layer.slug });
    if (layer && removeLayer) {
      replaceLayerFromActiveLayers(
        removeLayer.slug,
        layer.slug,
        activeLayers,
        changeGlobe,
        LAYERS_CATEGORIES.BIODIVERSITY
      );
      layer.bbox && flyToLayerExtent(layer.bbox);
    }
  }
  return (
    <Component
      handleExclusiveLayerToggle={handleExclusiveLayerToggle}
      handleSimpleLayerToggle={handleSimpleLayerToggle}
      {...props}
    />
  )
}

export default connect(null, actions)(BiodiversityLayerContainer);
