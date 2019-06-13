import React from 'react';
import PartnersComponent from './partners-component';
import { partners, dataPartners, researchPartners, sponsors } from './partners-data';
import styles from './partners-styles.module.scss';

const PartnersContainer = ({ textData }) => {
  const sections = textData && [
    {
      title: textData.title,
      description: textData.content,
      content: partners,
      theme: styles.partners
    },
    { title: textData.title2,
      content: sponsors
    },
    { title: textData.title3, content: dataPartners },
    { title: textData.title4, content: researchPartners }
  ];

  return <PartnersComponent sections={sections}/>
}

export default PartnersContainer;