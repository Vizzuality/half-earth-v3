import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { layersConfig } from 'constants/mol-layers-configs';
import { createLayer, addLayer } from 'utils/layer-manager-utils';

import Component from './biodiversity-layers-component';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent }

const BiodiversityLayerContainer = props => {
  const flyToLayerExtent = bbox => {
    const { view } = props;
    loadModules(["esri/geometry/Extent"]).then(([Extent]) => {
      const [xmin, ymin, xmax, ymax] = bbox;
      const target = new Extent({
        xmin, xmax, ymin, ymax
      })
      view.goTo({target});
    })
  }

  const handleSimpleLayerToggle = layerName => {
    const { handleLayerToggle, removeLayerAnalyticsEvent } = props;
    const layer = layersConfig.find(l => l.slug === layerName);

    handleLayerToggle(layer.slug);
    
    removeLayerAnalyticsEvent({ slug: layer.slug });
  }

  const handleExclusiveLayerToggle = (layerToAdd, layerToRemove) => {
    const { map, view, handleGlobeUpdating, exclusiveLayerToggle, addLayerAnalyticsEvent, removeLayerAnalyticsEvent } = props;

    const layer = layersConfig.find(l => l.slug === layerToAdd);
    const removeLayer = layersConfig.find(l => l.slug === layerToRemove);
    const layerExists = map.layers.items.some(l => l.title === layer.slug);
    const removeSlug = removeLayer && removeLayer.slug;

    
    !layerExists && createLayer(layer).then(arcgisLayer => addLayer(arcgisLayer, map, view, handleGlobeUpdating));

    exclusiveLayerToggle(layer.slug, removeSlug);
    layer.bbox && flyToLayerExtent(layer.bbox);

    removeLayer && removeLayerAnalyticsEvent({ slug: removeLayer.slug });
    layer && addLayerAnalyticsEvent({ slug: layer.slug });
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
