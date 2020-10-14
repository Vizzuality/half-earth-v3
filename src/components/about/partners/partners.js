import React from 'react';
import PartnersComponent from './partners-component';
import { texts, partners, platformPartners, dataPartners, researchPartners, sponsors } from './partners-data';
import styles from './partners-styles.module.scss';

const PartnersContainer = () => {
  const sections = [
    {
      title: texts.partners.title,
      description: texts.partners.content,
      content: partners,
      theme: styles.partners
    },
    {
      title: texts.platformPartners.title,
      content: platformPartners,
      theme: styles.platformPartners

    },
    { title: texts.sponsors.title,
      content: sponsors
    },
    { title: texts.dataPartners.title, content: dataPartners },
    { title: texts.researchPartners.title, content: researchPartners }
  ];

  return <PartnersComponent sections={sections}/>
}

export default PartnersContainer;