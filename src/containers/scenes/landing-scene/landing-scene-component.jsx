import React from 'react';

// Components
import Scene from 'components/scene';
// Constants
import Globe from 'containers/landing/globe';
import Hero from 'containers/landing/hero';
import { motion } from 'framer-motion';
import globeDiscover from 'images/globe-discover.png';
import globeExplore from 'images/globe-explore.png';
import globeNRC from 'images/globe-NRC.png';
import { DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING } from 'router';
// Constants
import { useMobile } from 'constants/responsive';
// Styles
import styles from './landing-scene-styles.module.scss';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const LandingSceneComponent = ({
  sceneSettings,
  browsePage,
}) => {
  const isMobile = useMobile();
  return (
    <Scene
      sceneName={'landing-scene'}
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
          {!isMobile && 'OR'}
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
            title="Discover stories"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet, est eget lobortis lobortis, ex ex volutpat ligula."
            globeImage={globeDiscover}
            handleClick={() => browsePage({ type: FEATURED })}
          />
          <Globe
            title="Explore Data"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet, est eget lobortis lobortis, ex ex volutpat ligula."
            globeImage={globeExplore}
            center
            handleClick={() => browsePage({ type: DATA })}
          />
          <Globe
            title="National Report Cards"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet, est eget lobortis lobortis, ex ex volutpat ligula."
            globeImage={globeNRC}
            handleClick={() =>
              browsePage({ type: NATIONAL_REPORT_CARD_LANDING })
            }
          />
        </motion.div>
      </div>
    </Scene>
  );
};

export default LandingSceneComponent;
