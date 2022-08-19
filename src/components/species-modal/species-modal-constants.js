import { t } from '@transifex/native';

export const getVertebrateTabs = () => [
  { slug: 'land', title: t('Land') },
  { slug: 'marine', title: t('Marine') },
];

export const SPECIES_GROUP_STYLE_CLASS_DICTIONARY = {
  'marine fishes': 'fishes',
  'marine mammals': 'mar-mammals',
};

export default { getVertebrateTabs, SPECIES_GROUP_STYLE_CLASS_DICTIONARY };
