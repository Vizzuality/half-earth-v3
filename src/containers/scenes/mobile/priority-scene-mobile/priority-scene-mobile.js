import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import { useLocale } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import prioritySceneConfig from 'scenes/mobile/priority-scene-mobile/scene-config';

import ContentfulService from 'services/contentful';

import metadataConfig from 'constants/metadata';
import { useLandscape } from 'constants/responsive';

import Component from './priority-scene-mobile-component';
import { getPriorityMobileCards } from './priority-scene-mobile-constants';
import mapStateToProps from './priority-scene-mobile-selectors';

const actions = { ...urlActions, ...aoiAnalyticsActions };

function PrioritySceneMobileContainer(props) {
  const { activeLayers, browsePage, sceneSettings } = props;

  const locale = useLocale();
  const isLandscape = useLandscape();

  const cardsContent = useMemo(() => getPriorityMobileCards(), [locale]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedLayers, setSelectedLayers] = useState(activeLayers);
  const [updatedSceneSettings, setUpdatedSceneSettings] =
    useState(sceneSettings);

  const [currentCard, setCurrentCard] = useState(0);

  const [cardsContentWithSources, setCardsContentWithSources] =
    useState(cardsContent);

  const landscapeScenePadding = {
    left: -450,
    top: 50,
  };

  useEffect(() => {
    if (isLandscape) {
      setUpdatedSceneSettings({
        ...sceneSettings,
        padding: landscapeScenePadding,
      });
    }
    if (!isLandscape) {
      setUpdatedSceneSettings({
        ...sceneSettings,
        padding: prioritySceneConfig.globe.padding,
      });
    }
  }, [isLandscape, sceneSettings]);

  useEffect(() => {
    const promises = cardsContent.map(
      (c) =>
        c.layer &&
        ContentfulService.getMetadata(metadataConfig[c.layer], locale)
    );
    Promise.all(promises).then((data) => {
      const cardsWithSources = cardsContent.map((c, i) => {
        const source = data[i] && data[i].source;
        return {
          ...c,
          ...(source ? { source } : {}),
        };
      });
      setCardsContentWithSources(cardsWithSources);
    });
  }, [locale, cardsContent]);

  useEffect(() => {
    setSelectedLayers([
      ...activeLayers,
      { title: cardsContent[currentCard].layer },
    ]);
  }, [currentCard, cardsContent]);

  const handleStepBack = () => {
    browsePage({ type: LANDING });
  };

  return (
    <Component
      {...props}
      cardsContent={cardsContentWithSources}
      currentCard={currentCard}
      direction={direction}
      handleStepBack={handleStepBack}
      page={page}
      sceneSettings={updatedSceneSettings}
      setPage={setPage}
      selectedLayers={selectedLayers}
      setCurrentCard={setCurrentCard}
    />
  );
}

export default connect(mapStateToProps, actions)(PrioritySceneMobileContainer);
