// dependencies
import Modal from 'containers/modals/onboarding-modal';
import { ReactComponent as PlayIcon } from 'icons/play.svg';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import migalaSound from 'sounds/migala.mp3';
import styles from './sound-btn-styles.module.scss';



const SoundButtonComponent = () => {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setPlaying(true);
  }, [])


  return (
    <div className={styles.soundContainer}>
      <button
        className={styles.closeButton}
        onClick={() => setPlaying(false)}
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
        <PlayIcon />

      </button>
      <Modal
        isOpen={!playing}
        // handleClose={handlePromptModalToggle}
        title='What would you like to do next?'
        description='You just finished the audio tour you can either go on a new tour or explore the HE map on your own.'
      />
    </div >
  )
}

export default SoundButtonComponent;