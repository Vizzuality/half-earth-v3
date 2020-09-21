import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { settingsAnalyticsEvent } from 'actions/google-analytics-actions';
import { getCheckboxLayers } from './settings-widget-selectors';
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
  activeLayers
}) => {
  const checkboxLayers = getCheckboxLayers({ activeLayers });
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

  useEffect(() => {
    const node = document.createElement('div');
    if (!hidden) {
      view.ui.add(node, 'top-right');

      ReactDOM.render(
        <SettingsComponent
          openSettings={openSettings}
          layers={checkboxLayers}
          handleChangeLayer={handleChangeLayer}
        />,
        node
      );
    }

    return function cleanup() {
      view.ui.remove(node);
    };
  }, [view, hidden, checkboxLayers]);

  return null;
};

export default connect(null, actions)(SettingsWidget);
