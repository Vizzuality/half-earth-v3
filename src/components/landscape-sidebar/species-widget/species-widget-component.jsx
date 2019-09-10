
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { ReactComponent as ArrowIcon } from 'icons/arrow_right.svg';
import speciesPlaceholder from 'images/speciesPlaceholder.svg';
import cx from 'classnames';

import styles from './species-widget-styles.module.scss';

const SpeciesChartDot = ({ species, selectedSpecies, handleSelectSpecies }) => {
  const isSelected = species.name === selectedSpecies.name;
  const { name, pointCoordinates, color } = species;
  return (
    <>
      <div 
        className={cx(styles.chartDot, { [styles.selectedChartDot]: isSelected })}
        style={{
          bottom: isSelected ? pointCoordinates.y - 5: pointCoordinates.y,
          left: isSelected ? pointCoordinates.x - 5: pointCoordinates.x,
          backgroundColor: !isSelected && color
        }}
        data-tip
        data-for={name}
        data-effect='solid'
        data-delay-show={0}
        onClick={() => handleSelectSpecies(species)}
      >
        <div 
          className={styles.selectedInnerChartDot}
          style={{ backgroundColor: isSelected && color }}
        />
      </div>
      <ReactTooltip id={name} className='infoTooltipStyle'>
        {name}
      </ReactTooltip>
    </>
  )
};

const SpeciesCarrousel = ({ selectedSpecies, handleSelectPrevSpecies, handleSelectNextSpecies }) => {
  const { imageURL, name, scientificName, proportion, rangeArea, color, iucnCategory } = selectedSpecies;

  return (
    <>
      <div className={styles.carrousel}>
        <button className={styles.carrouselButton} onClick={handleSelectPrevSpecies}><ArrowIcon /></button>
        <img className={styles.speciesImage} src={imageURL || speciesPlaceholder} alt={name}/>
        <button className={styles.carrouselButton}  onClick={handleSelectNextSpecies}><ArrowIcon /></button>
      </div>

      <div className={styles.speciesNameContainer}>
        <div className={cx(styles.selectedChartDot)}>
          <div className={styles.selectedInnerChartDot} style={{ backgroundColor: color }}></div>
        </div>
        <div>
          <div className={styles.speciesEngName}>{name}</div>
          <div className={styles.speciesLatName}>{scientificName}</div>
        </div>
      </div>
      <div className={styles.speciesDetails}>
        <div className={styles.speciesDetailsRow}>Global range area: {rangeArea} km<sup>2</sup></div>
        <div className={styles.speciesDetailsRow}>Global range protected: {proportion}</div>
        <div className={styles.speciesDetailsRow}>IUCN: {iucnCategory}</div>
      </div>
    </>
  )
};

const SpeciesWidgetComponent = ({ data, selectedSpecies, handleSelectSpecies, handleSelectNextSpecies, handleSelectPrevSpecies }) => {

  return (
    <>
      {data && selectedSpecies &&
        <div className={styles.container}>
          <h3 className={styles.title}>SPECIES TO WATCH HERE</h3>
          <p className={styles.text}>The radar plot below shows the proportion of species range protected from the available taxonomic groups.</p>
          <div className={styles.chart}>
            <div className={styles.chartSlice}></div>
            <div className={styles.chartSlice}>
              {data.map((species, index) => (
                <SpeciesChartDot
                  key={`dot-${index}`}
                  species={species}
                  selectedSpecies={selectedSpecies}
                  handleSelectSpecies={handleSelectSpecies}
                />
              ))}
            </div>
            <div className={styles.chartSlice}></div>
            <div className={styles.chartSlice}></div>
          </div>
          <SpeciesCarrousel
            selectedSpecies={selectedSpecies}
            handleSelectPrevSpecies={handleSelectPrevSpecies}
            handleSelectNextSpecies={handleSelectNextSpecies}
          />
          <a
            href='https://mol.org/'
            target="_blank"
            rel="noopener noreferrer"
            className={styles.molLogo}
          >
          </a>
        </div>
      }
    </>
  );
}

export default SpeciesWidgetComponent;