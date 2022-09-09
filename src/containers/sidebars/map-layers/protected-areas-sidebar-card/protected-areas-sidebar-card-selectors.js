import { createSelector, createStructuredSelector } from 'reselect';

import { selectLangUrlState } from 'selectors/location-selectors';

import {
  getWDPALayers,
  getConserveNextLayers,
} from 'constants/protected-areas';

// locale is here to recompute the data when the language changes
// eslint-disable-next-line no-unused-vars
const getComputedWDPALayers = createSelector(selectLangUrlState, (locale) => getWDPALayers());
// locale is here to recompute the data when the language changes
const getComputedConserveNextLayers = createSelector(
  selectLangUrlState,
  // eslint-disable-next-line no-unused-vars
  (locale) => getConserveNextLayers(),
);

export const getProtectionCountedActiveLayers = createSelector(
  [(state, props) => props && props.activeLayers,
    getComputedWDPALayers, getComputedConserveNextLayers],
  (activeLayers, WDPALayers, conserveNextLayers) => {
    if (!activeLayers || !activeLayers.length) return 0;
    const protectedLayers = WDPALayers.concat(conserveNextLayers);
    const allLayers = Object.values(protectedLayers).map((layer) => layer.value);
    return activeLayers
      .map((l) => l.title)
      .reduce((acc, l) => (allLayers.includes(l) ? acc + 1 : acc), 0);
  },
);

export default createStructuredSelector({
  countedActiveLayers: getProtectionCountedActiveLayers,
});
