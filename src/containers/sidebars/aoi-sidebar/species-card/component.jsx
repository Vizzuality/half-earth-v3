import React from 'react';

// components
import SpeciesBar from 'components/charts/species-bar';
import Dropdown from 'components/dropdown';

// containers
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

// utils
import { roundRangeInArea, roundGlobalRange } from 'utils/data-formatting-utils';

// constants
import { SIDEBAR_CARDS_CONFIG, SPECIES_SLUG } from 'constants/analyze-areas-constants';

// icons
import { ReactComponent as ArrowIconRight } from 'icons/arrow_right.svg';
import { ReactComponent as ArrowIconLeft } from 'icons/arrow_left.svg';
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

// styles
import styles from './styles.module.scss';

const Component = ({
  area,
  speciesData,
  speciesFilters,
  placeholderText,
  setSpeciesFilter,
  selectedSpeciesFilter,
  individualSpeciesData,
  handleNextSpeciesSelection,
  handlePreviousSpeciesSelection,
  previousImage,
  nextImage,
  showCarouselArrows,
  handleSpeciesSearch,
  handleSearchOptionSelected,
  handleCloseSearch,
  selectedSearchOption,
  searchOptions,
}) => speciesData.species.length === 0 ? (
  <section className={styles.loaderCard}>
    <div className={styles.loaderBarContainer}>
      <div className={styles.loaderBarPercentage} />
    </div>
    <div className={styles.loaderTextContainer}>
      <p>
        Looking for species to watch here...
      </p>
      <p>
        This could take up to 30 seconds.
      </p>
    </div>
  </section>
) : (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>
          {SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].title(speciesData.species.length)}
          <span
            className={styles.infoClue}
            title={SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].hint}
          >
            terrestrial vertebrates
          </span>
        </p>
        <Dropdown
          stacked
          width="full"
          parentWidth="322px"
          options={speciesFilters}
          selectedOption={selectedSpeciesFilter}
          handleOptionSelection={setSpeciesFilter}
        />
        {/* Search dropdown */}
        <Dropdown
          searchMode
          stacked
          width="full"
          parentWidth="322px"
          placeholderText="SEARCH SPECIES"
          onSearch={handleSpeciesSearch}
          options={searchOptions}
          selectedOption={selectedSearchOption}
          handleOptionSelection={handleSearchOptionSelected}
          handleCloseSearch={handleCloseSearch}
        />
        {individualSpeciesData &&
          <section className={styles.speciesDataContainer}>
            <div>
              <div className={styles.speciesCarousel}>
                {previousImage && (
                  <div
                    className={`${styles.previousSpeciesImageWrapper} ${styles.speciesImageWrapper}`}
                    onClick={handlePreviousSpeciesSelection}
                    style={{
                      backgroundImage: `url(${previousImage})`,
                    }}
                  />
                )}
                <div
                  className={`${styles.selectedSpeciesImageWrapper} ${styles.speciesImageWrapper}`}
                  style={{
                    backgroundImage: `url(${individualSpeciesData.imageUrl})`,
                  }}
                >
                  {placeholderText && <span className={styles.placeholderText}>{placeholderText}</span>}
                </div>
                {nextImage && (
                  <div
                    className={`${styles.nextSpeciesImageWrapper} ${styles.speciesImageWrapper}`}
                    onClick={handleNextSpeciesSelection}
                    style={{
                      backgroundImage: `url(${nextImage})`,
                    }}
                  />
                )}
              </div>
              <div className={styles.sliderControls}>
                {showCarouselArrows && (
                  <div className={styles.arrow_icon_container}>
                    <ArrowIconLeft className={styles.arrow_icon} onClick={handlePreviousSpeciesSelection} />
                  </div>
                )}
                <div className={styles.speciesNames}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.commonName}
                    href={individualSpeciesData.molLink}
                  >
                    {individualSpeciesData.commonname}
                  </a>
                  <span className={styles.scientificName}>{individualSpeciesData.name}  </span>
                </div>
                {showCarouselArrows && (
                  <div className={styles.arrow_icon_container}>
                    <ArrowIconRight className={styles.arrow_icon} onClick={handleNextSpeciesSelection} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.globalRangeArea}>
              <span>Global habitat-suitable range</span>
              <p>{`${roundGlobalRange(individualSpeciesData.globaldRangeArea)} km`}<sup>2</sup></p>
            </div>
            <SpeciesBar
              title="Portion of global range under protection"
              className={styles.speciesBarContainer}
              percentage={individualSpeciesData.globalProtectedPercentage}
              barAnnotation={individualSpeciesData.protectionTarget}
              barAnnotationTitle="Protection target"
            />
            <SpeciesBar
              scale="local"
              title="Portion of global range in this area"
              className={styles.speciesBarContainer}
              percentage={individualSpeciesData.presenceInArea}
              percentageLabel={roundRangeInArea(individualSpeciesData.presenceInArea)}
            />
            <p className={styles.iucnStatus}>{`IUCN status: ${individualSpeciesData.iucnCategory}`}</p>
          </section>
        }
      </div>
      {area && area < 1000 &&
        <div className={styles.warningContainer}>
          <WarningIcon className={styles.icon} />
          <span >{SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].warning}</span>
        </div>
      }
    </SidebarCardWrapper>
  );

export default Component;
