import React from 'react';
import cx from 'classnames';
import { localeFormatting, roundRangeInArea, roundGlobalRange } from 'utils/data-formatting-utils';
import SpeciesBar from 'components/charts/species-bar';
import Dropdown from 'components/dropdown';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import { SIDEBAR_CARDS_CONFIG, SPECIES_SLUG } from 'constants/analyze-areas-constants';
import { ReactComponent as ArrowRightIcon } from 'icons/arrow_right.svg'
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

import styles from './styles.module.scss';

const Component = ({
  area,
  speciesData,
  speciesFilters,
  placeholderText,
  setSpeciesFilter,
  selectedSpeciesFilter,
  individualSpeciesData,
  imageBackgroundPosition,
  handleNextSpeciesSelection,
  handlePreviousSpeciesSelection,
  previousImage,
  nextImage
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
        {individualSpeciesData &&
          <section className={styles.speciesDataContainer}>
            <div>
              <div className={styles.speciesCarousel}>
                <div
                  className={`${styles.previousSpeciesImageWrapper} ${styles.speciesImageWrapper}`}
                  onClick={handlePreviousSpeciesSelection}
                  style={{
                    backgroundImage: `url(${previousImage})`,
                  }}
                />
                <div
                  className={`${styles.selectedSpeciesImageWrapper} ${styles.speciesImageWrapper}`}
                  style={{
                    backgroundImage: `url(${individualSpeciesData.imageUrl})`,
                  }}
                >
                  {placeholderText && <span className={styles.placeholderText}>{placeholderText}</span>}
                </div>
                <div
                  className={`${styles.nextSpeciesImageWrapper} ${styles.speciesImageWrapper}`}
                  onClick={handleNextSpeciesSelection}
                  style={{
                    backgroundImage: `url(${nextImage})`,
                  }}
                />
              </div>
              <div className={styles.sliderControls}>
                <ArrowRightIcon className={cx(styles.icon, styles.rotateLeft)} onClick={handlePreviousSpeciesSelection} />
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
                <ArrowRightIcon className={styles.icon} onClick={handleNextSpeciesSelection} />
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
