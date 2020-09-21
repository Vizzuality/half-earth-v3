import { createSelector } from 'reselect';
import castArray from 'lodash/castArray';
import intersection from 'lodash/intersection';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LABELS_LAYERS } from 'constants/layers-groups';

const layers = [
  {
    label: 'Labels',
    value: LABELS_LAYERS
  },
  {
    label: 'Politic boundaries',
    value: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER
  }
];

export const getCheckboxLayers = createSelector([state => state.activeLayers], (activeLayers) => {
  const activeLayersSlugs = activeLayers.map(l => l.title);
  return layers.map((l) => ({
    ...l,
    isChecked: intersection(castArray(l.value), activeLayersSlugs).length > 0
  }));
});
