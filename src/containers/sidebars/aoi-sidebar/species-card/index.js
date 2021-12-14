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
  const [speciesToDisplay, setSpeciesToDisplay] = useState(species);
  const [imageBackgroundPosition, setImageBackgroundPosition] = useState('center');
  const [selectedSpecies, setSelectedSpecies] = useState(speciesToDisplay[selectedSpeciesIndex])
  const [individualSpeciesData, setIndividualSpeciesData] = useState(null)
  const [previousImage, setPreviousImage] = useState(null);
  const [nextImage, setNextImage] = useState(null);
  const showCarouselArrows = speciesData.species.length > 1;


  const handleNextSpeciesSelection = () => {
    if (selectedSpeciesIndex === speciesToDisplay.length - 1) {
      setSelectedSpeciesIndex(0)
    } else {
      setSelectedSpeciesIndex(selectedSpeciesIndex + 1);
    }
  }

  const handlePreviousSpeciesSelection = () => {
    selectedSpeciesIndex === 0 ?
      setSelectedSpeciesIndex(speciesToDisplay.length - 1) :
      setSelectedSpeciesIndex(selectedSpeciesIndex - 1)
  }
  useEffect(() => {
    const filters = SPECIES_FILTERS.map(filter => {
      let count;
      switch (filter.slug) {
        case 'all':
          return filter
        default:
          count = species.filter(sp => sp.category === filter.slug).length;
          return { slug: filter.slug, label: `${filter.label} (${count})` }
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

      if (speciesToDisplay.length >= 3) {
        let previousSpeciesName, nextSpeciesName;

        if (selectedSpeciesIndex === 0) {
          previousSpeciesName = speciesToDisplay[speciesToDisplay.length - 1].name;
          nextSpeciesName = speciesToDisplay[1].name;
        } else if (selectedSpeciesIndex === speciesToDisplay.length - 1) {
          previousSpeciesName = speciesToDisplay[speciesToDisplay.length - 2].name;
          nextSpeciesName = speciesToDisplay[0].name;
        } else {
          previousSpeciesName = speciesToDisplay[selectedSpeciesIndex - 1].name;
          nextSpeciesName = speciesToDisplay[selectedSpeciesIndex + 1].name;
        }

        MolService.getSpecies(previousSpeciesName)
          .then((results) => {
            setPreviousImage(results[0].image ? results[0].image.url : getPlaceholderSpeciesImage(results[0].taxa));
          });
        MolService.getSpecies(nextSpeciesName)
          .then((results) => {
            setNextImage(results[0].image ? results[0].image.url : getPlaceholderSpeciesImage(results[0].taxa));
          });

      } else if (speciesToDisplay.length === 2) {
        let previousSpeciesName, nextSpeciesName;

        if (selectedSpeciesIndex === 0) {
          nextSpeciesName = speciesToDisplay[1].name;
        } else if (selectedSpeciesIndex === 1) {
          nextSpeciesName = speciesToDisplay[0].name;
        }

        MolService.getSpecies(nextSpeciesName)
          .then((results) => {
            setNextImage(results[0].image ? results[0].image.url : getPlaceholderSpeciesImage(results[0].taxa));
          });
        setPreviousImage(null);
      } else {
        setPreviousImage(null);
        setNextImage(null);
      }

      MolService.getSpecies(selectedSpecies.name).then((results) => {
        if (results.length > 0) {
          setIndividualSpeciesData({
            ...selectedSpecies,
            commonname: results[0].commonname,
            imageUrl: results[0].image ? results[0].image.url : getPlaceholderSpeciesImage(results[0].taxa),
            iucnCategory: IUCN_CATEGORIES[results[0].redlist],
            molLink: `https://mol.org/species/${selectedSpecies.name}`
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
  }, [individualSpeciesData]);

  return (
    <Component
      speciesFilters={speciesFilters}
      placeholderText={placeholderText}
      individualSpeciesData={individualSpeciesData}
      speciesToDisplay={speciesToDisplay}
      setSpeciesFilter={setSpeciesFilter}
      selectedSpeciesFilter={selectedSpeciesFilter}
      previousImage={previousImage}
      nextImage={nextImage}
      imageBackgroundPosition={imageBackgroundPosition}
      handleNextSpeciesSelection={handleNextSpeciesSelection}
      handlePreviousSpeciesSelection={handlePreviousSpeciesSelection}
      showCarouselArrows={showCarouselArrows}
      {...props}
    />
  )
}

export default SpeciesCardContainer;
