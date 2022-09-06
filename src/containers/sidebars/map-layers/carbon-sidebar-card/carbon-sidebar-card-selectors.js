import { createSelector, createStructuredSelector } from 'reselect';
import { getCarbonLayer } from 'constants/carbon-layer';
import { selectLangUrlState } from 'selectors/location-selectors';

// locale is here to recompute the data when the language changes
const getComputedCarbonLayer = createSelector(selectLangUrlState, (locale) => getCarbonLayer());

export const getCountedActiveLayers = createSelector([(state, props) => props && props.activeLayers, getComputedCarbonLayer], (activeLayers, carbonLayer) => {
  if (!activeLayers || !activeLayers.length) return 0;
  return activeLayers
    .map((l) => l.title)
    .reduce((acc, title) => (carbonLayer.value === title ? acc + 1 : acc), 0);
});

export default createStructuredSelector({
  countedActiveLayers: getCountedActiveLayers,
});
