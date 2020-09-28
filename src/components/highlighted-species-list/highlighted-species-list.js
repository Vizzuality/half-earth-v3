import React, {useEffect, useState} from 'react';
import { random } from 'lodash';
 import Component from './highlighted-species-list-component';
import EsriFeatureService from 'services/esri-feature-service';
import { HIGHLIGHTED_COUNTRY_SPECIES_URL } from 'constants/layers-urls';

const HighlightedSpeciesContainer = (props) => {
  const {countryISO, maxHighlightedSpecies } = props;
  const [highlightedSpecies, setHiglightedSpecies] = useState(null);

  useEffect(() => {
    const randomizeSpecies = random(1, maxHighlightedSpecies);
    EsriFeatureService.getFeatures({
      url: HIGHLIGHTED_COUNTRY_SPECIES_URL,
      whereClause: `iso3 = '${countryISO}' AND random = ${randomizeSpecies}`
    }).then((features) => {
      setHiglightedSpecies(features)
    })
  }, [countryISO])

  return (
    <Component
      highlightedSpecies={highlightedSpecies}
      {...props}
    />
  )
}

export default HighlightedSpeciesContainer;

