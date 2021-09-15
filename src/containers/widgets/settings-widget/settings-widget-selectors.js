import { createSelector, createStructuredSelector } from 'reselect';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LABELS_LAYERS } from 'constants/layers-groups';

const layers = [
  {
    label: 'Political boundaries',
    slug: 'boundaries',
    value: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER
  },
  {
    label: 'Labels',
    slug: 'labels',
    value: LABELS_LAYERS
  }
];


const selectUserSettingsLayers = ({ userConfig }) => (userConfig && userConfig.layers) || null;

const getCheckboxLayers = createSelector(
  [selectUserSettingsLayers],
  (userLayers) => {
    if(!userLayers) return null;
    return layers.map((layer) => ({
      ...layer,
      isChecked: userLayers[layer.slug]
    }));
  }
);

export default createStructuredSelector({
  checkboxLayers: getCheckboxLayers
});