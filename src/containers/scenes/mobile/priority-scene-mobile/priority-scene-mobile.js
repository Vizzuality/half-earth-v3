import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import { useLocale } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { wrap } from 'popmotion';

import Component from './priority-scene-mobile-component';
import { getPriorityMobileCards } from './priority-scene-mobile-constants';
import mapStateToProps from './priority-scene-mobile-selectors';

const actions = { ...urlActions, ...aoiAnalyticsActions };

function PrioritySceneMobileContainer(props) {
  const { activeLayers, browsePage } = props;
  const locale = useLocale();
  const cardsContent = useMemo(() => getPriorityMobileCards(), [locale]);
  const [[page, direction], setPage] = useState([0, 0]);

  const [selectedLayers, setSelectedLayers] = useState(activeLayers);

  const cardIndex = wrap(0, cardsContent.length, page);

  useEffect(() => {
    setSelectedLayers([
      ...activeLayers,
      { title: cardsContent[cardIndex].layer },
    ]);
  }, [page, cardsContent, cardIndex]);

  const handleStepBack = () => {
    browsePage({ type: LANDING });
  };

  return (
    <Component
      {...props}
      cardIndex={cardIndex}
      cardsContent={cardsContent}
      direction={direction}
      handleStepBack={handleStepBack}
      page={page}
      setPage={setPage}
      selectedLayers={selectedLayers}
    />
  );
}

export default connect(mapStateToProps, actions)(PrioritySceneMobileContainer);
