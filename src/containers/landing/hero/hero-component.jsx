// dependencies
import cx from 'classnames';
import { motion } from 'framer-motion';
// assets
import AUDIO_CARD_1_GIF from 'gifs/audio-card-1.gif';
import AUDIO_CARD_2_GIF from 'gifs/audio-card-2.gif';
import React from 'react';
import { DATA, NATIONAL_REPORT_CARD_LANDING } from "router";
// Components
import AudioCard from './audio-card';
// styles
import styles from './hero-styles.module.scss';


const HeroComponent = ({
  className,
  changeUI,
  browsePage,
}) => {

  return (
    <div className={cx(styles.container, className)}>

      <motion.h3
        className={styles.subtitle}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        Welcome to HALF EARTH MAP
      </motion.h3>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.15,
        }}
      >
        Explore where species conservation <br /> activities are needed the most
      </motion.h1>

      <motion.p
        className={styles.ctoText}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.15,
        }}
      >
        SELECT ONE OF THE AUDIO TOURS BELOW TO LEARN MORE ABOUT IT
      </motion.p>

      <motion.div
        className={styles.audioCards}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.15,
        }}
      >
        <AudioCard
          number='01'
          duration={'4-7'}
          gif={AUDIO_CARD_1_GIF}
          title='Priority places'
          description='Understand where the suggested priority places should happen for vertebrates.'
          handleClick={() => {
            browsePage({ type: DATA })
            changeUI({ onBoardingType: 'priority-places', onBoardingStep: 0 })
          }}

        />
        <AudioCard
          number='02'
          duration={'4-7'}
          gif={AUDIO_CARD_2_GIF} title='National Report cards'
          description='Analyze national and other areas of interest. Download reports to share with others.'
          handleClick={() => {
            browsePage({ type: NATIONAL_REPORT_CARD_LANDING })
            changeUI({ onBoardingType: 'national-report-cards', onBoardingStep: 0 })
          }}
        />
      </motion.div>

      <p className={styles.or}> OR </p>
    </div>
  )
}

export default HeroComponent;