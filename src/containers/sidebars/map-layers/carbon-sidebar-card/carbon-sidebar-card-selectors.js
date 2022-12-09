import { createSelector, createStructuredSelector } from 'reselect';

import { selectLangUrlState } from 'selectors/location-selectors';

import { getCarbonLayer } from 'constants/carbon-layer';

// locale is here to recompute the data when the language changes
// eslint-disable-next-line no-unused-vars
const getComputedCarbonLayer = createSelector(selectLangUrlState, (locale) =>
  getCarbonLayer()
);

export const getCarbonCountedActiveLayers = createSelector(
  [(state, props) => props && props.activeLayers, getComputedCarbonLayer],
  (activeLayers, carbonLayer) => {
    if (!activeLayers || !activeLayers.length) return 0;
    return activeLayers
      .map((l) => l.title)
      .reduce((acc, title) => (carbonLayer.value === title ? acc + 1 : acc), 0);
  }
);

export default createStructuredSelector({
  countedActiveLayers: getCarbonCountedActiveLayers,
});
