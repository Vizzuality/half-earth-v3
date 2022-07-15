import { t } from '@transifex/native';

import { ReactComponent as All } from 'icons/taxa_all.svg';
import { ReactComponent as Mammals } from 'icons/taxa_mammals.svg';
import { ReactComponent as Reptiles } from 'icons/taxa_reptiles.svg';
import { ReactComponent as Amphibians } from 'icons/taxa_amphibians.svg';
import { ReactComponent as Birds } from 'icons/taxa_birds.svg';

export default () => [
  {
    title: t('all species'),
    slug: 'all',
    icon: All
  },
  {
    title: t('reptiles'),
    slug: 'reptiles',
    icon: Reptiles
  },
  {
    title: t('mammals'),
    slug: 'mammals',
    icon: Mammals
  },
  {
    title: t('amphibians'),
    slug: 'amphibians',
    icon: Amphibians
  },
  {
    title: t('birds'),
    slug: 'birds',
    icon: Birds
  },
]
