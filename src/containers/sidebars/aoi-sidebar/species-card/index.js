import React, { useEffect, useState, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import { getPlaceholderSpeciesImage, getPlaceholderSpeciesText } from 'utils/analyze-areas-utils';

import orderBy from 'lodash/orderBy';

// constants
import MolService from 'services/mol';

import { getSpeciesFilters } from 'constants/analyze-areas-constants';
import { getIUCNList } from 'constants/iucn-list';

import DEFAULT_PLACEHOLDER_IMAGE from 'images/no-bird.png';

// utils
// services

// component
import Component from './component';

const SEARCH_RESULTS_SLUG = 'search-results';

const {
  REACT_APP_FEATURE_NEW_MENUS,
} = process.env;

function SpeciesCardContainer(props) {
  const locale = useLocale();
  const t = useT();

  const speciesFiltersSource = useMemo(() => getSpeciesFilters(), [locale]);
  const iucnList = useMemo(() => getIUCNList(), [locale]);

  const { speciesData, contextualData } = props;
  const { species } = speciesData;

  const language = locale !== '' ? locale : 'en';

  // Species dropdown

  const DEFAULT_SPECIES_FILTER = { slug: 'all', label: t('all terrestrial vertebrates') };
  const [selectedSpeciesFilter, setSpeciesFilter] = useState(DEFAULT_SPECIES_FILTER);
  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(null);
  const [speciesFilters, setFilterWithCount] = useState(speciesFiltersSource);
  const [speciesToDisplay, setSpeciesToDisplay] = useState(species);
  const [speciesToDisplayBackUp, setSpeciesToDisplayBackUp] = useState(species);
  const [selectedSpecies, setSelectedSpecies] = useState(speciesToDisplay[selectedSpeciesIndex]);
  const [individualSpeciesData, setIndividualSpeciesData] = useState(null);
  // Carousel images
  const [previousImage, setPreviousImage] = useState(null);
  const [nextImage, setNextImage] = useState(null);
  // Search dropdown
  const [searchOptions, setSearchOptions] = useState([]);
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);

  const showCarouselArrows = speciesToDisplay.length > 1;

  const handleCloseSearch = () => {
    setSearchOptions([]);
    setSelectedSearchOption(null);
    setSpeciesToDisplay([...speciesToDisplayBackUp]);
  };

  const handleSearchOptionSelected = (option) => {
    if (option.slug === SEARCH_RESULTS_SLUG) {
      const searchSpecies = speciesToDisplayBackUp
        .filter((elem) => searchOptions.findIndex((so) => (so.slug === elem.name)) >= 0);
      setSpeciesToDisplay([...searchSpecies]);
    } else {
      const index = speciesToDisplayBackUp.findIndex((elem) => elem.name === option.slug);
      setSpeciesToDisplay([speciesToDisplayBackUp[index]]);
    }
    setSelectedSpeciesIndex(0);
    setSelectedSearchOption(option);
  };

  const handleSpeciesSearch = (value) => {
    const results = speciesToDisplay
      .filter((_species) => {
        const nameFound = _species.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        let commonNameFound = false;
        if (_species.commonName) {
          commonNameFound = _species.commonName.findIndex(
            (cnValue) => cnValue.toLowerCase().indexOf(value.toLowerCase()) >= 0,
          ) >= 0;
        }
        return nameFound || commonNameFound;
      })
      .map((elem) => ({
        label: elem.name,
        slug: elem.name,
      }));
    // Remove duplicates
    const tempSet = new Set(results);
    const resultsSorted = Array.from(tempSet).sort((a, b) => {
      if (a.slug < b.slug) return -1;
      if (a.slug > b.slug) return 1;
      return 0;
    });

    if (resultsSorted.length > 0) {
      const summaryOption = { slug: SEARCH_RESULTS_SLUG, label: `${value} (${resultsSorted.length})` };
      setSearchOptions([summaryOption, ...resultsSorted]);
    } else {
      setSearchOptions([]);
    }
  };

  const handleNextSpeciesSelection = () => {
    if (selectedSpeciesIndex === speciesToDisplay.length - 1) {
      setSelectedSpeciesIndex(0);
    } else {
      setSelectedSpeciesIndex(selectedSpeciesIndex + 1);
    }
  };

  const handlePreviousSpeciesSelection = () => {
    if (selectedSpeciesIndex === 0) {
      setSelectedSpeciesIndex(
        selectedSpeciesIndex === 0 ? speciesToDisplay.length - 1 : selectedSpeciesIndex - 1,
      );
    }
  };

  useEffect(() => {
    if (selectedSearchOption === null && searchOptions && searchOptions.length > 0) {
      handleSearchOptionSelected(searchOptions[0]);
    }
  }, [searchOptions]);

  useEffect(() => {
    const filters = speciesFiltersSource.map((filter) => {
      const speciesName = filter && filter.slug.split('_')[0];
      const allSpeciesCount = REACT_APP_FEATURE_NEW_MENUS
        ? contextualData.speciesNumbers && contextualData.speciesNumbers.nspecies
        : species && species.length;
      const taxaSpeciesCount = REACT_APP_FEATURE_NEW_MENUS
        ? contextualData.speciesNumbers && contextualData.speciesNumbers[speciesName]
        : species && species.filter((sp) => sp.category === filter.slug).length;
      switch (filter.slug) {
        case 'all':
          return { slug: filter.slug, label: `${filter.label} (${allSpeciesCount})` };
        default: {
          return { slug: filter.slug, label: `${filter.label} (${taxaSpeciesCount})` };
        }
      }
    });

    setFilterWithCount(filters);
    // Update species count in selected filter
    setSpeciesFilter(filters.find((f) => f.slug === selectedSpeciesFilter.slug));
  }, [speciesData.species, locale]);

  useEffect(() => {
    const sortSpecies = (s) => orderBy(s, ['has_image', 'presenceInArea', 'conservationConcern'], ['desc', 'desc', 'desc']);
    const speciesSorted = speciesData.species && sortSpecies(
      (selectedSpeciesFilter.slug === 'all')
        ? [...speciesData.species]
        : [...speciesData.species.filter((sp) => sp.category === selectedSpeciesFilter.slug)],
    );

    if (speciesSorted) {
      setSpeciesToDisplay(speciesSorted);
      setSpeciesToDisplayBackUp([...speciesSorted]);
    }
  }, [speciesData.species, selectedSpeciesFilter]);

  useEffect(() => {
    setSelectedSpecies(speciesToDisplay[selectedSpeciesIndex]);
  }, [speciesToDisplay, selectedSpeciesIndex]);

  useEffect(() => {
    setSelectedSpeciesIndex(0);
  }, [selectedSpeciesFilter]);

  // Get individual species info and image for slider
  useEffect(() => {
    if (selectedSpecies) {
      if (speciesToDisplay.length >= 3) {
        let previousSpeciesName; let
          nextSpeciesName;

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

        MolService.getSpecies(previousSpeciesName, language)
          .then((results) => {
            if (results.length > 0) {
              setPreviousImage(
                results[0].image
                  ? results[0].image.url
                  : getPlaceholderSpeciesImage(results[0].taxa),
              );
            } else {
              setPreviousImage(DEFAULT_PLACEHOLDER_IMAGE);
            }
          });
        MolService.getSpecies(nextSpeciesName, language)
          .then((results) => {
            if (results.length > 0) {
              setNextImage(results[0].image
                ? results[0].image.url
                : getPlaceholderSpeciesImage(results[0].taxa));
            } else {
              setNextImage(DEFAULT_PLACEHOLDER_IMAGE);
            }
          });
      } else if (speciesToDisplay.length === 2) {
        let nextSpeciesName;

        if (selectedSpeciesIndex === 0) {
          nextSpeciesName = speciesToDisplay[1].name;
        } else if (selectedSpeciesIndex === 1) {
          nextSpeciesName = speciesToDisplay[0].name;
        }

        MolService.getSpecies(nextSpeciesName, language)
          .then((results) => {
            if (results.length > 0) {
              setNextImage(
                results[0].image
                  ? results[0].image.url
                  : getPlaceholderSpeciesImage(results[0].taxa),
              );
            } else {
              setNextImage(DEFAULT_PLACEHOLDER_IMAGE);
            }
          });
        setPreviousImage(null);
      } else {
        setPreviousImage(null);
        setNextImage(null);
      }

      MolService.getSpecies(selectedSpecies.name, language).then((results) => {
        if (results.length > 0) {
          setIndividualSpeciesData({
            ...selectedSpecies,
            commonname: results[0].commonname,
            imageUrl: results[0].image
              ? results[0].image.url
              : getPlaceholderSpeciesImage(results[0].taxa),
            iucnCategory: iucnList[results[0].redlist],
            molLink: `https://mol.org/species/${selectedSpecies.name}`,
          });
          if (results[0].image) {
            setPlaceholderText(null);
          } else {
            setPlaceholderText(getPlaceholderSpeciesText(results[0].taxa));
          }
        } else {
          handleNextSpeciesSelection();
        }
      });
    }
  }, [selectedSpecies, locale]);

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
      handleNextSpeciesSelection={handleNextSpeciesSelection}
      handlePreviousSpeciesSelection={handlePreviousSpeciesSelection}
      showCarouselArrows={showCarouselArrows}
      searchOptions={searchOptions}
      selectedSearchOption={selectedSearchOption}
      setSearchOptions={setSelectedSearchOption}
      handleSpeciesSearch={handleSpeciesSearch}
      handleSearchOptionSelected={handleSearchOptionSelected}
      handleCloseSearch={handleCloseSearch}
      {...props}
    />
  );
}

export default SpeciesCardContainer;
