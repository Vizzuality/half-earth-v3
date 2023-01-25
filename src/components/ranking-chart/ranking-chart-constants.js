import { t } from '@transifex/native';

export const getLegendItems = () => [
  {
    legend: t('Non endemic species'),
    color: '#F87200',
    category: 'species',
  },
  {
    legend: t('Endemic species'),
    color: '#F8D300',
    category: 'species',
  },
  {
    legend: t('Very high modification'),
    color: '#731CFF',
    category: 'humanModification',
  },
  {
    legend: t('Some modification'),
    color: '#B284FD',
    category: 'humanModification',
  },
  {
    legend: t('Non-human modification'),
    color: '#A0AFB8',
    category: 'humanModification',
  },
  {
    legend: t('Protected areas'),
    color: '#008604',
    category: 'protection',
  },
  {
    legend: t('Protection needed'),
    color: '#B3E74B',
    category: 'protection',
  },
  {
    legend: t('Protection non-needed'),
    color: '#AFB8A0',
    category: 'protection',
  },
];
