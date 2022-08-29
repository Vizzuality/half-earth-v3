import React, { useMemo } from 'react';
import { useLocale } from '@transifex/react';
import PartnersComponent from './partners-component';
import {
  getTexts, getPartners, getPlatformPartners, getDataPartners, getResearchPartners, getSponsors,
} from './partners-data';
import styles from './partners-styles.module.scss';

function PartnersContainer() {
  const locale = useLocale();
  const texts = useMemo(() => getTexts(), [locale]);
  const partners = useMemo(() => getPartners(), [locale]);
  const platformPartners = useMemo(() => getPlatformPartners(), [locale]);
  const dataPartners = useMemo(() => getDataPartners(), [locale]);
  const researchPartners = useMemo(() => getResearchPartners(), [locale]);
  const sponsors = useMemo(() => getSponsors(), [locale]);

  const sections = [
    {
      title: texts.partners.title,
      description: texts.partners.content,
      content: partners,
      theme: styles.partners,
    },
    {
      title: texts.platformPartners.title,
      content: platformPartners,
      theme: styles.platformPartners,

    },
    {
      title: texts.sponsors.title,
      content: sponsors,
    },
    { title: texts.dataPartners.title, content: dataPartners },
    { title: texts.researchPartners.title, content: researchPartners },
  ];

  return <PartnersComponent sections={sections} />;
}

export default PartnersContainer;
