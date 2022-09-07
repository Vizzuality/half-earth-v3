import React from 'react';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import { motion } from 'framer-motion';
import { DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING } from 'router';

import Globe from 'containers/landing/globe';

import globeDiscover from 'images/globe-discover.png';
import globeExplore from 'images/globe-explore.png';
import globeNRC from 'images/globe-NRC.png';

import styles from './styles.module';

function GlobesMenu({ browsePage, landing = false }) {
  const t = useT();

  return (
    <motion.div
      className={cx({
        [styles.globesContainerLanding]: landing,
        [styles.globesContainer]: !landing,
      })}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: landing ? 2 : 0,
      }}
    >
      <Globe
        title={t('Discover stories')}
        description={t(
          'Learn about important places of great biodiversity, what sets them apart from the rest of the world and what challenges they face today.',
        )}
        globeImage={globeDiscover}
        handleClick={() => browsePage({ type: FEATURED })}
      />
      <Globe
        title={t('Explore data')}
        description={t(
          'Explore areas of interest, the vertebrate species that live there, the human pressures that exist, and the current conservation efforts and those that are needed to safeguard enough habitat to preserve global biodiversity.',
        )}
        globeImage={globeExplore}
        center
        handleClick={() => browsePage({ type: DATA })}
      />
      <Globe
        title={t('National Report Cards')}
        description={t(
          'Analyze and compare how countries are contributing to preserving global biodiversity and where they can go further to protect species and critical land area',
        )}
        globeImage={globeNRC}
        handleClick={() => browsePage({ type: NATIONAL_REPORT_CARD_LANDING })}
      />
    </motion.div>
  );
}

GlobesMenu.propTypes = {
  browsePage: PropTypes.func.isRequired,
  landing: PropTypes.bool,
};

GlobesMenu.defaultProps = {
  landing: false,
};

export default GlobesMenu;
