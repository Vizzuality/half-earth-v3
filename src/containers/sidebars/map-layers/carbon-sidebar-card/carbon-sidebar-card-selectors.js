import { createSelector, createStructuredSelector } from 'reselect';

import { selectLangUrlState } from 'selectors/location-selectors';

import { getCarbonLayers } from 'constants/carbon-layer';

// locale is here to recompute the data when the language changes
// eslint-disable-next-line no-unused-vars
const getComputedCarbonLayers = createSelector(selectLangUrlState, (locale) =>
  getCarbonLayers()
);

export const getCarbonCountedActiveLayers = createSelector(
  [(state, props) => props && props.activeLayers, getComputedCarbonLayers],
  (activeLayers, carbonLayers) => {
    if (!activeLayers || !activeLayers.length) return 0;
    return activeLayers
      .map((l) => l.title)
      .reduce(
        (acc, title) =>
          carbonLayers.map((l) => l.value).includes(title) ? acc + 1 : acc,
        0
      );
  }
);

export default createStructuredSelector({
  countedActiveLayers: getCarbonCountedActiveLayers,
});
