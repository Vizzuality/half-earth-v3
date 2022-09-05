import React from 'react';

import Scene from 'components/scene';

import sceneSettings from './settings';
import styles from './styles.module.scss';

const { REACT_APP_MINIMAP_GLOBE_SCENE_ID: SCENE_ID } = process.env;

function MinimapWidgetComponent({ view: globeView, handleMapLoad }) {
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

export default MinimapWidgetComponent;
