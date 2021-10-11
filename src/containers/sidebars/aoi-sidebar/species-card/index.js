import React, { useEffect, useState } from 'react';
import { DEFAULT_SPECIES_FILTER, IUCN_CATEGORIES } from 'constants/analyze-areas-constants';
import { getPlaceholderSpeciesImage, getPlaceholderSpeciesText } from 'utils/analyze-areas-utils';
import { SPECIES_FILTERS } from 'constants/analyze-areas-constants';
import MolService from 'services/mol';
import Component from './component';

const SpeciesCardContainer = (props) => {
  const { speciesData } = props;
  const { species } = speciesData;
  const [selectedSpeciesFilter, setSpeciesFilter] = useState(DEFAULT_SPECIES_FILTER); 
  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState(0); 
  const [placeholderText, setPlaceholderText] = useState(null); 
  const [speciesFilters, setFilterWithCount] = useState(SPECIES_FILTERS); 
  const [loadedPercentage, setLoadedPercentage] = useState(30); 
  const [loaderIntervalId, setLoaderIntervalId] = useState(null)
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

  const nextSpecies = () => selectedSpeciesIndex === speciesToDisplay.length - 1 ? 0 : selectedSpeciesIndex + 1;
  const prevSpecies = () => selectedSpeciesIndex === 0 ? speciesToDisplay.length - 1 : selectedSpeciesIndex - 1;

  useEffect(() => {
    const filters = SPECIES_FILTERS.map(filter => {
      let count;
      switch (filter.slug) {
        case 'all':
          return filter
        case 'flagship':
          count = species.filter(sp => sp.isFlagship).length;
          return { slug: filter.slug, label: `${filter.label} (${count})`}
        case 'endangered':
          count = species.sort((a, b) => (b.conservationConcern - a.conservationConcern)).slice(0, 40).length;
          return { slug: filter.slug, label: `${filter.label} (${count})`}
        default:
          count = species.filter(sp => sp.category === filter.slug).length;
          return { slug: filter.slug, label: `${filter.label} (${count})`}
      }
    })
    setFilterWithCount(filters)

  }, [speciesData.species])

  useEffect(() => {
    switch (selectedSpeciesFilter.slug) {
      case 'all':
        setSpeciesToDisplay(species.sort((a, b) => b.isFlagship - a.isFlagship))
        break;
      case 'flagship':
        setSpeciesToDisplay(species.filter(sp => sp.isFlagship));
        break;
      case 'endangered':
        setSpeciesToDisplay(species.sort((a, b) => (b.conservationConcern - a.conservationConcern)).slice(0, 40));
        break;
      default:
        setSpeciesToDisplay(species.filter(sp => sp.category === selectedSpeciesFilter.slug).sort((a, b) => b.isFlagship - a.isFlagship));
        break;
    }
  }, [speciesData.species, selectedSpeciesFilter])

  useEffect(() => {
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
          results[0].image ? setPlaceholderText(null) : setPlaceholderText(getPlaceholderSpeciesText(results[0].taxa))
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
      speciesFilters={speciesFilters}
      placeholderText={placeholderText}
      selectedSpecies={selectedSpecies}
      loadedPercentage={loadedPercentage}
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
