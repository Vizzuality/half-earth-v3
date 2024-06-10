import React, { useMemo, useState } from 'react';

import { t as tNative } from '@transifex/native';
import { useT, useLocale } from '@transifex/react';

import { roundGlobalRange } from 'utils/data-formatting-utils';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import SpeciesAnalysisModal from 'containers/modals/species-analysis-modal';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

import Button from 'components/button';
import SpeciesBar from 'components/charts/species-bar';
import Dropdown from 'components/dropdown';
import TitleTooltip from 'components/title-tooltip';

import {
  getSidebarCardsConfig,
  SPECIES_SLUG,
} from 'constants/analyze-areas-constants';

import styles from './styles.module.scss';

import { ReactComponent as ArrowIconLeft } from 'icons/arrow_left.svg';
import { ReactComponent as ArrowIconRight } from 'icons/arrow_right.svg';
import { ReactComponent as InfoIcon } from 'icons/infoTooltip.svg';
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

const capPercentage = (percentage) => (percentage > 100 ? 100 : percentage);

function Component(props) {
  const {
    area,
    speciesData,
    speciesFilters,
    placeholderText,
    setSpeciesFilter,
    selectedSpeciesFilter,
    individualSpeciesData,
    handleNextSpeciesSelection,
    setSpecieById,
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
    insideModal,
  } = props;
  const { speciesNumbers } = contextualData;
  const [isDetailedAnalysisModalOpen, handleDetailedAnalysisModalToggle] =
    useState(false);
  const t = useT();
  const locale = useLocale();
  const sidebarCardsConfig = useMemo(
    () => getSidebarCardsConfig(locale),
    [locale]
  );

  if (!speciesData.species) return null;
  return speciesData.species.length === 0 ? (
    <section className={styles.loaderCard}>
      <div className={styles.loaderBarContainer}>
        <div className={styles.loaderBarPercentage} />
      </div>
      <div className={styles.loaderTextContainer}>
        <p>{t('Looking for species to watch here...')}</p>
        <p>{t('This could take some minutes.')}</p>
      </div>
    </section>
  ) : (
    <SidebarCardWrapper
      className={cx(styles.cardWrapper, { [styles.insideModal]: insideModal })}
    >
      {(speciesNumbers || contextualData.isCustom) && (
        <div>
          {!insideModal && (
            <p className={styles.title}>
              {sidebarCardsConfig[SPECIES_SLUG].title(
                (speciesNumbers && speciesNumbers.nspecies) ||
                  speciesData.species.length
              )}{' '}
              <TitleTooltip content={sidebarCardsConfig[SPECIES_SLUG].hint}>
                <span className={styles.infoClue}>
                  {t('terrestrial vertebrates')}
                </span>
              </TitleTooltip>
            </p>
          )}
          <Dropdown
            stacked
            width="full"
            parentWidth="322px"
            options={speciesFilters}
            selectedOption={selectedSpeciesFilter}
            handleOptionSelection={setSpeciesFilter}
            theme={insideModal && 'dark'}
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
            theme={insideModal && 'dark'}
          />
          {individualSpeciesData && (
            <section>
              <div className={styles.speciesDataContainer}>
                <div className={styles.speciesCarousel}>
                  {previousImage && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/control-has-associated-label
                    <div
                      role="button"
                      tabIndex={0}
                      className={`${styles.previousSpeciesImageWrapper} ${styles.speciesImageWrapper}`}
                      onClick={handlePreviousSpeciesSelection}
                      aria-label={tNative('Go to previous species')}
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
                      aria-label={tNative('Go to next species')}
                      style={{
                        backgroundImage: `url(${nextImage})`,
                      }}
                    />
                  )}
                </div>
                <div className={styles.sliderControls}>
                  {showCarouselArrows && (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events
                    <div
                      role="button"
                      aria-label="Previous species"
                      tabIndex={0}
                      className={styles.arrow_icon_container}
                      onClick={handlePreviousSpeciesSelection}
                    >
                      <ArrowIconLeft className={styles.arrow_icon} />
                    </div>
                  )}
                  <div className={styles.speciesNames}>
                    <span className={styles.scientificName}>
                      {individualSpeciesData.commonname ||
                        individualSpeciesData.name}
                    </span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.commonName}
                      href={individualSpeciesData.molLink}
                    >
                      {individualSpeciesData.name}{' '}
                    </a>
                  </div>
                  {showCarouselArrows && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      role="button"
                      aria-label="Next species"
                      tabIndex={0}
                      className={styles.arrow_icon_container}
                      onClick={handleNextSpeciesSelection}
                    >
                      <ArrowIconRight className={styles.arrow_icon} />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.speciesDataContainer}>
                <div className={styles.sectionContainer}>
                  <div className={styles.sectionTitleWrapper}>
                    <p>{t('Global habitat-suitable range')}</p>
                    <span className={styles.iconWrapper}>
                      <Tooltip
                        className="light"
                        content={
                          <div className={styles.tooltip}>
                            {t(
                              'This is the estimated size of the species global range taking into account habitat preferences and the latest land cover layers'
                            )}
                          </div>
                        }
                        delay={100}
                        position="bottom"
                      >
                        <InfoIcon className={styles.icon} />
                      </Tooltip>
                    </span>
                  </div>

                  <div>
                    {`${roundGlobalRange(
                      individualSpeciesData.globaldRangeArea,
                      locale,
                      t
                    )}${t(' km')}`}
                    <sup>2</sup>
                  </div>
                </div>

                <SpeciesBar
                  title={t('Portion of global range protected')}
                  className={styles.speciesBarContainer}
                  percentage={individualSpeciesData.globalProtectedPercentage}
                  barAnnotation={individualSpeciesData.protectionTarget}
                  theme={insideModal && 'dark'}
                  tooltipContent={t(
                    'This is the percentage of the habitat-suitable range that is under some form of protection for conservation purposes.  The vertical line is the species conservation target.'
                  )}
                />
                <SpeciesBar
                  title={t('Portion of global range in this area')}
                  className={styles.speciesBarContainer}
                  percentage={capPercentage(individualSpeciesData.per_global)}
                  theme={insideModal && 'dark'}
                  tooltipContent={t(
                    'This is the percentage of this species global habitat-suitable range found in this Area of Interest. A high percentage means that this species is unique to this area and not found in many other places.'
                  )}
                />

                <div className={styles.sectionContainer}>
                  <div className={styles.sectionTitleWrapper}>
                    <p>{t('Global SPS | Area SPS')}</p>
                    <span className={styles.iconWrapper}>
                      <Tooltip
                        className="light"
                        content={
                          <div className={styles.tooltip}>
                            {t(
                              'The Species Protection Score (SPS) indicates how adequately this species range is covered by protected areas. A conservation target or amount of protection needed is given for each species based on its global range size. The Area SPS is a percentage of the Global SPS proportional to the size of the Area of Interest and the species range within it. The SPS ranges from 0-100.'
                            )}
                          </div>
                        }
                        delay={100}
                        position="bottom"
                      >
                        <InfoIcon className={styles.icon} />
                      </Tooltip>
                    </span>
                  </div>
                  <div>
                    {' '}
                    {individualSpeciesData.SPS_global} |{' '}
                    {individualSpeciesData.SPS_AOI}
                  </div>
                </div>

                <div className={styles.sectionContainer}>
                  <div className={styles.sectionTitleWrapper}>
                    <p>{t('Global Red List status')}</p>
                    <span className={styles.iconWrapper}>
                      <Tooltip
                        className="light"
                        content={
                          <div className={styles.tooltip}>
                            {t(
                              'The IUCN Red List Categories and Criteria are intended to be an easily and widely understood system for classifying species at high risk of global extinction. It divides species into nine categories:  Not Evaluated, Data Deficient, Least Concern, Near Threatened, Vulnerable, Endangered, Critically Endangered, Extinct in the Wild and Extinct.'
                            )}
                          </div>
                        }
                        delay={100}
                        position="bottom"
                      >
                        <InfoIcon className={styles.icon} />
                      </Tooltip>
                    </span>
                  </div>
                  <div>{individualSpeciesData.iucnCategory}</div>
                </div>
              </div>

              {!insideModal && (
                <div>
                  <Button
                    type="rectangular-secondary"
                    handleClick={() => handleDetailedAnalysisModalToggle(true)}
                    label={t('DETAILED ANALYSIS')}
                  />
                  <SpeciesAnalysisModal
                    isOpen={isDetailedAnalysisModalOpen}
                    handleModalClose={() =>
                      handleDetailedAnalysisModalToggle(false)
                    }
                    contextualData={contextualData}
                    cardProps={props}
                    speciesData={speciesData && speciesData.species}
                    setSpecieById={setSpecieById}
                    selectedSpeciesFilter={selectedSpeciesFilter}
                  />
                </div>
              )}
            </section>
          )}
        </div>
      )}
      {area && area < 1000 && !insideModal && (
        <div className={styles.warningContainer}>
          <WarningIcon className={styles.icon} />
          <span>{sidebarCardsConfig[SPECIES_SLUG].warning}</span>
        </div>
      )}
    </SidebarCardWrapper>
  );
}

export default Component;
