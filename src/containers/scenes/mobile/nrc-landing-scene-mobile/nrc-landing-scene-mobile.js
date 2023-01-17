import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import * as urlActions from 'actions/url-actions';

import { wrap } from 'popmotion';

import Component from './nrc-landing-scene-mobile-component';
import { NRC_LANDING_CARDS } from './nrc-landing-scene-mobile-constants';

const actions = { ...urlActions };

function NrcLandingSceneMobileContainer(props) {
  const { activeLayers, browsePage } = props;

  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedLayers, setSelectedLayers] = useState(activeLayers);

  const cardIndex = wrap(0, NRC_LANDING_CARDS.length, page);

  const backDirection = -1;

  useEffect(() => {
    if (cardIndex === 2) {
      setSelectedLayers([
        ...selectedLayers,
        { title: 'marine-spi-feature-layer' },
      ]);
    }
    if (cardIndex !== 2) {
      setSelectedLayers(
        selectedLayers.filter(
          (layer) => layer.title !== 'marine-spi-feature-layer'
        )
      );
    }
  }, [page]);

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
      selectedLayers={selectedLayers}
    />
  );
}

export default connect(null, actions)(NrcLandingSceneMobileContainer);
