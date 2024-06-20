import { t } from '@transifex/native';

import All  from 'icons/taxa_all.svg?react';
import Amphibians  from 'icons/taxa_amphibians.svg?react';
import Birds  from 'icons/taxa_birds.svg?react';
import Mammals  from 'icons/taxa_mammals.svg?react';
import Reptiles  from 'icons/taxa_reptiles.svg?react';

export default () => [
  {
    title: t('all species'),
    slug: 'all',
    icon: All,
  },
  {
    title: t('reptiles'),
    slug: 'reptiles',
    icon: Reptiles,
  },
  {
    title: t('mammals'),
    slug: 'mammals',
    icon: Mammals,
  },
  {
    title: t('amphibians'),
    slug: 'amphibians',
    icon: Amphibians,
  },
  {
    title: t('birds'),
    slug: 'birds',
    icon: Birds,
  },
];
