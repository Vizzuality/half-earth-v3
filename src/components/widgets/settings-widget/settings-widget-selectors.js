import { createSelector, createStructuredSelector } from 'reselect';
import castArray from 'lodash/castArray';
import intersection from 'lodash/intersection';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LABELS_LAYERS } from 'constants/layers-groups';

const layers = [
  {
    label: 'Political boundaries',
    value: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER
  },
  {
    label: 'Labels',
    value: LABELS_LAYERS
  }
];

const getActiveLayersFromProps = (state, props) => props.activeLayers;

const getCheckboxLayers = createSelector([getActiveLayersFromProps], (activeLayers) => {
  const activeLayersSlugs = activeLayers.map(layer => layer.title);
  return layers.map((layer) => ({
    ...layer,
    isChecked: intersection(castArray(layer.value), activeLayersSlugs).length > 0
  }));
});

export default createStructuredSelector({
  checkboxLayers: getCheckboxLayers
});