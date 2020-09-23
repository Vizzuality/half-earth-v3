import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { settingsAnalyticsEvent } from 'actions/google-analytics-actions';
import mapStateToProps from './settings-widget-selectors';
import {
  batchLayerManagerToggle,
  layerManagerToggle
} from 'utils/layer-manager-utils';
import SettingsComponent from './settings-widget-component';

const actions = { ...urlActions, settingsAnalyticsEvent };

const SettingsWidget = ({
  changeUI,
  changeGlobe,
  settingsAnalyticsEvent,
  view,
  hidden,
  activeLayers,
  checkboxLayers,
  disableSettings
}) => {
  const openSettings = () => {
    changeUI({ openSettings: null });
    settingsAnalyticsEvent({ notDisplayedLayers: null });
  };

  const handleChangeLayer = (e) => {
    Array.isArray(e.target.value.split(','))
      ? batchLayerManagerToggle(
          e.target.value.split(','),
          activeLayers,
          changeGlobe
        )
      : layerManagerToggle(e.target.value, activeLayers, changeGlobe);
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
