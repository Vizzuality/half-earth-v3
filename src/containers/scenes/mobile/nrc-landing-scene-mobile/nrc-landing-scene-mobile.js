import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import * as urlActions from 'actions/url-actions';

import { wrap } from 'popmotion';

import { MARINE_SPI_FEATURE_LAYER } from 'constants/layers-slugs';

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
        { title: MARINE_SPI_FEATURE_LAYER },
      ]);
    }
    if (cardIndex !== 2) {
      setSelectedLayers(
        selectedLayers.filter(
          (layer) => layer.title !== MARINE_SPI_FEATURE_LAYER
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
      cardIndex={cardIndex}
      direction={direction}
      handleStepBack={handleStepBack}
      page={page}
      setPage={setPage}
      selectedLayers={selectedLayers}
    />
  );
}

export default connect(null, actions)(NrcLandingSceneMobileContainer);
