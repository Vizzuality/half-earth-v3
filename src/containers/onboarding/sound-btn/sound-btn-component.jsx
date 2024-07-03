import { useState, useEffect, useMemo } from 'react';

import { LANDING } from 'router';

import { useT, useLocale } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';
import invert from 'lodash/invert';
import priorityIntroFile from 'sounds/tour1-track1-intro.mp3';
import priorityFile from 'sounds/tour1-track2-priority.mp3';
import richnessFile from 'sounds/tour1-track3-richness.mp3';
import rarityFile from 'sounds/tour1-track4-rarity.mp3';
import protectionFile from 'sounds/tour1-track5-protection.mp3';
import humanPressuresFile from 'sounds/tour1-track6-human-pressures.mp3';
import priorityClosureFile from 'sounds/tour1-track7-closure.mp3';
import NRCIntroFile from 'sounds/tour2-track1-intro.mp3';
import spiFile from 'sounds/tour2-track2-spi.mp3';
import nrcFile from 'sounds/tour2-track3-nrc.mp3';
// TODO: Remove overview when the new NRC page is live
import overviewFile from 'sounds/tour2-track4-overview.mp3';
import challengesFile from 'sounds/tour2-track5-challenges.mp3';
import rankingFile from 'sounds/tour2-track6-ranking.mp3';
import fullRankingFile from 'sounds/tour2-track7-full-ranking.mp3';
import NRCClosureFile from 'sounds/tour2-track8-closure.mp3';

import Modal from 'containers/modals/onboarding-modal';

import {
  getScripts,
  NO_INTERACTION_STEPS,
  PRIORITY_STEPS,
  NRC_STEPS,
} from 'constants/onboarding-constants';

import CloseIcon from 'icons/close.svg?react';
import DotsIcon from 'icons/dots.svg?react';
import MuteIcon from 'icons/mute.svg?react';
import MutedIcon from 'icons/muted.svg?react';
import PauseIcon from 'icons/pause.svg?react';
import PlayIcon from 'icons/play.svg?react';

import StepsArcs from '../step-arcs';

import AudioPlayer from './audio-player';
import styles from './sound-btn-styles.module.scss';

const priorityFiles = {
  intro: priorityIntroFile,
  priority: priorityFile,
  richness: richnessFile,
  rarity: rarityFile,
  protection: protectionFile,
  humanPressures: humanPressuresFile,
  closure: priorityClosureFile,
};

const NRCFiles = {
  intro: NRCIntroFile,
  spi: spiFile,
  nrc: nrcFile,
  overview: overviewFile,
  ranking: rankingFile,
  fullRanking: fullRankingFile,
  challenges: challengesFile,
  closure: NRCClosureFile,
};

const renderAudioBars = (setPauseIcon) => (
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

function ButtonIcon({
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
  changeUI,
}) {
  const renderIdle = () =>
    pauseIcon ? (
      <button
        type="button"
        aria-label="Pause audio"
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
      renderAudioBars(setPauseIcon)
    );

  return (
    <>
      <StepsArcs
        numberOfArcs={stepsNumber}
        currentStep={onboardingStep}
        handleClick={(e, i) => {
          changeUI({
            onboardingStep: i,
            waitingInteraction: false,
            onboardingTooltipTop: null,
            onboardingTooltipLeft: null,
          });
        }}
      />
      {!waitingInteraction && (waitingStartAudioClick || !playing) ? (
        <button
          type="button"
          aria-label="Play audio"
          onClick={handlePlay}
          className={styles.playButton}
        >
          <PlayIcon className={styles.playIcon} />
        </button>
      ) : (
        renderIdle()
      )}
    </>
  );
}

function SoundButtonComponent({
  browsePage,
  changeUI,
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) {
  const t = useT();
  const locale = useLocale();
  const scripts = useMemo(() => getScripts(), [locale]);
  const [playing, setPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [muted, setMuted] = useState(false);

  // There is no autoplay on chrome and firefox. We always need a previous user click on the page.
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
    scripts[onboardingType] &&
    Object.values(scripts[onboardingType])[onboardingStep];
  const invertedPrioritySteps = invert(PRIORITY_STEPS);
  const invertedNRCSteps = invert(NRC_STEPS);
  const file =
    onboardingType === 'priority-places'
      ? priorityFiles[invertedPrioritySteps[onboardingStep]]
      : NRCFiles[invertedNRCSteps[onboardingStep]];

  const handleBack = () => {
    browsePage({ type: LANDING });
    changeUI({
      onboardingType: null,
      onboardingStep: null,
      waitingInteraction: false,
      onboardingTooltipTop: null,
      onboardingTooltipLeft: null,
    });
  };

  const handleSwitchMode = () => {
    setFinishModal(false);
    changeUI({
      waitingInteraction: false,
      onboardingType: null,
      onboardingStep: null,
    });
  };

  const handleFinishOnBoarding = () => {
    setPlaying(false);
    setFinishModal(true);
  };

  // eslint-disable-next-line consistent-return
  const handleEndOfStep = () => {
    if (!Object.keys(scripts[onboardingType])[onboardingStep + 1]) {
      return handleFinishOnBoarding();
    }

    setTextMark(0);

    const dontWaitStep = NO_INTERACTION_STEPS[onboardingType].includes(
      Object.keys(scripts[onboardingType])[onboardingStep]
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

  if (playing && onboardingType && scripts[onboardingType] && !script) {
    handleFinishOnBoarding();
  }

  const startTime = script && script[textMark] && script[textMark].startTime;
  const endTime = script && script[textMark] && script[textMark].endTime;
  const text = script && script[textMark] && script[textMark].text;
  const stepsNumber =
    scripts[onboardingType] && Object.keys(scripts[onboardingType]).length;

  const renderTooltipText = () => {
    if (!waitingInteraction && waitingStartAudioClick) {
      return t('Hit play when you are ready to start');
    }
    return waitingInteraction ? (
      <DotsIcon />
    ) : (
      <div className={styles.textContainer}>
        <button
          type="button"
          className={styles.muteButton}
          onClick={toggleMuted}
        >
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
          [styles.languageBigger]: locale !== 'en' && locale !== '',
        })}
      >
        {renderTooltipText()}
      </div>
      <div className={styles.rightColumn}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleFinishOnBoarding}
        >
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
              changeUI,
              onboardingType,
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={finishModal}
        title={t('What would you like to do next?')}
        description={t(
          'You just finished the audio tour. You can either take a new tour or explore the Half-Earth Project Map on your own.'
        )}
        handleBack={handleBack}
        handleClose={handleSwitchMode}
        onRequestClose={handleSwitchMode}
      />
    </div>
  );
}

export default SoundButtonComponent;
