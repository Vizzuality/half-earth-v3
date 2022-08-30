import React, { useMemo } from 'react';

import {
  getTexts, getPartners, getPlatformPartners, getDataPartners, getResearchPartners, getSponsors,
} from 'utils/partners-utils';

import { useLocale } from '@transifex/react';

import Component from './component';
import styles from './styles.module.scss';

function AboutModalContainer(props) {
  const { setAboutModalOpen } = props;
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

  const handleClose = () => setAboutModalOpen(false);
  // eslint-disable-next-line react/jsx-filename-extension
  return <Component handleClose={handleClose} sections={sections} {...props} />;
}
export default AboutModalContainer;
