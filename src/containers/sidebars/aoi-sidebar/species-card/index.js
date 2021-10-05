import React, { useEffect, useState } from 'react';
import { DEFAULT_SPECIES_FILTER, IUCN_CATEGORIES } from 'constants/analyze-areas-constants';
import MolService from 'services/mol';
import Component from './component';

const SpeciesCardContainer = (props) => {
  const { speciesData } = props;
  const { species } = speciesData;
  const [selectedSpeciesFilter, setSpeciesFilter] = useState(DEFAULT_SPECIES_FILTER); 
  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState(0); 
  const [speciesToDisplay, setSpeciesToDisplay] = useState(species); 
  const [selectedSpecies, setSelectedSpecies] = useState(speciesToDisplay[selectedSpeciesIndex])
  const [individualSpeciesData, setIndividualSpeciesData] = useState(null)

  useEffect(() => {
    switch (selectedSpeciesFilter.slug) {
      case 'all':
        setSpeciesToDisplay(species)
        break;
      case 'flagship':
        setSpeciesToDisplay(species.filter(sp => sp.isFlagship));
        break;
      default:
        setSpeciesToDisplay(species.filter(sp => sp.category === selectedSpeciesFilter.slug));
        break;
    }
  }, [speciesData.species, selectedSpeciesFilter])

  useEffect(() => {
    console.log(selectedSpeciesIndex)
    setSelectedSpecies(speciesToDisplay[selectedSpeciesIndex])
  }, [speciesToDisplay, selectedSpeciesIndex])

  useEffect(() => {
    if (selectedSpecies) {
      MolService.getSpecies(selectedSpecies.name).then((results) => {
        setIndividualSpeciesData({
          ...selectedSpecies,
          commonname: results[0].commonname,
          imageUrl: results[0].image ? results[0].image.url : 'results[0].taxa',
          iucnCategory: IUCN_CATEGORIES[results[0].redlist]
        })
      })
    }
  }, [selectedSpecies])


  const handleNextSpeciesSelection = () => {
    selectedSpeciesIndex === speciesToDisplay.length - 1 ?
    setSelectedSpeciesIndex(0) :
    setSelectedSpeciesIndex(selectedSpeciesIndex + 1)
  }
  const handlePreviousSpeciesSelection = () => {
    selectedSpeciesIndex === 0 ?
    setSelectedSpeciesIndex(speciesToDisplay.length - 1) :
    setSelectedSpeciesIndex(selectedSpeciesIndex - 1)
  }

  return (
    <Component
      selectedSpecies={selectedSpecies}
      speciesToDisplay={speciesToDisplay}
      setSpeciesFilter={setSpeciesFilter}
      selectedSpeciesFilter={selectedSpeciesFilter}
      individualSpeciesData={individualSpeciesData}
      handleNextSpeciesSelection={handleNextSpeciesSelection}
      handlePreviousSpeciesSelection={handlePreviousSpeciesSelection}
      {...props}
    />
  )
}

export default SpeciesCardContainer;
