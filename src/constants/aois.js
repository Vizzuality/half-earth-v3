import { t } from '@transifex/native';

export const STRINGIFIED_ATTRIBUTES = ['elu', 'pressures', 'protectedAreasList'];

export const getSidebarTabs = () => [
  { slug: 'map-layers', title: t('Map Layers') },
  { slug: 'analyze-areas', title: t('Analyze Areas') },
];
