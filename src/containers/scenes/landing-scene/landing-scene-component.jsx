import React from 'react';

// Components
import { T, useT } from '@transifex/react';

import { motion } from 'framer-motion';
import { DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING } from 'router';

import Globe from 'containers/landing/globe';
import Hero from 'containers/landing/hero';

import Scene from 'components/scene';

import { useMobile } from 'constants/responsive';

import globeDiscover from 'images/globe-discover.png';
import globeExplore from 'images/globe-explore.png';
import globeNRC from 'images/globe-NRC.png';

import styles from './landing-scene-styles.module.scss';

const {
  REACT_APP_ARGISJS_API_VERSION: API_VERSION,
} = process.env;

function LandingSceneComponent({ sceneSettings, browsePage }) {
  const isMobile = useMobile();
  const t = useT();

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
        <motion.div
          className={styles.globesContainer}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2,
          }}
        >
          <Globe
            title={t('Discover stories')}
            description={t(
              'Learn about important places of great biodiversity, and how their protection can contribute to preserving global biodiversity.',
            )}
            globeImage={globeDiscover}
            handleClick={() => browsePage({ type: FEATURED })}
          />
          <Globe
            title={t('Explore data')}
            description={t(
              'Investigate species in their place and the priority areas needed to safeguard enough habitat to preserve global biodiversity.',
            )}
            globeImage={globeExplore}
            center
            handleClick={() => browsePage({ type: DATA })}
          />
          <Globe
            title={t('National Report Cards')}
            description={t(
              'Analyze and compare how countries are contributing to preserving global biodiversity and where they can go further to protect species.',
            )}
            globeImage={globeNRC}
            handleClick={() => browsePage({ type: NATIONAL_REPORT_CARD_LANDING })}
          />
        </motion.div>
      </div>
    </Scene>
  );
}

export default LandingSceneComponent;
