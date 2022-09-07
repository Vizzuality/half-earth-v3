import React from 'react';

import { T, useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';
import AUDIO_CARD_1_GIF from 'gifs/audio-card-1.gif';
import AUDIO_CARD_2_GIF from 'gifs/audio-card-2.gif';
import { DATA, NATIONAL_REPORT_CARD_LANDING } from 'router';

import { useMobile } from 'constants/responsive';

import AudioCard from './audio-card';
import styles from './hero-styles.module.scss';

function HeroComponent({ className, changeUI, browsePage }) {
  const isMobile = useMobile();
  const t = useT();

  return (
    <div className={cx(styles.container, className)}>
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
        <T _str="Explore where species conservation" />
        <br />
        <T _str="activities are most needed" />
      </motion.h1>

      <motion.p
        className={styles.ctoText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
        }}
      >
        {!isMobile && (
          <T _str="SELECT ONE OF THE AUDIO TOURS BELOW TO LEARN MORE ABOUT IT" />
        )}
      </motion.p>

      {!isMobile && (
        <div className={styles.audioCards}>
          <motion.div
            className={styles.audioCard}
            initial={{ opacity: 0, x: -100, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
            }}
          >
            <AudioCard
              number="01"
              duration="7-8"
              gif={AUDIO_CARD_1_GIF}
              title={t('Priority Areas')}
              description={t(
                'Learn about priority areas for preserving global vertebrate biodiversity.',
              )}
              handleClick={() => {
                browsePage({ type: DATA });
                changeUI({
                  onboardingType: 'priority-places',
                  onboardingStep: 0,
                });
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
            <AudioCard
              number="02"
              duration="10"
              gif={AUDIO_CARD_2_GIF}
              title={t('National Report Cards')}
              description={t(
                'Analyze the current status of conservation efforts in each nation or area of interest and download reports to share with others.',
              )}
              handleClick={() => {
                browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
                changeUI({
                  onboardingType: 'national-report-cards',
                  onboardingStep: 0,
                });
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default HeroComponent;
