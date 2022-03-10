// dependencies
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
        style={{ backgroundColor: 'white' }}
        className={styles.closeButton}
        onClick={() => setPlaying(false)}
      >
        x
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

    </div >
  )
}

export default SoundButtonComponent;