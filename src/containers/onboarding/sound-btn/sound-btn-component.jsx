// dependencies
import { ReactComponent as PlayIcon } from 'icons/play.svg';
import React, { useEffect } from 'react';
import migalaSound from 'sounds/migala.mp3';
import useSound from 'use-sound';
import styles from './sound-btn-styles.module.scss';


const SoundButtonComponent = () => {
  const [play] = useSound(migalaSound, { interrupt: true });

  useEffect(() => {
    play();
  }, []);

  return (
    <div className={styles.soundContainer}>
      <div>
        x
      </div>
      <button
        className={styles.soundBtn}
        onClick={() => { }}
      >
        <PlayIcon />
      </button >
    </div>
  )
}

export default SoundButtonComponent;