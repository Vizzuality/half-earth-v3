/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames';
import { Children } from 'react';
import Spinner from 'components/spinner';

import styles from 'styles/themes/scene-theme.module.scss';

function SceneComponent({
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
  isGlobesMenuPages,
  blur,
}) {
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
  }
  if (loadState === 'loaded') {
    return (
      <div
        className={cx(className, styles.noSelect, styles.sceneWrapper, {
          [styles.sceneWrapperBlur]: blur && isGlobesMenuPages,
          [styles.disabled]: disabled,
        })}
        style={{ pointerEvents: interactionsDisabled ? 'none' : 'unset' }}
        onClick={handleSceneClick}
      >
        {disabled && <div className={styles.veil} />}
        <div id={`scene-container-${sceneName || sceneId}`}>
          {Children.map(children || null, (child, i) => {
            return (
              child && (
                // eslint-disable-next-line react/no-array-index-key
                <child.type key={i} map={map} view={view} {...child.props} />
              )
            );
          })}
        </div>
      </div>
    );
  }
}

export default SceneComponent;
