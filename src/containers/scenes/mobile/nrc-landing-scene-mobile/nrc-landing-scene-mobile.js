import React, { useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import * as urlActions from 'actions/url-actions';

import { wrap } from 'popmotion';

import Component from './nrc-landing-scene-mobile-component';
import { NRC_LANDING_CARDS } from './nrc-landing-scene-mobile-constants';

const actions = { ...urlActions };

function NrcLandingSceneMobileContainer(props) {
  const { browsePage } = props;

  const [[page, direction], setPage] = useState([0, 0]);

  const cardIndex = wrap(0, NRC_LANDING_CARDS.length, page);

  const backDirection = -1;
  const handleStepBack = () => {
    if (cardIndex !== 0) {
      setPage([cardIndex - 1, backDirection]);
    }
    if (cardIndex === 0) {
      browsePage({ type: LANDING });
    }
  };

  return (
    <Component
      {...props}
      handleStepBack={handleStepBack}
      cardIndex={cardIndex}
      direction={direction}
      page={page}
      setPage={setPage}
    />
  );
}

export default connect(null, actions)(NrcLandingSceneMobileContainer);
