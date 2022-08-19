import { CARBON_LAYER } from 'constants/layers-slugs';
import { t } from '@transifex/native';

export const getCarbonLayer = () => {
  const CARBON_LAYER_LABEL = t('Irrecoverable land carbon');
  return ({
    name: CARBON_LAYER_LABEL,
    value: CARBON_LAYER,
    slug: CARBON_LAYER,
  });
};
