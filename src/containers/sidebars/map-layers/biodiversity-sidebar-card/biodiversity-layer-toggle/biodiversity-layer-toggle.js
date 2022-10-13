import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import { layerToggleAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import {
  bringLayerToFront,
  bringLayerToBack,
  layerManagerToggle,
  batchToggleLayers,
  flyToLayerExtent,
} from 'utils/layer-manager-utils';

import usePrevious from 'hooks/use-previous';

import {
  getLayersToggleConfig,
  TERRESTRIAL,
  MARINE,
  DEFAULT_RESOLUTIONS,
} from 'constants/biodiversity-layers-constants';
import { LAYERS_CATEGORIES, layersConfig } from 'constants/mol-layers-configs';

import Component from './biodiversity-layer-toggle-component';
import mapStateToProps from './biodiversity-layer-toggle-selectors';

const actions = { ...metadataActions, layerToggleAnalytics, ...urlActions };

function BiodiversityLayerToggle(props) {
  const {
    map,
    view,
    changeGlobe,
    layerOptions,
    activeLayers,
    biodiversityLayerVariant,
    selectedResolutions,
    selectedLayerOption,
    setSelectedLayer,
    allActiveLayerTitles,
    category,
  } = props;
  const locale = useLocale();
  const layersToggleConfig = useMemo(() => getLayersToggleConfig(), [locale]);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const newChecked =
      selectedLayerOption &&
      activeLayers.some((layer) => layer.title === selectedLayerOption.value);
    setIsChecked(newChecked);
    if (newChecked) {
      layerToggleAnalytics(selectedLayerOption.value);
    }
  }, [activeLayers]);

  const previousBiodiversityLayerVariant = usePrevious(
    biodiversityLayerVariant
  );
  const previousSelectedResolutions = usePrevious(selectedResolutions);

  const handleLayerToggle = (option) => {
    const layer = layersConfig[option.layer];
    if (!allActiveLayerTitles) {
      // Add layer to empty selection
      if (layer.bbox) flyToLayerExtent(layer.bbox, view);
      layerManagerToggle(
        option.layer,
        activeLayers,
        changeGlobe,
        LAYERS_CATEGORIES.BIODIVERSITY
      );
      setSelectedLayer(option.layer);
      return;
    }
    if (
      allActiveLayerTitles.length === 1 &&
      allActiveLayerTitles.includes(option.layer)
    ) {
      // Remove selected layer
      layerManagerToggle(
        option.layer,
        activeLayers,
        changeGlobe,
        LAYERS_CATEGORIES.BIODIVERSITY
      );
      setSelectedLayer(null);
      return;
    }

    // Add selected layer and toggle the rest
    if (layer.bbox) {
      flyToLayerExtent(layer.bbox, view);
    }

    // Add layer and toggle the rest
    batchToggleLayers(
      [...allActiveLayerTitles, option.layer],
      activeLayers,
      changeGlobe,
      LAYERS_CATEGORIES.BIODIVERSITY
    );
    setSelectedLayer(option.layer);
  };

  // Select layers when we change resolutions or tabs
  useEffect(() => {
    const resolutionsHaventChanged =
      previousSelectedResolutions &&
      previousSelectedResolutions[TERRESTRIAL] ===
        selectedResolutions[TERRESTRIAL] &&
      previousSelectedResolutions[MARINE] === selectedResolutions[MARINE];
    const biodiversityLayerHasntChanged =
      previousBiodiversityLayerVariant &&
      previousBiodiversityLayerVariant === biodiversityLayerVariant;

    if (
      !previousBiodiversityLayerVariant ||
      !previousSelectedResolutions ||
      (biodiversityLayerHasntChanged && resolutionsHaventChanged)
    ) {
      return;
    }

    const activeBiodiversityLayers = activeLayers
      .filter((l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY)
      .map((l) => l.title);
    const resolution = selectedResolutions[TERRESTRIAL];
    const defaultResolutionLayers =
      layersToggleConfig[biodiversityLayerVariant][TERRESTRIAL][
        DEFAULT_RESOLUTIONS[TERRESTRIAL]
      ];
    const availableLayers =
      layersToggleConfig[biodiversityLayerVariant][TERRESTRIAL][resolution];

    const layerTaxa = activeBiodiversityLayers.length
      ? activeBiodiversityLayers[0].slice(
          0,
          activeBiodiversityLayers[0].indexOf('-')
        )
      : '';
    const hasMatchingLayer =
      availableLayers &&
      availableLayers.find((layer) => layer.value.includes(layerTaxa));

    if (hasMatchingLayer) {
      // select matching layer on selected variant
      handleLayerToggle(hasMatchingLayer);
    } else if (availableLayers) {
      // select first element if there's no matching layer
      handleLayerToggle(availableLayers[0]);
    } else {
      // select first element if there's no maching resolution
      handleLayerToggle(defaultResolutionLayers[0]);
    }
  }, [
    biodiversityLayerVariant,
    selectedResolutions,
    previousBiodiversityLayerVariant,
    previousSelectedResolutions,
    layersToggleConfig,
  ]);

  const handleInfoClick = (option) => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: `${option.slug || option.value}`,
      locale,
      title: `${option.metadataTitle || option.name} metadata`,
      isOpen: true,
    });
  };

  const handleBringToBackClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToBack(layer, map);
  };

  const handleBringToFrontClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToFront(layer, map);
  };

  return (
    <Component
      handleInfoClick={handleInfoClick}
      handleBringToBackClick={handleBringToBackClick}
      handleBringToFrontClick={handleBringToFrontClick}
      groupedOptions={layerOptions}
      onLayerChange={handleLayerToggle}
      setSelectedLayer={setSelectedLayer}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(BiodiversityLayerToggle);
