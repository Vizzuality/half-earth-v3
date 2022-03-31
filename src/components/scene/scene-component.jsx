import React from 'react';
import cx from 'classnames';
import Spinner from 'components/spinner';
import styles from 'styles/themes/scene-theme.module.scss';

const SceneComponent = ({
  map,
  view,
  loadState,
  sceneId,
  children,
  sceneName,
  className,
  spinner = true,
  interactionsDisabled = false,
  handleSceneClick,
  disabled,
}) => {
  if (loadState === 'loading') {
    return (
      <>
        <div
          id={`scene-container-${sceneName || sceneId}`}
          className={styles.sceneContainer}
          style={{ width: '0%', height: '0%' }}
        />
        <Spinner spinnerWithOverlay initialLoading display={spinner} />
      </>
    );
  } else if (loadState === 'loaded') {
    return (
      <div
        className={cx(styles.sceneWrapper, className, {
          [styles.disabled]: disabled,
        })}
        style={{ pointerEvents: interactionsDisabled ? 'none' : 'unset' }}
        onClick={handleSceneClick}
      >
        {disabled && <div className={styles.veil} />}
        <div id={`scene-container-${sceneName || sceneId}`}>
          {React.Children.map(children || null, (child, i) => {
            return (
              child && (
                <child.type key={i} map={map} view={view} {...child.props} />
              )
            );
          })}
        </div>
      </div>
    );
  }
};

export default SceneComponent;
