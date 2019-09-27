import React from 'react';
import styles from './minimap-widget.module.scss';
import GlobeComponent from 'components/globe';
import sceneSettings from './minimap-settings';
import cx from 'classnames';

const { REACT_APP_MINIMAP_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const MinimapWidgetComponent = ({ view: globeView, handleMapLoad, handleModalOpen, isModalOpen }) => {
  
  return (
    <>
      <div className={cx(styles.wrapper, { [styles.wrapperModal]: isModalOpen })} onClick={handleModalOpen}>
        <div className={styles.title}>Half</div>
        <div className={styles.progressBars}>
          <div className={styles.globeComponentWrapper}>
            <GlobeComponent
              sceneId={SCENE_ID}
              sceneSettings={sceneSettings}
              onLoad={(map, view) => handleMapLoad(map, view, globeView)}
              loadElement={(<></>)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MinimapWidgetComponent;
