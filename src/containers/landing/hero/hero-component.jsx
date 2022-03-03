// dependencies
import React from 'react';
import cx from 'classnames';
// Components
import AudioCard from 'components/audio-card';

// styles
import styles from './hero-styles.module.scss';

// assets
import AUDIO_CARD_1_GIF from 'gifs/audio-card-1.gif';
import AUDIO_CARD_2_GIF from 'gifs/audio-card-2.gif';

const HeroComponent = ({
  className,
}) => {

  return (
    <div className={cx(styles.container, className)}>
      <h3 className={styles.subtitle}>Welcome to HALF EARTH MAP</h3>
      <h1 className={styles.title}>Explore where species conservation <br /> activities are needed the most</h1>
      <p className={styles.ctoText}>SELECT ONE OF THE AUDIO TOURS BELOW TO LEARN MORE ABOUT IT</p>
      <div className={styles.audioCards}>
        <AudioCard number='01' duration={'4-7'} gif={AUDIO_CARD_1_GIF} title='Priority places' description='Understand where the suggested priority places should happen for vertebrates.' />
        <AudioCard number='02' duration={'4-7'} gif={AUDIO_CARD_2_GIF} title='National Report cards' description='Analyze national and other areas of interest. Download reports to share with others.' />
      </div>
    </div>
  )
}

export default HeroComponent;