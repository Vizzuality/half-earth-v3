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
import priorityPlaces01 from 'sounds/tour1-track1-intro.mp3';
import priorityPlaces02 from 'sounds/tour1-track2-priority.mp3';
import priorityPlaces03 from 'sounds/tour1-track3-richness.mp3';
import priorityPlaces04 from 'sounds/tour1-track4-rarity.mp3';
import priorityPlaces05 from 'sounds/tour1-track5-protection.mp3';
import priorityPlaces06 from 'sounds/tour1-track6-human-pressures.mp3';
import priorityPlaces07 from 'sounds/tour1-track7-closure.mp3';
import nationalReportCards01 from 'sounds/tour2-track1-intro.mp3';
import nationalReportCards02 from 'sounds/tour2-track2-spi.mp3';
import nationalReportCards03 from 'sounds/tour2-track3-nrc.mp3';
import nationalReportCards04 from 'sounds/tour2-track4-overview.mp3';
import nationalReportCards05 from 'sounds/tour2-track5-challenges.mp3';
import nationalReportCards06 from 'sounds/tour2-track6-ranking.mp3';
import nationalReportCards07 from 'sounds/tour2-track7-closure.mp3';

import { SCRIPTS, NO_INTERACTION_STEPS } from 'constants/onboarding-constants';
import StepsArcs from '../step-arcs';
import styles from './sound-btn-styles.module.scss';
import AudioPlayer from './audio-player';

const files = {
  'priority-places': [
    priorityPlaces01,
    priorityPlaces02,
    priorityPlaces03,
    priorityPlaces04,
    priorityPlaces05,
    priorityPlaces06,
    priorityPlaces07,
  ],
  'national-report-cards': [
    nationalReportCards01,
    nationalReportCards02,
    nationalReportCards03,
    nationalReportCards04,
    nationalReportCards05,
    nationalReportCards06,
    nationalReportCards07,
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
  onboardingStep,
  pauseIcon,
  setPausedTime,
  playedSeconds,
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
      <StepsArcs numberOfArcs={stepsNumber} currentStep={onboardingStep} />
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
                setPausedTime(playedSeconds);
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
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) => {
  const [playing, setPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
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
    setPausedTime(playedSeconds);
  };

  const handlePlay = () => {
    setWaitingStartAudioClick(false);
    setFreeToPlay(true);
    setPlaying(true);
  };

  const script =
    onboardingType &&
    SCRIPTS[onboardingType] &&
    Object.values(SCRIPTS[onboardingType])[onboardingStep];
  const file = files[onboardingType][onboardingStep];

  const handleBack = () => {
    browsePage({ type: LANDING });
    changeUI({
      onboardingType: null,
      onboardingStep: null,
      waitingInteraction: false,
    });
  };

  const handleSwitchMode = () => {
    setFinishModal(false);
    changeUI({
      onboardingType: null,
      onboardingStep: null,
      waitingInteraction: false,
    });
  };

  const handleFinishOnBoarding = () => {
    setPlaying(false);
    setFinishModal(true);
  };

  const handleEndOfStep = () => {
    if (!Object.keys(SCRIPTS[onboardingType])[onboardingStep + 1]) {
      return handleFinishOnBoarding();
    }

    setTextMark(0);

    const dontWaitStep = NO_INTERACTION_STEPS[onboardingType].includes(
      Object.keys(SCRIPTS[onboardingType])[onboardingStep]
    );
    if (dontWaitStep) {
      return changeUI({
        onboardingStep: onboardingStep + 1,
      });
    }

    changeUI({ waitingInteraction: true });
  };

  useEffect(() => {
    setPlaying(!waitingInteraction);
  }, [waitingInteraction]);

  if (playing && onboardingType && SCRIPTS[onboardingType] && !script) {
    handleFinishOnBoarding();
  }

  const startTime = script && script[textMark] && script[textMark].startTime;
  const endTime = script && script[textMark] && script[textMark].endTime;
  const text = script && script[textMark] && script[textMark].text;
  const stepsNumber =
    SCRIPTS[onboardingType] && Object.keys(SCRIPTS[onboardingType]).length;

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
              setPlayedSeconds,
              setPausedTime,
              pausedTime,
            }}
            startTime={pausedTime || startTime}
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
              onboardingStep,
              pauseIcon,
              setPausedTime,
              playedSeconds,
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={finishModal}
        title="What would you like to do next?"
        description="You just finished the audio tour you can either go on a new tour or explore the HE map on your own."
        handleBack={handleBack}
        handleClose={handleSwitchMode}
        onRequestClose={handleSwitchMode}
      />
    </div>
  );
};

export default SoundButtonComponent;
