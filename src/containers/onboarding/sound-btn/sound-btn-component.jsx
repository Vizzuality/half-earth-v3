import Modal from 'containers/modals/onboarding-modal';
import { motion } from 'framer-motion';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as DotsIcon } from 'icons/dots.svg';
import { ReactComponent as PlayIcon } from 'icons/play.svg';
import { ReactComponent as MuteIcon } from 'icons/mute.svg';
import cx from 'classnames';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { LANDING } from 'router';
import priorityPlaces01 from 'sounds/priority-places-1.wav';
import priorityPlaces02 from 'sounds/priority-places-2.wav';
import priorityPlaces03 from 'sounds/priority-places-3.wav';
import { SCRIPTS } from 'constants/onboarding-constants';
import StepsArcs from '../step-arcs';
import styles from './sound-btn-styles.module.scss';

const files = {
  'priority-places': [priorityPlaces01, priorityPlaces02, priorityPlaces03],
  'national-report-cards': [
    priorityPlaces01,
    priorityPlaces02,
    priorityPlaces03,
  ],
};

const renderAudioBars = () => (
  <div className={styles.audioBars}>
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

const SoundButtonComponent = ({
  browsePage,
  changeUI,
  onBoardingType,
  onBoardingStep,
  waitingInteraction,
}) => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  // We always need a previous user click on the page. We show a message if this hasn't happened (eg. reload)
  // https://developer.chrome.com/blog/autoplay/#webaudio
  // https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/
  const [waitingStartAudioClick, setWaitingStartAudioClick] = useState(false);
  const [freeToPlay, setFreeToPlay] = useState(false);

  const [finishModal, setFinishModal] = useState(false);
  const [textMark, setTextMark] = useState(0);

  const toggleMuted = () => {
    setMuted(!muted);
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
        <MuteIcon
          className={cx(styles.muteIcon, { [styles.muted]: muted })}
          onClick={toggleMuted}
        />
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
        <button className={styles.soundBtn}>
          <ReactPlayer
            key={`${file}#t=${startTime},${endTime}`}
            url={[
              {
                src: `${file}#t=${startTime},${endTime}`,
                type: 'audio/wav',
              },
            ]}
            volume={muted || !freeToPlay ? 0 : 1}
            playing={playing}
            wrapper={'audio'}
            onPlay={() => setPlaying(true)}
            onEnded={() => {
              handleEndOfStep();
            }}
            onProgress={({ playedSeconds }) => {
              if (!freeToPlay) {
                // Only happens in this case. See waitingStartAudioClick hook comment
                const notPlayingBecauseWaitingForUserClick =
                  playedSeconds === 0;
                if (notPlayingBecauseWaitingForUserClick) {
                  setPlaying(false);
                  setWaitingStartAudioClick(true);
                } else {
                  setFreeToPlay(true);
                }
              }

              if (
                script[textMark] &&
                playedSeconds > script[textMark].endTime
              ) {
                const hasNoMoreTextMarks = !script[textMark + 1];
                if (hasNoMoreTextMarks) {
                  handleEndOfStep();
                } else {
                  setTextMark(textMark + 1);
                }
              }
            }}
            progressInterval={50}
            config={{
              file: {
                attributes: { preload: 'auto' },
                forceAudio: true,
                autoPlay: true,
                muted: true,
              },
            }}
          />
          {waitingStartAudioClick && !waitingInteraction ? (
            <PlayIcon
              onClick={() => {
                setWaitingStartAudioClick(false);
                setFreeToPlay(true);
                setPlaying(true);
              }}
            />
          ) : (
            <>
              <StepsArcs
                numberOfArcs={stepsNumber}
                currentStep={onBoardingStep}
              />
              {renderAudioBars()}
            </>
          )}
        </button>
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
