import React from 'react';
import ReactPlayer from 'react-player';

function AudioPlayer({
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
  setPlayedSeconds,
  setPausedTime,
}) {
  return (
    <ReactPlayer
      url={[`${file}#t=${startTime},${endTime}`]}
      volume={muted || !freeToPlay ? 0 : 1}
      playing={playing}
      wrapper="audio"
      onPlay={() => setPlaying(true)}
      onEnded={() => {
        handleEndOfStep();
      }}
      onProgress={({ playedSeconds }) => {
        if (!freeToPlay) {
          // Only happens in this case. See waitingStartAudioClick hook comment
          const notPlayingBecauseWaitingForUserClick = playedSeconds === 0;
          if (notPlayingBecauseWaitingForUserClick) {
            setPlaying(false);
            setWaitingStartAudioClick(true);
          } else {
            setFreeToPlay(true);
          }
        }
        // When it pauses and resumes after ending the audio starts again from the resume point
        if (script[textMark] && playedSeconds > script[textMark].endTime) {
          const hasNoMoreTextMarks = !script[textMark + 1];
          if (hasNoMoreTextMarks) {
            handleEndOfStep();
          } else {
            // Set the paused time to the beggining of the text
            // so it doesn't repeat from the pause again
            setPausedTime(playedSeconds);
            setTextMark(textMark + 1);
          }
        }

        setPlayedSeconds(playedSeconds);
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
  );
}

export default AudioPlayer;
