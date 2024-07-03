import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import { LANDING } from 'router';

import { useLocale } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import nrcSceneConfig from 'scenes/mobile/nrc-landing-scene-mobile/scene-config';

import ContentfulService from 'services/contentful';

import metadataConfig, { SPECIES_PROTECTION_INDEX } from 'constants/metadata';
import { useLandscape } from 'constants/responsive';

import Component from './nrc-landing-scene-mobile-component';
import { getNRCLandingCards } from './nrc-landing-scene-mobile-constants';
import mapStateToProps from './nrc-landing-scene-mobile-selectors';

const actions = { ...urlActions, ...aoiAnalyticsActions };

function NrcLandingSceneMobileContainer(props) {
  const { activeLayers, browsePage, sceneSettings } = props;

  const isLandscape = useLandscape();

  const locale = useLocale();
  const cardsContent = useMemo(() => getNRCLandingCards(), [locale]);

  const [updatedSceneSettings, setUpdatedSceneSettings] =
    useState(sceneSettings);

  const [selectedLayers, setSelectedLayers] = useState(activeLayers);
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
        padding: nrcSceneConfig.globe.padding,
      });
    }
  }, [isLandscape, sceneSettings]);

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[SPECIES_PROTECTION_INDEX],
      locale
    ).then((data) => {
      const cardsWithSources = cardsContent.map((c) => {
        const source = data && data.source;
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
      handleStepBack={handleStepBack}
      sceneSettings={updatedSceneSettings}
      selectedLayers={selectedLayers}
      setCurrentCard={setCurrentCard}
    />
  );
}

export default connect(
  mapStateToProps,
  actions
)(NrcLandingSceneMobileContainer);
