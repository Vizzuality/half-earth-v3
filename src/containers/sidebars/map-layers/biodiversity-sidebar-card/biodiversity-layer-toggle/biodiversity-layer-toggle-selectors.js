import { createSelector, createStructuredSelector } from 'reselect';

import { selectLangUrlState } from 'selectors/location-selectors';

import {
  GROUPED_OPTIONS,
  getLayersToggleConfig,
} from 'constants/biodiversity-layers-constants';

const getCategory = (state, { category }) => category;
const getSelectedLayer = (state, { selectedLayer }) => selectedLayer;
const getSelectedResolutions = (state, { selectedResolutions }) =>
  selectedResolutions;
const getBiodiversityLayerVariant = (state, { biodiversityLayerVariant }) =>
  biodiversityLayerVariant;

const parsedGroupOptions = (layerOptions) => {
  const groupedOptions = GROUPED_OPTIONS(layerOptions).filter(
    (go) => go.options.length > 0
  );
  const groupedOptionsMultiple = groupedOptions
    .filter((o) => !!o.options.length)
    .find((o) => o.options.length > 1);

  if (!groupedOptionsMultiple) {
    return groupedOptions.map((go) => {
      return {
        ...go,
        // Label is null to avoid display of group label on the dropdown
        label: null,
      };
    });
  }
  return groupedOptions;
};

const orderedLayers = (layers) => {
  const layerAll = layers.filter((l) => l.name === 'All');

  const layersStartingWithAll = layers
    .filter((l) => l.name.startsWith('All '))
    .sort((a, b) => a.name.localeCompare(b.name));

  const otherLayers = layers
    .filter((l) => l.name !== 'All')
    .filter((l) => !l.name.startsWith('All '))
    .sort((a, b) => a.name.localeCompare(b.name));

  return layerAll.concat(layersStartingWithAll, otherLayers);
};

const getCategoryLayerOptions = createSelector(
  [
    getCategory,
    getBiodiversityLayerVariant,
    getSelectedResolutions,
    selectLangUrlState,
  ],
  // Will update depending on the locale
  // eslint-disable-next-line no-unused-vars
  (category, biodiversityLayerVariant, selectedResolutions, locale) => {
    const layersToggleConfig = getLayersToggleConfig();
    const resolutionsForSelectedCategory =
      layersToggleConfig[biodiversityLayerVariant][category];

    const layersForSelectedResolution =
      resolutionsForSelectedCategory &&
      resolutionsForSelectedCategory[selectedResolutions[category]];

    return layersForSelectedResolution
      ? orderedLayers(layersForSelectedResolution)
      : [];
  }
);

const getGroupedLayerOptions = createSelector(
  [getCategoryLayerOptions],
  (categoryLayerOptions) => parsedGroupOptions(categoryLayerOptions)
);

const getSelectedLayerOption = createSelector(
  [getCategoryLayerOptions, getSelectedLayer],
  (options, selectedLayer) => {
    const optionsSelectedLayer =
      options.find((l) => l.value === selectedLayer) || options[0];
    // label is needed for grouped layer option
    return { ...optionsSelectedLayer, label: optionsSelectedLayer.name };
  }
);

export default createStructuredSelector({
  layerOptions: getGroupedLayerOptions,
  selectedLayerOption: getSelectedLayerOption,
});
