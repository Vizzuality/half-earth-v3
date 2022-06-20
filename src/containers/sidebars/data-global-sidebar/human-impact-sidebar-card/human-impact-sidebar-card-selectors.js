import { createSelector, createStructuredSelector } from 'reselect';
import {
  humanPressuresLandUse,
  humanPressuresMarine,
} from 'constants/human-pressures';

export const getCountedActiveLayers = createSelector(
  [(state, props) => props && props.activeLayers], (activeLayers) => {
    if(!activeLayers || !activeLayers.length) return 0;
    const humanPressuresLayers = humanPressuresLandUse.concat(humanPressuresMarine);
    const allLayers = Object.values(humanPressuresLayers).map((layer) => layer.value)
    return activeLayers
      .map((l) => l.title)
      .reduce((acc, l) => (allLayers.includes(l) ? acc + 1 : acc), 0);
});

export default createStructuredSelector({
  countedActiveLayers: getCountedActiveLayers
})
