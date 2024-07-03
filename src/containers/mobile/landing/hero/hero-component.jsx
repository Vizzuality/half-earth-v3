import { DATA, NATIONAL_REPORT_CARD_LANDING } from 'router';

import { T, useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import Card from 'containers/mobile/landing/hero/card';

import globeExplore from 'images/globe-explore.png';
import globeNRC from 'images/globe-NRC.png';

import styles from './hero-styles.module.scss';

function HeroComponent({ className, browsePage }) {
  const t = useT();

  return (
    <div className={cx(styles.container, className)}>
      <div>
        <motion.h3
          className={styles.subtitle}
          initial={{ opacity: 0.5, x: 250 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <T _str="Welcome to the Half-Earth Project® Map" />
        </motion.h3>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
        >
          <T
            _str="Explore where species conservation {br} activities are the most needed"
            br={<br />}
          />
        </motion.h1>
      </div>

      <div className={styles.cards}>
        <motion.div
          className={styles.audioCard}
          initial={{ opacity: 0, x: -100, y: -30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
        >
          <Card
            title={t('Priority places')}
            description={t(
              'Discover the places where conservation efforts should be directed.'
            )}
            image={globeExplore}
            handleClick={() => {
              browsePage({ type: DATA });
            }}
          />
        </motion.div>
        <motion.div
          className={styles.audioCard}
          initial={{ opacity: 0, x: 100, y: -30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
        >
          <Card
            title={t('National Report Cards')}
            description={t(
              'Discover how countries are contributing to preserve global biodiversity.'
            )}
            image={globeNRC}
            handleClick={() => {
              browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
            }}
          />
        </motion.div>
      </div>

      <div className={styles.footer}>
        <p>
          <T
            _str="Explore areas of interest, human pressures, species and much more in our desktop version. To know more about the project {contact}"
            _comment="(To know more about the project) contact us"
            contact={
              <a
                href="https://www.half-earthproject.org/contact-us"
                target="_blank"
                rel="noreferrer"
                aria-label="Contact us"
              >
                <T
                  _str="contact us"
                  _comment="To know more about the project (contact us)"
                />
              </a>
            }
          />
        </p>
      </div>
    </div>
  );
}

export default HeroComponent;
