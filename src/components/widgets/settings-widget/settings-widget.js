import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { settingsAnalyticsEvent } from 'actions/google-analytics-actions';
import mapStateToProps from './settings-widget-selectors';
import userConfigActions from 'redux_modules/user-config/user-config';
import {
  batchLayerManagerToggle,
  layerManagerToggle
} from 'utils/layer-manager-utils';
import SettingsComponent from './settings-widget-component';

const actions = { ...urlActions, ...userConfigActions, settingsAnalyticsEvent };

const SettingsWidget = ({
  changeUI,
  changeGlobe,
  settingsAnalyticsEvent,
  view,
  hidden,
  activeLayers,
  checkboxLayers,
  disableSettings,
  setUserLayerSlugs
}) => {
  const openSettings = () => {
    changeUI({ openSettings: null });
    settingsAnalyticsEvent({ notDisplayedLayers: null });
  };

  const handleChangeLayer = (layer) => {
    const toggleStoreLayer = () => {
      const checkboxLayer = checkboxLayers.find(l => l.slug === layer.slug);
      setUserLayerSlugs({ [layer.slug]: !checkboxLayer.isChecked });
    }

    // Set the user config for further reconciliating between scenes
    // This won't be saved on the URL
    toggleStoreLayer();
    Array.isArray(layer.value)
      ? batchLayerManagerToggle(layer.value, activeLayers, changeGlobe)
      : layerManagerToggle(layer.value, activeLayers, changeGlobe);
  };
  const [uiNode, setUiNode] = useState(null);
  useEffect(() => {
    const node = document.createElement('div');
    view.ui.add(node, 'top-right');
    setUiNode(node);

    return function cleanup() {
      setUiNode(false);
      view.ui.remove(node);
    };
  }, []);

  if (uiNode) {
    ReactDOM.render(
      <SettingsComponent
        openSettings={openSettings}
        layers={checkboxLayers}
        handleChangeLayer={handleChangeLayer}
        hidden={hidden}
        disableSettings={disableSettings}
      />,
      uiNode
    );
  }

  return null;
};

export default connect(mapStateToProps, actions)(SettingsWidget);
