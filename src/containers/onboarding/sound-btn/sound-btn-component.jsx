import Modal from 'containers/modals/onboarding-modal';
import { motion } from 'framer-motion';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as DotsIcon } from 'icons/dots.svg';
import { ReactComponent as PlayIcon } from 'icons/play.svg';
import { ReactComponent as PauseIcon } from 'icons/pause.svg';
import { ReactComponent as MuteIcon } from 'icons/mute.svg';
import { ReactComponent as MutedIcon } from 'icons/muted.svg';
import cx from 'classnames';
import React, { useState, useEffect } from 'react';
import { LANDING } from 'router';
import priorityPlaces01 from 'sounds/priority-places-1.wav';
import priorityPlaces02 from 'sounds/priority-places-2.wav';
import priorityPlaces03 from 'sounds/priority-places-3.wav';
import { SCRIPTS } from 'constants/onboarding-constants';
import StepsArcs from '../step-arcs';
import styles from './sound-btn-styles.module.scss';
import AudioPlayer from './audio-player';

const files = {
  'priority-places': [priorityPlaces01, priorityPlaces02, priorityPlaces03],
  'national-report-cards': [
    priorityPlaces01,
    priorityPlaces02,
    priorityPlaces03,
  ],
};

const ButtonIcon = ({
  waitingStartAudioClick,
  waitingInteraction,
  handlePlay,
  playing,
  setPlaying,
  setPauseIcon,
  stepsNumber,
  onBoardingStep,
  pauseIcon,
}) => {
  const renderAudioBars = () => (
    <div className={styles.audioBars} onMouseEnter={() => setPauseIcon(true)}>
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
  );

  return (
    <>
      <StepsArcs numberOfArcs={stepsNumber} currentStep={onBoardingStep} />
      {!waitingInteraction && (waitingStartAudioClick || !playing) ? (
        <button onClick={handlePlay} className={styles.playButton}>
          <PlayIcon className={styles.playIcon} />
        </button>
      ) : (
        <>
          {pauseIcon ? (
            <button
              className={styles.pauseButton}
              onMouseLeave={() => setPauseIcon(false)}
              onClick={() => {
                setPlaying(false);
              }}
            >
              <PauseIcon className={styles.pauseIcon} />
            </button>
          ) : (
            renderAudioBars()
          )}
        </>
      )}
    </>
  );
};

const SoundButtonComponent = ({
  browsePage,
  changeUI,
  onBoardingType,
  onBoardingStep,
  waitingInteraction,
}) => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  // There is no autoplay on chrome and firefos. We always need a previous user click on the page.
  // We show a message if this hasn't happened (eg. reload)
  // https://developer.chrome.com/blog/autoplay/#webaudio
  // https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/
  const [waitingStartAudioClick, setWaitingStartAudioClick] = useState(false);
  const [freeToPlay, setFreeToPlay] = useState(false);

  const [pauseIcon, setPauseIcon] = useState(false);

  const [finishModal, setFinishModal] = useState(false);
  const [textMark, setTextMark] = useState(0);

  const toggleMuted = () => {
    setMuted(!muted);
  };

  const handlePlay = () => {
    setWaitingStartAudioClick(false);
    setFreeToPlay(true);
    setPlaying(true);
  };

  const script =
    onBoardingType &&
    SCRIPTS[onBoardingType] &&
    Object.values(SCRIPTS[onBoardingType])[onBoardingStep];
  const file = files[onBoardingType][onBoardingStep];

  const handleSwitchMode = () => {
    setFinishModal(false);
    changeUI({ onBoardingType: null, onBoardingStep: 0 });
  };

  const handleFinishOnBoarding = () => {
    setPlaying(false);
    setFinishModal(true);
  };

  const handleEndOfStep = () => {
    if (!Object.keys(SCRIPTS[onBoardingType])[onBoardingStep + 1]) {
      return handleFinishOnBoarding();
    }

    setTextMark(0);

    const isIntroStep =
      Object.keys(SCRIPTS[onBoardingType])[onBoardingStep] === 'intro';
    if (isIntroStep) {
      return changeUI({
        onBoardingStep: onBoardingStep + 1,
      });
    }

    changeUI({
      onBoardingStep: onBoardingStep + 1,
      waitingInteraction: true,
    });
  };

  useEffect(() => {
    setPlaying(!waitingInteraction);
  }, [waitingInteraction]);

  if (playing && onBoardingType && SCRIPTS[onBoardingType] && !script) {
    handleFinishOnBoarding();
  }

  const startTime = script && script[textMark] && script[textMark].startTime;
  const endTime = script && script[textMark] && script[textMark].endTime;
  const text = script && script[textMark] && script[textMark].text;
  const stepsNumber =
    SCRIPTS[onBoardingType] && Object.keys(SCRIPTS[onBoardingType]).length;

  const renderTooltipText = () => {
    if (!waitingInteraction && waitingStartAudioClick) {
      return 'Hit play when you are ready to start';
    }
    return waitingInteraction ? (
      <DotsIcon />
    ) : (
      <div className={styles.textContainer}>
        <button className={styles.muteButton} onClick={toggleMuted}>
          {muted ? (
            <MutedIcon className={styles.muteIcon} />
          ) : (
            <MuteIcon className={styles.muteIcon} />
          )}
        </button>
        {text}
      </div>
    );
  };

  return (
    <div className={styles.soundContainer}>
      <div
        className={cx(styles.scriptBox, {
          [styles.waiting]: waitingInteraction,
        })}
      >
        {renderTooltipText()}
      </div>
      <div className={styles.rightColumn}>
        <button className={styles.closeButton} onClick={handleFinishOnBoarding}>
          <CloseIcon />
          <p>QUIT</p>
        </button>
        <div className={styles.soundBtn}>
          <AudioPlayer
            {...{
              file,
              startTime,
              endTime,
              muted,
              freeToPlay,
              playing,
              setPlaying,
              handleEndOfStep,
              setWaitingStartAudioClick,
              setFreeToPlay,
              script,
              textMark,
              setTextMark,
            }}
          />
          <ButtonIcon
            {...{
              waitingStartAudioClick,
              waitingInteraction,
              handlePlay,
              playing,
              setPlaying,
              setPauseIcon,
              stepsNumber,
              onBoardingStep,
              pauseIcon,
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={finishModal}
        title="What would you like to do next?"
        description="You just finished the audio tour you can either go on a new tour or explore the HE map on your own."
        handleBack={() => browsePage({ type: LANDING })}
        handleClose={handleSwitchMode}
        onRequestClose={handleSwitchMode}
      />
    </div>
  );
};

export default SoundButtonComponent;
