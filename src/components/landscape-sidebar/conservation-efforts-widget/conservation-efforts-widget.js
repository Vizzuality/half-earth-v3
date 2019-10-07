import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import conservationEffortsActions from 'redux_modules/conservation-efforts';

import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { handleLayerCreation, batchLayerManagerToggle } from 'utils/layer-manager-utils';
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { COMMUNITY_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import { COMMUNITY_PROTECTED_AREAS_LAYER_GROUP } from 'constants/layers-groups';

import * as urlActions from 'actions/url-actions';

import { 
  COMMUNITY_BASED,
  PROTECTED
} from './conservation-efforts-widget-selectors';
import Component from './conservation-efforts-widget-component';
import mapStateToProps from './conservation-efforts-widget-selectors';

const actions = { ...conservationEffortsActions, ...urlActions, addLayerAnalyticsEvent, removeLayerAnalyticsEvent };

const findInDOM = (id) => document.getElementById(id);

const ConservationEffortsWidget = (props) => {
  const {
    alreadyChecked,
    colors,
    terrestrialCellData,
    setConservationEfforts
  } = props;

  const [conservationPropsLayer, setConservationPropsLayer] = useState(null);

  useEffect(() => {
    if (!conservationPropsLayer) {
      loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
        const consPropLayer = new FeatureLayer({
          url: "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ConsProp/FeatureServer"
        });
        setConservationPropsLayer(consPropLayer)
      });
    }
  }, []);

  const queryParams = conservationPropsLayer && conservationPropsLayer.createQuery();

  const orangeActive = alreadyChecked['Protected areas'];
  const yellowActive = alreadyChecked['Community areas'];

  useEffect(() => {
    const svg = findInDOM('conservation-widget');
    const orangeSlice = findInDOM(colors[PROTECTED]);
    const yellowSlice = findInDOM(colors[COMMUNITY_BASED]);

    if (svg && orangeSlice) {
      if (orangeActive && yellowActive && orangeSlice && yellowSlice) {
        // bring both to front
        svg.appendChild(yellowSlice);
        svg.appendChild(orangeSlice);
      } else if (yellowActive && yellowSlice && !orangeActive) {
        svg.appendChild(yellowSlice);
      } else if (!yellowActive && orangeSlice && orangeActive) {
        svg.appendChild(orangeSlice);
      } else {
        svg.appendChild(orangeSlice);
      }
    }
  }, [orangeActive, yellowActive])

  useEffect(() => {
    if (terrestrialCellData && queryParams) {
      queryParams.where = `CELL_ID IN (${terrestrialCellData.map(i => i.CELL_ID).join(', ')})`;
      conservationPropsLayer.queryFeatures(queryParams).then(function(results){
        const { features } = results;
        setConservationEfforts(features.map(c => c.attributes));
      });
    }
  }, [terrestrialCellData])

  const handleLayerToggle = (layersPassed, option) => {
    const { removeLayerAnalyticsEvent, activeLayers, changeGlobe, map } = props;
    if (option.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER) {
      COMMUNITY_PROTECTED_AREAS_LAYER_GROUP.forEach(layerName => {
        const layerConfig = layersConfig[layerName];
        handleLayerCreation(layerConfig, map);
      })
      batchLayerManagerToggle(COMMUNITY_PROTECTED_AREAS_LAYER_GROUP, activeLayers, changeGlobe, LAYERS_CATEGORIES.PROTECTION);
    } else {
      const layer = layersConfig[option.title];
      handleLayerCreation(layer, map);
      layerManagerToggle(layer.slug, activeLayers, changeGlobe, LAYERS_CATEGORIES.PROTECTION);
      removeLayerAnalyticsEvent({ slug: layer.slug });
    }
  }

  return <Component {...props} toggleLayer={handleLayerToggle} />;
}

export default connect(mapStateToProps, actions)(ConservationEffortsWidget);