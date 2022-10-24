import React, { useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import {
  roundRangeInArea,
  roundGlobalRange,
} from 'utils/data-formatting-utils';

import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

import SpeciesBar from 'components/charts/species-bar';
import Dropdown from 'components/dropdown';

import {
  getSidebarCardsConfig,
  SPECIES_SLUG,
} from 'constants/analyze-areas-constants';

import styles from './styles.module.scss';

import { ReactComponent as ArrowIconLeft } from 'icons/arrow_left.svg';
import { ReactComponent as ArrowIconRight } from 'icons/arrow_right.svg';
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

const capPercentage = (percentage) => (percentage > 100 ? 100 : percentage);

function Component({
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
  contextualData,
}) {
  const { speciesNumbers } = contextualData;

  const t = useT();
  const locale = useLocale();
  const sidebarCardsConfig = useMemo(
    () => getSidebarCardsConfig(locale),
    [locale]
  );
  if (!speciesData.species) return null;

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
      {speciesNumbers && speciesNumbers.nspecies && (
        <div>
          <p className={styles.title}>
            {sidebarCardsConfig[SPECIES_SLUG].title(
              speciesNumbers && speciesNumbers.nspecies
            )}
            <span
              className={styles.infoClue}
              title={sidebarCardsConfig[SPECIES_SLUG].hint}
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
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/control-has-associated-label
                    <div
                      role="button"
                      tabIndex={0}
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
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events
                    <div
                      role="button"
                      tabIndex={0}
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
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events
                    <div
                      role="button"
                      tabIndex={0}
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
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events
                    <div
                      role="button"
                      tabIndex={0}
                      className={styles.arrow_icon_container}
                      onClick={handleNextSpeciesSelection}
                    >
                      <ArrowIconRight className={styles.arrow_icon} />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.globalRangeArea}>
                <span>
                  {t(
                    'Area of habitat-suitable range for this species available globally'
                  )}
                </span>
                <p>
                  {`${roundGlobalRange(
                    individualSpeciesData.globaldRangeArea,
                    locale,
                    t
                  )}${t(' km')}`}
                  <sup>2</sup>
                </p>
              </div>
              <SpeciesBar
                title={t('Portion of global range under protection')}
                className={styles.speciesBarContainer}
                percentage={individualSpeciesData.globalProtectedPercentage}
                barAnnotation={individualSpeciesData.protectionTarget}
                barAnnotationTitle={t('Protection target')}
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
              <p className={styles.iucnStatus}>
                {`${t('IUCN status')}: ${individualSpeciesData.iucnCategory}`}
              </p>
            </section>
          )}
        </div>
      )}
      {area && area < 1000 && (
        <div className={styles.warningContainer}>
          <WarningIcon className={styles.icon} />
          <span>{sidebarCardsConfig[SPECIES_SLUG].warning}</span>
        </div>
      )}
    </SidebarCardWrapper>
  );
}

export default Component;
