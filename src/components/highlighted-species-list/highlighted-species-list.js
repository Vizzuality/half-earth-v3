import React, {useEffect, useState, useReducer} from 'react';
import { random } from 'lodash';
 import Component from './highlighted-species-list-component';
import EsriFeatureService from 'services/esri-feature-service';
import MolService from 'services/mol';
import { HIGHLIGHTED_COUNTRY_SPECIES_URL } from 'constants/layers-urls';

const HighlightedSpeciesContainer = (props) => {
  const {countryISO, maxHighlightedSpecies } = props;
  const [highlightedSpeciesInitial, setHiglightedSpeciesInitial] = useState(null);
  const [highlightedSpecies, setHiglightedSpecies] = useState(null);

  useEffect(() => {
    const randomizeSpecies = random(1, maxHighlightedSpecies);
    EsriFeatureService.getFeatures({
      url: HIGHLIGHTED_COUNTRY_SPECIES_URL,
      whereClause: `GID_0 = '${countryISO}' AND random = ${randomizeSpecies}`
    }).then((features) => {
      const _highlightedSpeciesInitial = features.map((species) => ({
            rangeProtected: species.attributes.percentprotectedglobal,
            scientificName: species.attributes.species_scientific_name,
          }))
          setHiglightedSpeciesInitial(_highlightedSpeciesInitial)
    })
  }, [countryISO])

  useEffect(() => {
    if (highlightedSpeciesInitial) {
      const speciesNames = highlightedSpeciesInitial.map(species => species.scientificName);
      MolService.getSpecies(speciesNames).then((results) => {
        const _highlightedSpecies = results.map((species, index) => (
          {
            ...highlightedSpeciesInitial[index],
            name: species.commonname,
            imageUrl: species.image && species.image.url
          }
        ))
        setHiglightedSpecies(_highlightedSpecies)
      }
      )
    }
  }, [highlightedSpeciesInitial])

  return (
    <Component
      highlightedSpecies={highlightedSpecies}
      {...props}
    />
  )
}

export default HighlightedSpeciesContainer;

