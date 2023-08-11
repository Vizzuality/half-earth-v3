import { t } from '@transifex/native';

import { CARBON_LAYER, MARINE_CARBON_LAYER } from 'constants/layers-slugs';

export const getCarbonLayers = () => {
  const CARBON_LAYER_LABEL = t('Irrecoverable land carbon');
  const MARINE_CARBON_LAYER_LABEL = t('Marine sediment carbon');
  return [
    {
      name: CARBON_LAYER_LABEL,
      value: CARBON_LAYER,
      slug: CARBON_LAYER,
    },
    {
      name: MARINE_CARBON_LAYER_LABEL,
      value: MARINE_CARBON_LAYER,
      slug: MARINE_CARBON_LAYER,
    },
  ];
};
