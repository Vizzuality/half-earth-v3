import React, {useEffect, useState} from 'react';
 import Component from './highlighted-species-list-component';
import EsriFeatureService from 'services/esri-feature-service';
import MolService from 'services/mol';
import { HIGHLIGHTED_COUNTRY_SPECIES_URL } from 'constants/layers-urls';

const HighlightedSpeciesContainer = (props) => {
  const {countryISO, highlightedSpeciesRandomNumber } = props;
  const [highlightedSpeciesInitial, setHiglightedSpeciesInitial] = useState(null);
  const [highlightedSpecies, setHiglightedSpecies] = useState(null);

  useEffect(() => {
    if (countryISO && highlightedSpeciesRandomNumber) {
      EsriFeatureService.getFeatures({
        url: HIGHLIGHTED_COUNTRY_SPECIES_URL,
        whereClause: `GID_0 = '${countryISO}' AND random = ${highlightedSpeciesRandomNumber}`
      }).then((features) => {
        const _highlightedSpeciesInitial = features.map((species) => ({
              rangeProtected: species.attributes.percentprotectedglobal,
              scientificName: species.attributes.species_scientific_name,
            }))
            setHiglightedSpeciesInitial(_highlightedSpeciesInitial)
      })
    }
  }, [countryISO, highlightedSpeciesRandomNumber])

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

