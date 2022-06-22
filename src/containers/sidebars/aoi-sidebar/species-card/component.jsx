import React from 'react';

// components
import SpeciesBar from 'components/charts/species-bar';
import Dropdown from 'components/dropdown';
import { useT } from '@transifex/react';

// containers
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

// utils
import {
  roundRangeInArea,
  roundGlobalRange,
} from 'utils/data-formatting-utils';

// constants
import {
  SIDEBAR_CARDS_CONFIG,
  SPECIES_SLUG,
} from 'constants/analyze-areas-constants';

// icons
import { ReactComponent as ArrowIconRight } from 'icons/arrow_right.svg';
import { ReactComponent as ArrowIconLeft } from 'icons/arrow_left.svg';
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

// styles
import styles from './styles.module.scss';

const capPercentage = (percentage) => (percentage > 100 ? 100 : percentage);

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
}) => {
  const t = useT();

  return speciesData.species && speciesData.species.length === 0 ? (
    <section className={styles.loaderCard}>
      <div className={styles.loaderBarContainer}>
        <div className={styles.loaderBarPercentage} />
      </div>
      <div className={styles.loaderTextContainer}>
        <p>{t('Looking for species to watch here...')}</p>
        <p>{t('This could take up to 30 seconds.')}</p>
      </div>
    </section>
  ) : (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>
          {SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].title(
            speciesData.species && speciesData.species.length
          )}
          <span
            className={styles.infoClue}
            title={SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].hint}
          >
            {t('land vertebrate species')}
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
          placeholderText={t('SEARCH SPECIES')}
          onSearch={handleSpeciesSearch}
          options={searchOptions}
          selectedOption={selectedSearchOption}
          handleOptionSelection={handleSearchOptionSelected}
          handleCloseSearch={handleCloseSearch}
        />
        {individualSpeciesData && (
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
                  {placeholderText && (
                    <span className={styles.placeholderText}>
                      {placeholderText}
                    </span>
                  )}
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
                  <div
                    className={styles.arrow_icon_container}
                    onClick={handlePreviousSpeciesSelection}
                  >
                    <ArrowIconLeft className={styles.arrow_icon} />
                  </div>
                )}
                <div className={styles.speciesNames}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.commonName}
                    href={individualSpeciesData.molLink}
                  >
                    {individualSpeciesData.commonname ||
                      individualSpeciesData.name}
                  </a>
                  <span className={styles.scientificName}>
                    {individualSpeciesData.name}{' '}
                  </span>
                </div>
                {showCarouselArrows && (
                  <div
                    className={styles.arrow_icon_container}
                    onClick={handleNextSpeciesSelection}
                  >
                    <ArrowIconRight className={styles.arrow_icon} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.globalRangeArea}>
              <span>Global habitat-suitable range</span>
              <p>
                {`${roundGlobalRange(
                  individualSpeciesData.globaldRangeArea
                )} km`}
                <sup>2</sup>
              </p>
            </div>
            <SpeciesBar
              title={t('Portion of global range under protection')}
              className={styles.speciesBarContainer}
              percentage={individualSpeciesData.globalProtectedPercentage}
              barAnnotation={individualSpeciesData.protectionTarget}
              barAnnotationTitle="Protection target"
            />
            <SpeciesBar
              scale="local"
              title={t('Portion of global range in this area')}
              className={styles.speciesBarContainer}
              percentage={capPercentage(individualSpeciesData.presenceInArea)}
              percentageLabel={roundRangeInArea(
                capPercentage(individualSpeciesData.presenceInArea)
              )}
            />
            <p className={styles.iucnStatus}>{`${t('IUCN status')}: ${
              individualSpeciesData.iucnCategory
            }`}</p>
          </section>
        )}
      </div>
      {area && area < 1000 && (
        <div className={styles.warningContainer}>
          <WarningIcon className={styles.icon} />
          <span>{SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].warning}</span>
        </div>
      )}
    </SidebarCardWrapper>
  );
};

export default Component;
