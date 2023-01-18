import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import { useLocale } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { wrap } from 'popmotion';

import { MARINE_SPI_FEATURE_LAYER } from 'constants/layers-slugs';

import Component from './nrc-landing-scene-mobile-component';
import { getNRCLandingCards } from './nrc-landing-scene-mobile-constants';
import mapStateToProps from './nrc-landing-scene-mobile-selectors';

const actions = { ...urlActions, ...aoiAnalyticsActions };

function NrcLandingSceneMobileContainer(props) {
  const { activeLayers, browsePage, sceneSettings, countryISO } = props;

  const locale = useLocale();
  const cardsContent = useMemo(() => getNRCLandingCards(), [locale]);

  const [updatedSceneSettings, setUpdatedSceneSettings] =
    useState(sceneSettings);

  const [[page, direction], setPage] = useState([0, 0]);

  const [selectedLayers, setSelectedLayers] = useState(activeLayers);

  const cardIndex = wrap(0, cardsContent.length, page);

  const CARDS_INDEX = {
    intro: 0,
    land: 1,
    marine: 2,
  };

  useEffect(() => {
    if (cardIndex === CARDS_INDEX.marine) {
      setSelectedLayers([
        ...selectedLayers,
        { title: MARINE_SPI_FEATURE_LAYER },
      ]);
    }
    if (cardIndex !== CARDS_INDEX.marine) {
      setSelectedLayers(
        selectedLayers.filter(
          (layer) => layer.title !== MARINE_SPI_FEATURE_LAYER
        )
      );
    }
  }, [page]);

  useEffect(() => {
    setUpdatedSceneSettings({ ...sceneSettings, zoom: 1.8 });
  }, [countryISO]);

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
      sceneSettings={updatedSceneSettings}
    />
  );
}

export default connect(
  mapStateToProps,
  actions
)(NrcLandingSceneMobileContainer);
