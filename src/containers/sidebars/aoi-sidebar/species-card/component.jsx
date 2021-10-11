import React from 'react';
import cx from 'classnames';
import { localeFormatting } from 'utils/data-formatting-utils';
import SpeciesModal from 'components/species-modal';
import SpeciesBar from 'components/charts/species-bar';
import SourceAnnotation from 'components/source-annotation';
import Dropdown from 'components/dropdown';
import SearchWithSuggestions from 'components/search-with-suggestions';
import SearchInput from 'components/search-input';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import {ReactComponent as ArrowLeftIcon} from 'icons/arrow_right.svg'
import {ReactComponent as ArrowRightIcon} from 'icons/arrow_right.svg'

import styles from './styles.module.scss';

const Component = ({
  cardTitle,
  searchTerm,
  speciesData,
  selectedSpecies,
  speciesFilters,
  placeholderText,
  setSpeciesFilter,
  loadedPercentage,
  speciesToDisplay,
  handleSearchChange,
  selectedSpeciesFilter,
  individualSpeciesData,
  imageBackgroundPosition,
  handleNextSpeciesSelection,
  handlePreviousSpeciesSelection
}) => speciesData.species.length === 0 ? (
<section className={styles.loaderCard}>
  <p className={styles.loadedPercentage}>{`${loadedPercentage}%`}</p>
  <div className={styles.loaderBarContainer}>
    <div className={styles.loaderBarPercentage} style={{width: `${loadedPercentage}%`}}/>
  </div>
  <div className={styles.loaderTextContainer}>
    <p>
      Looking for species to watch here...
    </p>
    <p>
      This could take up to 20 seconds.
    </p>
  </div>
</section>
  ) : (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>
          {`This area is likely to have ${speciesData.species.length} `}
          <span
            className={styles.infoClue}
            title="explanation about why only vertebrates"
          >
            vertebrate species
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
        {/* <SearchWithSuggestions
          stacked
          theme={'light'}
          width="full"
          parentWidth="322px"
          options={speciesToDisplay}
          onOptionSelection={(option) => console.log(option)}
        /> */}
        {individualSpeciesData &&
          <section className={styles.speciesDataContainer}>
            <div>
              <div
                className={styles.speciesImageWrapper}
                style={{
                  backgroundImage: `url(${individualSpeciesData.imageUrl})`,
                  backgroundPosition: imageBackgroundPosition
                }}
              >
                {placeholderText && <span className={styles.placeholderText}>{placeholderText}</span>}
              </div>
              <div className={styles.sliderControls}>
                <ArrowRightIcon className={cx(styles.icon, styles.rotateLeft)} onClick={handlePreviousSpeciesSelection}/>
                <div className={styles.speciesNames}>
                <span className={styles.commonName}>{individualSpeciesData.commonname}</span>
                <span className={styles.scientificName}>{individualSpeciesData.name}  </span>
                </div>
                <ArrowRightIcon className={styles.icon} onClick={handleNextSpeciesSelection}/>
              </div>
            </div>
            <div className={styles.globalRangeArea}>
              <span>Global range area</span>
              <p>{`${localeFormatting(individualSpeciesData.globaldRangeArea)} km`}<sup>2</sup></p>
            </div>
            <SpeciesBar
              scale="local"
              title="Range in this area" 
              className={styles.speciesBarContainer}
              percentage={individualSpeciesData.presenceInArea}
            />
            <SpeciesBar
              title="Global protected range" 
              className={styles.speciesBarContainer}
              percentage={individualSpeciesData.globalProtectedPercentage}
              barAnnotation={individualSpeciesData.protectionTarget}
              barAnnotationTitle="Protection target"
            />
            <p className={styles.iucnStatus}>{`IUCN status: ${individualSpeciesData.iucnCategory}`}</p>
          </section>
        }
      </div>
    </SidebarCardWrapper>
  );

export default Component;