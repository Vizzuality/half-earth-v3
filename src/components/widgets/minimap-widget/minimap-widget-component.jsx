import React from 'react';
import styles from './minimap-widget.module.scss';
import Scene from 'components/scene';
import sceneSettings from './minimap-settings';

const { REACT_APP_MINIMAP_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const MinimapWidgetComponent = ({ view: globeView, handleMapLoad, handleModalOpen }) => {
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
};

export default MinimapWidgetComponent;
