import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import conservationEffortsActions from 'redux_modules/conservation-efforts';

import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import { layerManagerToggle, batchLayerManagerToggle } from 'utils/layer-manager-utils';
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { COMMUNITY_AREAS_VECTOR_TILE_LAYER, GRID_CELLS_PROTECTED_AREAS_PERCENTAGE } from 'constants/layers-slugs';
import { COMMUNITY_PROTECTED_AREAS_LAYER_GROUP } from 'constants/layers-groups';
import { PROTECTED_AREAS_COLOR, COMMUNITY_AREAS_COLOR } from 'constants/protected-areas';

import * as urlActions from 'actions/url-actions';

import Component from './conservation-efforts-widget-component';
import mapStateToProps from './conservation-efforts-widget-selectors';

const actions = {
  ...conservationEffortsActions, ...urlActions, addLayerAnalyticsEvent, removeLayerAnalyticsEvent,
};

const findInDOM = (id) => document.getElementById(id);

function ConservationEffortsWidget(props) {
  const {
    alreadyChecked,
    selectedCellsIDs,
    setConservationEfforts,
  } = props;

  const [conservationPropsLayer, setConservationPropsLayer] = useState(null);

  useEffect(() => {
    if (!conservationPropsLayer) {
      loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
        const consPropLayer = new FeatureLayer({
          url: layersConfig[GRID_CELLS_PROTECTED_AREAS_PERCENTAGE].url,
        });
        setConservationPropsLayer(consPropLayer);
      });
    }
  }, []);

  const queryParams = conservationPropsLayer && conservationPropsLayer.createQuery();

  const orangeActive = alreadyChecked['Protected areas'];
  const yellowActive = alreadyChecked['Community areas'];

  useEffect(() => {
    const svg = findInDOM('conservation-widget');
    const orangeSlice = findInDOM(PROTECTED_AREAS_COLOR);
    const yellowSlice = findInDOM(COMMUNITY_AREAS_COLOR);

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
  }, [orangeActive, yellowActive]);

  useEffect(() => {
    if (selectedCellsIDs && queryParams) {
      setConservationEfforts({ data: null, loading: true });
      queryParams.where = `ID IN (${selectedCellsIDs.join(', ')})`;
      conservationPropsLayer.queryFeatures(queryParams).then((results) => {
        const { features } = results;
        setConservationEfforts({ data: features.map((c) => c.attributes), loading: false });
      }).catch(() => setConservationEfforts({ data: null, loading: false }));
    }
  }, [selectedCellsIDs]);

  const handleLayerToggle = async (_, option) => {
    const { activeLayers, changeGlobe } = props;
    if (option.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER) {
      batchLayerManagerToggle(COMMUNITY_PROTECTED_AREAS_LAYER_GROUP, activeLayers, changeGlobe, LAYERS_CATEGORIES.PROTECTION);
    } else {
      layerManagerToggle(option.title, activeLayers, changeGlobe, LAYERS_CATEGORIES.PROTECTION);
    }
  };

  return <Component {...props} toggleLayer={handleLayerToggle} />;
}

export default connect(mapStateToProps, actions)(ConservationEffortsWidget);
