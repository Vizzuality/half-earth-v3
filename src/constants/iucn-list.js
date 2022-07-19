import { t } from '@transifex/native';

export const getIUCNList = () => ({
  EX: t('Extinct'),
  EW: t('Extinct in the wild'),
  CR: t('Critically endangered'),
  EN: t('Endangered'),
  VU: t('Vulnerable'),
  NT: t('Near threatened'),
  LC: t('Least concern'),
  DD: t('Data deficient'),
  NE: t('Not evaluated'),
});
