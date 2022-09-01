import React from 'react';

import PropTypes from 'prop-types';

import Scene from 'components/scene';

import sceneSettings from './minimap-settings';
import styles from './minimap-widget.module.scss';

const { REACT_APP_MINIMAP_GLOBE_SCENE_ID: SCENE_ID } = process.env;

function MinimapWidget({ view: globeView, handleMapLoad }) {
  return (
    <div className={styles.wrapper}>
      <Scene
        sceneId={SCENE_ID}
        sceneSettings={sceneSettings}
        onViewLoad={(map, view) => handleMapLoad(map, view, globeView)}
        spinner={false}
      />
    </div>
  );
}

MinimapWidget.propTypes = {
  handleMapLoad: PropTypes.func.isRequired,
  view: PropTypes.shape.isRequired,
};

export default MinimapWidget;
