import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import { useLocale } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { wrap } from 'popmotion';

import { MARINE_SPI_FEATURE_LAYER } from 'constants/layers-slugs';

import Component from './nrc-landing-scene-mobile-component';
import { NRC_LANDING_CARDS } from './nrc-landing-scene-mobile-constants';

const actions = { ...urlActions, ...aoiAnalyticsActions };

function NrcLandingSceneMobileContainer(props) {
  const { activeLayers, browsePage } = props;
  const locale = useLocale();
  const cardsContent = useMemo(() => NRC_LANDING_CARDS(), [locale]);

  const [[page, direction], setPage] = useState([0, 0]);

  const [selectedLayers, setSelectedLayers] = useState(activeLayers);

  const cardIndex = wrap(0, cardsContent.length, page);

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
    browsePage({ type: LANDING });
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
