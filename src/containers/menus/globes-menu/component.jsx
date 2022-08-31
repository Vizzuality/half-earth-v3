import React from 'react';

import { useT } from '@transifex/react';

import { motion } from 'framer-motion';
import { DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING } from 'router';

import Globe from 'containers/landing/globe';

import globeDiscover from 'images/globe-discover.png';
import globeExplore from 'images/globe-explore.png';
import globeNRC from 'images/globe-NRC.png';

import styles from './styles.module';

function GlobesMenuComponent({ browsePage }) {
  const t = useT();
  return (
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
  );
}

export default GlobesMenuComponent;
