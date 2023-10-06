import { useEffect } from 'react';

import {
  TERRESTRIAL_GLOBAL,
  TERRESTRIAL_REGIONAL,
  MARINE,
  DEFAULT_RESOLUTIONS,
} from 'constants/biodiversity-layers-constants';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

export const useSelectLayersOnTabOrResolutionChange = ({
  biodiversityLayerVariant,
  selectedResolutions,
  previousBiodiversityLayerVariant,
  previousSelectedResolutions,
  layersToggleConfig,
  category,
  isChecked,
  allActiveLayerTitles,
  activeLayers,
  handleLayerToggle,
}) => {
  // Select layers when we change resolutions or tabs
  useEffect(() => {
    const resolutionsHaventChanged =
      previousSelectedResolutions &&
      previousSelectedResolutions[TERRESTRIAL_GLOBAL] ===
        selectedResolutions[TERRESTRIAL_GLOBAL] &&
      previousSelectedResolutions[TERRESTRIAL_REGIONAL] ===
        selectedResolutions[TERRESTRIAL_REGIONAL] &&
      previousSelectedResolutions[MARINE] === selectedResolutions[MARINE];
    const biodiversityLayerHasntChanged =
      previousBiodiversityLayerVariant &&
      previousBiodiversityLayerVariant === biodiversityLayerVariant;

    const isTerrestrial = [TERRESTRIAL_GLOBAL, TERRESTRIAL_REGIONAL].includes(
      category
    );
    // Also if category is terrestrial and is not checked but we have a active biodiversityLayers = marine
    const marineLayerIsActive =
      !isTerrestrial && !isChecked && allActiveLayerTitles.length > 0;

    if (
      !previousBiodiversityLayerVariant ||
      !previousSelectedResolutions ||
      (biodiversityLayerHasntChanged && resolutionsHaventChanged)
    ) {
      return;
    }

    // is MARINE toggle and not selected => Don't do anything (will do on the terrestrial toggle)
    // is MARINE toggle and selected => select marine available layers on the new tab for marine

    // is TERRESTRIAL toggle and not selected and marine selected => Don't do anything (will do on the marine toggle)
    // is TERRESTRIAL toggle and selected
    // or is TERRESTRIAL toggle and not selected (no selection) =>
    // select terrestrial available layers on the new tab for terrestrial

    // Find if the user has clicked on any resolution radio button
    const resolutionGroupThatHasChanged = Object.keys(selectedResolutions).find(
      (res) => {
        return (
          selectedResolutions[res] !== previousSelectedResolutions[res] &&
          previousSelectedResolutions[res] !== undefined
        );
      }
    );

    if ((category === MARINE && !isChecked) || marineLayerIsActive) {
      return;
    }

    const currentResolutionGroup = resolutionGroupThatHasChanged || category;

    const activeBiodiversityLayers = activeLayers
      .filter((l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY)
      .map((l) => l.title);
    const resolution = selectedResolutions[currentResolutionGroup];
    const defaultResolutionLayers =
      layersToggleConfig[biodiversityLayerVariant][currentResolutionGroup][
        DEFAULT_RESOLUTIONS[currentResolutionGroup]
      ];
    const availableLayers =
      layersToggleConfig[biodiversityLayerVariant][currentResolutionGroup][
        resolution
      ];

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
};
