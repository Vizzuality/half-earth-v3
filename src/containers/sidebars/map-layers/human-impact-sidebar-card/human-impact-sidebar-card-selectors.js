/* eslint-disable max-len */
import { createSelector, createStructuredSelector } from 'reselect';

import { selectLangUrlState } from 'selectors/location-selectors';

import {
  getHumanPressuresLandUse,
  getHumanPressuresMarine,
} from 'constants/human-pressures';

// locale is here to recompute the data when the language changes
// eslint-disable-next-line no-unused-vars
const getComputedHumanPressuresLandUse = createSelector(
  selectLangUrlState,
  // eslint-disable-next-line no-unused-vars
  (locale) => getHumanPressuresLandUse()
);
// locale is here to recompute the data when the language changes
// eslint-disable-next-line no-unused-vars
const getComputedHumanPressuresMarine = createSelector(
  selectLangUrlState,
  // eslint-disable-next-line no-unused-vars
  (locale) => getHumanPressuresMarine()
);

export const getHumanCountedActiveLayers = createSelector(
  [
    (state, props) => props && props.activeLayers,
    getComputedHumanPressuresLandUse,
    getComputedHumanPressuresMarine,
  ],
  (activeLayers, humanPressuresLandUse, humanPressuresMarine) => {
    if (!activeLayers || !activeLayers.length) return 0;
    const humanPressuresLayers =
      humanPressuresLandUse.concat(humanPressuresMarine);
    const allLayers = Object.values(humanPressuresLayers).map(
      (layer) => layer.value
    );
    return activeLayers
      .map((l) => l.title)
      .reduce((acc, l) => (allLayers.includes(l) ? acc + 1 : acc), 0);
  }
);

export default createStructuredSelector({
  countedActiveLayers: getHumanCountedActiveLayers,
});
