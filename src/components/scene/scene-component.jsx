/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import cx from 'classnames';
import {
  routes, DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING,
} from 'router';

import useIsCursorBottom from 'hooks/use-cursor-bottom';

import Spinner from 'components/spinner';

import styles from 'styles/themes/scene-theme.module.scss';

const {
  REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS,
} = process.env;

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
}) {
  const cursorBottom = useIsCursorBottom({ });

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
  } if (loadState === 'loaded') {
    return (
      <div
        className={cx(className, {
          [styles.sceneWrapper]: FEATURE_NEW_MENUS,
          [styles.sceneWrapperOLD]: !FEATURE_NEW_MENUS,
          [styles.sceneWrapperBlur]: FEATURE_NEW_MENUS && cursorBottom && isGlobesMenuPages,
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
}

export default SceneComponent;
