import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import conservationEffortsActions from 'redux_modules/conservation-efforts';
import { handleLayerRendered } from 'utils/layer-manager-utils';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import { 
  COMMUNITY_BASED,
  PROTECTED
} from './conservation-efforts-widget-selectors';
import Component from './conservation-efforts-widget-component';
import mapStateToProps from './conservation-efforts-widget-selectors';

const actions = { ...conservationEffortsActions, addLayerAnalyticsEvent, removeLayerAnalyticsEvent };

const findInDOM = (id) => document.getElementById(id);

const ConservationEffortsWidget = (props) => {
  const {
    map,
    activeLayers,
    view,
    handleGlobeUpdating,
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent,
    handleLayerToggle,
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

  const toggleLayer = (layersPassed, option) => {
    const layerNotRendered = !activeLayers.some(layer => layer.title === option.id);
  
    const layerToggled = map.layers.items.reduce((wantedLayer, currentLayer) => {
      if(currentLayer.title === option.id) return currentLayer;
      if(currentLayer.layers) return currentLayer.layers.items.find(layer => layer.title === option.id);
      return wantedLayer;
    }, null)
    
    if (layerNotRendered) {
      handleGlobeUpdating(true);
    }
  
    handleLayerToggle(option.id);
    handleLayerRendered(view, layerToggled, handleGlobeUpdating);
  
    const isLayerActive = alreadyChecked[option.value];
    if (isLayerActive) addLayerAnalyticsEvent({ slug: option.slug })
    else removeLayerAnalyticsEvent({ slug: option.slug });
  }

  return <Component {...props} toggleLayer={toggleLayer} />;
}

export default connect(mapStateToProps, actions)(ConservationEffortsWidget);