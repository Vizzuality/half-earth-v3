import React from 'react';

import Component from './audio-player-component';

function areEqual(prevProps, nextProps) {
  const changingKeys = [
    'file',
    'startTime',
    'endTime',
    'muted',
    'freeToPlay',
    'playing',
    'script',
    'textMark',
  ];
  if (changingKeys.some((key) => prevProps[key] !== nextProps[key])) {
    return false;
  }
  return true;
}

export default React.memo(Component, areEqual);
