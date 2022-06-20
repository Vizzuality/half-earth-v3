import { createSelector, createStructuredSelector } from 'reselect';
import {
  WDPALayers,
  conserveNextLayers,
} from 'constants/protected-areas';

export const getCountedActiveLayers = createSelector(
  [(state, props) => props && props.activeLayers], (activeLayers) => {
    if(!activeLayers || !activeLayers.length) return 0;
    const protectedLayers = WDPALayers.concat(conserveNextLayers);
    const allLayers = Object.values(protectedLayers).map((layer) => layer.value)
    return activeLayers
      .map((l) => l.title)
      .reduce((acc, l) => (allLayers.includes(l) ? acc + 1 : acc), 0);
});

export default createStructuredSelector({
  countedActiveLayers: getCountedActiveLayers
})
