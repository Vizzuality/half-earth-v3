import React, { useEffect, useState } from 'react';
import { DEFAULT_SPECIES_FILTER, IUCN_CATEGORIES } from 'constants/analyze-areas-constants';
import { getPlaceholderSpeciesImage } from 'utils/analyze-areas-utils';
import MolService from 'services/mol';
import Component from './component';

const SpeciesCardContainer = (props) => {
  const { speciesData } = props;
  const { species } = speciesData;
  const [selectedSpeciesFilter, setSpeciesFilter] = useState(DEFAULT_SPECIES_FILTER); 
  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState(0); 
  const [placeholderText, setPlaceholderText] = useState(null); 
  const [speciesToDisplay, setSpeciesToDisplay] = useState(species); 
  const [imageBackgroundPosition, setImageBackgroundPosition] = useState('center'); 
  const [selectedSpecies, setSelectedSpecies] = useState(speciesToDisplay[selectedSpeciesIndex])
  const [individualSpeciesData, setIndividualSpeciesData] = useState(null)


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
    setSelectedSpeciesIndex(0);
  }, [selectedSpeciesFilter])

  useEffect(() => {
    if (selectedSpecies) {
      MolService.getSpecies(selectedSpecies.name).then((results) => {
        if (results.length > 0) {
          setIndividualSpeciesData({
            ...selectedSpecies,
            commonname: results[0].commonname,
            imageUrl: results[0].image ? results[0].image.url : getPlaceholderSpeciesImage(results[0].taxa),
            iucnCategory: IUCN_CATEGORIES[results[0].redlist]
          });
          results[0].image ? setPlaceholderText(null) : setPlaceholderText(`Photo not available for this ${results[0].taxa.substring(0, results[0].taxa.length -1)}`)
        } else {
          handleNextSpeciesSelection();
        }
      })
    }
  }, [selectedSpecies])

  useEffect(() => {
    if (individualSpeciesData) {
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (width - height > 0) {
          setImageBackgroundPosition('center')
        } else {
          setImageBackgroundPosition('50% 10%')
        }
      }
      img.src = individualSpeciesData.imageUrl;
    }
  },[individualSpeciesData])

  return (
    <Component
      placeholderText={placeholderText}
      selectedSpecies={selectedSpecies}
      speciesToDisplay={speciesToDisplay}
      setSpeciesFilter={setSpeciesFilter}
      selectedSpeciesFilter={selectedSpeciesFilter}
      individualSpeciesData={individualSpeciesData}
      imageBackgroundPosition={imageBackgroundPosition}
      handleNextSpeciesSelection={handleNextSpeciesSelection}
      handlePreviousSpeciesSelection={handlePreviousSpeciesSelection}
      {...props}
    />
  )
}

export default SpeciesCardContainer;
