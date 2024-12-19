import React from 'react';

import Spinner from 'components/spinner';

import styles from 'styles/themes/scene-theme.module.scss';

export default function ViewComponent(props) {
  const {
    map,
    view,
    mapName,
    mapId,
    children,
    loadState,
    spinner = true,
  } = props;
  if (loadState === 'loading') {
    return (
      <>
        <div
          id={`map-container-${mapName || mapId}`}
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
        id={`map-container-${mapName || mapId}`}
        style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
      >
        {React.Children.map(children || null, (child, i) => {
          return (
            child && (
              // eslint-disable-next-line react/no-array-index-key
              <child.type key={i} map={map} view={view} {...child.props} />
            )
          );
        })}
      </div>
    );
  }
}
