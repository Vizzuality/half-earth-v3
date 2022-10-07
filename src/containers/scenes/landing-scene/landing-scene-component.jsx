import React from 'react';

import { T } from '@transifex/react';

import { motion } from 'framer-motion';

import Hero from 'containers/landing/hero';
import GlobesMenu from 'containers/menus/globes-menu';

import Scene from 'components/scene';

import { useMobile } from 'constants/responsive';

import styles from './landing-scene-styles.module.scss';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function LandingSceneComponent({ sceneSettings, browsePage }) {
  const isMobile = useMobile();

  return (
    <Scene
      sceneName="landing-scene"
      sceneSettings={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    >
      <div className={styles.sceneContainer}>
        <Hero />
        <motion.p
          className={styles.or}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 2,
          }}
        >
          {!isMobile && <T _str="OR" />}
        </motion.p>
        <GlobesMenu browsePage={browsePage} landing />
      </div>
    </Scene>
  );
}

export default LandingSceneComponent;
