import { useState } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import * as urlActions from 'actions/url-actions';

import { layerManagerToggle } from 'utils/layer-manager-utils';

import { useWatchUtils } from 'hooks/esri';

import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import Component from './protected-areas-sidebar-card-component';
import mapStateToProps from './protected-areas-sidebar-card-selectors';

const actions = { ...metadataActions, ...urlActions };

function Container(props) {
  const { activeLayers, changeGlobe, view } = props;

  const [showProgress, setShowProgress] = useState(false);

  const [selectedLayers, setSelectedLayers] = useState([]);

  const watchUtils = useWatchUtils();

  const handleLayerToggle = (option) => {
    if (selectedLayers.find((layer) => layer === option.value)) {
      setSelectedLayers(
        selectedLayers.filter((layer) => layer !== option.value)
      );
    } else {
      setSelectedLayers([...selectedLayers, option.value]);
    }

    if (option.value === HALF_EARTH_FUTURE_TILE_LAYER) {
      setShowProgress(true);
    }

    watchUtils.watch(() =>
      view.map.allLayers.forEach((layer) => {
        if (layer.id === HALF_EARTH_FUTURE_TILE_LAYER && layer.visible) {
          setShowProgress(false);
        }
      })
    );

    layerManagerToggle(
      option.value,
      activeLayers,
      changeGlobe,
      LAYERS_CATEGORIES.PROTECTION
    );
  };

  return (
    <Component
      selectedLayers={selectedLayers}
      handleLayerToggle={handleLayerToggle}
      showProgress={showProgress}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
