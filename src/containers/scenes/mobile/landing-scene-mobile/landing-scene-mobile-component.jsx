import React from 'react';

import Hero from 'containers/mobile/landing/hero';

import Scene from 'components/scene';

import styles from './landing-scene-mobile-styles.module.scss';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function LandingSceneComponent({ sceneSettings }) {
  return (
    <Scene
      sceneName="landing-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    >
      <div className={styles.sceneContainer}>
        <Hero />
      </div>
    </Scene>
  );
}

export default LandingSceneComponent;
