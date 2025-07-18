/* eslint-disable max-len */
import { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { batchToggleLayers } from 'utils/layer-manager-utils';

import isEmpty from 'lodash/isEmpty';

import ContentfulService from 'services/contentful';

import {
  getLayersResolution,
  getResolutionOptions,
  LAYER_VARIANTS,
  TERRESTRIAL_GLOBAL,
  TERRESTRIAL_REGIONAL,
  MARINE,
  DEFAULT_RESOLUTIONS,
} from 'constants/biodiversity-layers-constants';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import Component from './biodiversity-sidebar-card-component';
import mapStateToProps from './biodiversity-sidebar-card-selectors';

const actions = { ...metadataActions, ...urlActions };
function BiodiversitySidebarCard(props) {
  const locale = useLocale();
  const layersResolution = useMemo(() => getLayersResolution(), [locale]);

  const { changeGlobe, changeUI, activeLayers, biodiversityLayerVariant, selectUi } =
    props;
  const { PRIORITY, RICHNESS, RARITY } = LAYER_VARIANTS;
  const [cardMetadata, setCardMetadata] = useState({
    [PRIORITY]: {},
    [RICHNESS]: {},
    [RARITY]: {},
  });
  const [selectedLayer, setSelectedLayer] = useState(
    activeLayers?.[activeLayers.length - 1]?.title
  );

  const [showCard, setShowCard] = useState(true);
  const resolutionOptions = useMemo(() => getResolutionOptions(), [locale]);

  const [selectedResolutions, setSelectedResolutions] =
    useState(DEFAULT_RESOLUTIONS);

  const handleResolutionSelection = (resolution, category) => {
    setSelectedResolutions({ ...selectedResolutions, [category]: resolution });
  };

  // Get biodiversity card metadata
  useEffect(() => {
    if (isEmpty(cardMetadata[biodiversityLayerVariant])) {
      ContentfulService.getMetadata(biodiversityLayerVariant, locale).then(
        (data) => {
          setCardMetadata({
            ...cardMetadata,
            [biodiversityLayerVariant]: {
              ...data,
            },
          });
        }
      );
    }
  }, [biodiversityLayerVariant, locale]);

  // Selected layer should default to all vertebrates at first and similar when we change

  // When we change the tab (biodiversityLayerVariant)
  // select default resolution if the selected resolution doesn't exist on terrestrial
  useEffect(() => {
    const selectedResolutionExists = layersResolution[biodiversityLayerVariant][
      TERRESTRIAL_GLOBAL
    ].some((res) => res.slug === selectedResolutions[TERRESTRIAL_GLOBAL]);
    if (!selectedResolutionExists) {
      setSelectedResolutions(DEFAULT_RESOLUTIONS);
    }
  }, [biodiversityLayerVariant, layersResolution]);

  const handleTabSelection = (slug) => {
    const { onboardingStep, onboardingType } = props;
    changeUI({
      biodiversityLayerVariant: slug,
      onboardingStep: onboardingStep && onboardingStep + 1,
      waitingInteraction: onboardingType && false,
    });
  };

  const handleClearAndAddLayers = (bioLayerIds, layerIds) => {
    batchToggleLayers(
      bioLayerIds.concat(layerIds),
      activeLayers,
      changeGlobe,
      LAYERS_CATEGORIES.BIODIVERSITY
    );
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  return (
    <Component
      handleResolutionSelection={handleResolutionSelection}
      selectedResolutionOptions={{
        [TERRESTRIAL_GLOBAL]:
          resolutionOptions[selectedResolutions[TERRESTRIAL_GLOBAL]],
        [TERRESTRIAL_REGIONAL]:
          resolutionOptions[selectedResolutions[TERRESTRIAL_REGIONAL]],
        [MARINE]: resolutionOptions[selectedResolutions[MARINE]],
      }}
      selectedLayer={selectedLayer}
      setSelectedLayer={setSelectedLayer}
      selectedResolutions={selectedResolutions}
      handleClearAndAddLayers={handleClearAndAddLayers}
      handleTabSelection={handleTabSelection}
      cardMetadata={cardMetadata[biodiversityLayerVariant]}
      showCard={showCard}
      handleCloseCard={handleCloseCard}
      layersResolutionsOptions={layersResolution[biodiversityLayerVariant]}
      selectUi={selectUi}
      {...props}
    />
  );
}
export default connect(mapStateToProps, actions)(BiodiversitySidebarCard);
