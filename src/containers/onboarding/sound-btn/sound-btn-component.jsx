
import Modal from 'containers/modals/onboarding-modal';
import { motion } from 'framer-motion';
import { ReactComponent as PlayIcon } from 'icons/play.svg';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { LANDING } from 'router';
import migalaSound from 'sounds/migala.mp3';
import styles from './sound-btn-styles.module.scss';


const SoundButtonComponent = ({ browsePage, changeUI }) => {
  const [playing, setPlaying] = useState(false);
  const [finishModal, setFinishModal] = useState(false)

  useEffect(() => {
    setPlaying(true);
  }, [])

  const handleSwitchMode = () => {
    setFinishModal(false);
    changeUI({ onBoardingType: null, onBoardingStep: 0 });
  };

  const handleFinishOnBoarding = () => {
    setPlaying(false);
    setFinishModal(true);
  };

  return (
    <div className={styles.soundContainer}>
      <button
        className={styles.closeButton}
        onClick={handleFinishOnBoarding}
      >
        x
        <p>QUIT</p>
      </button>
      <button className={styles.soundBtn}>

        <ReactPlayer
          url={[{ src: migalaSound, type: 'audio/mp3' }]}
          controls
          playing={playing}
          wrapper={"audio"}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          config={{
            file: {
              attributes: { preload: "auto" },
              forceAudio: true,
            },
          }}
        />

        {!playing && (
          <PlayIcon />
        )}

        {playing && (
          <div
            className={styles.audioBars}
          >
            <motion.div
              className={styles.audioBar}
              animate={{
                scaleY: [1, 3, 1, 1, 3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className={styles.audioBar}
              animate={{
                scaleY: [3, 1, 3, 1, 1, 3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className={styles.audioBar}
              animate={{
                scaleY: [1, 3, 1, 1, 3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        )}

      </button>
      <Modal
        isOpen={finishModal}
        title='What would you like to do next?'
        description='You just finished the audio tour you can either go on a new tour or explore the HE map on your own.'
        handleBack={() => browsePage({ type: LANDING })}
        handleClose={handleSwitchMode}
      />
    </div >
  )
}

export default SoundButtonComponent;