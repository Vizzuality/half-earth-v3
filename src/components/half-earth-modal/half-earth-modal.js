import React, { useEffect, useState } from 'react';
// Services
import EsriFeatureService from 'services/esri-feature-service';

import { MONITORING_HE_GOAL_SERVICE_URL } from 'constants/layers-urls';
import { MARINE_LABEL, LAND_LABEL } from 'constants/half-earth-modal';

import HalfEarthModalComponent from './half-earth-modal-component';

const HalfEarthModal = props => {
  const [pageTexts, setPageTexts] = useState(null);

  const getContent = (texts, slug) => {
    const text = texts.find(text => text.attributes.text_slug === slug);
    return text.attributes.text_content
  }

  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: MONITORING_HE_GOAL_SERVICE_URL
    }).then((texts) => {
      setPageTexts({
        body: getContent(texts, 'body'),
        [MARINE_LABEL]: getContent(texts, 'marine_perc'),
        [LAND_LABEL]: getContent(texts, 'land_perc')
      })
    })
  }, [])

  return (
    <HalfEarthModalComponent
      {...props}
      pageTexts={pageTexts}
    />
  )
}


export default HalfEarthModal;