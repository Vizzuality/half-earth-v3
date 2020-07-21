import React from 'react';
import { Loading } from 'he-components';
import styles from './country-data-card-styles.module.scss';
import { ReactComponent as BulbIcon } from 'icons/bulb.svg';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';
import { ReactComponent as BackIcon } from 'icons/arrow_expand.svg';

const CountryDataCardComponent = ({
  SPI,
  mean,
  countryName,
  countryData,
  indexStatement,
  vertebratesCount,
  protectionNeeded,
  currentProtection,
  countryDescription,
  countryDataLoading,
  handleSceneModeChange,
  endemicVertebratesCount
}) => {
  console.log(countryData, countryDataLoading)

  if (countryDataLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <span className={styles.loadingText}>{`Loading ${countryName} information...`}</span>
          <Loading />
        </div>
      </div>
    );
  }

  return countryData ? (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={handleSceneModeChange}
      >
        <BackIcon className={styles.icon}/>
        <span className={styles.text}>back to global</span>
      </button>

      <section className={styles.indexOverview}>
        <p className={styles.countryName}>{countryName}</p>
        <div className={styles.overviewTextWrapper}>
          <QuestionIcon />
          <p className={styles.overviewText}>The species protection index is:</p>
        </div>
        <div className={styles.indexWrapper}>
          <div className={styles.indexBar}>
            <div className={styles.meanMark} style={{left: `${mean}%`}}/>
            <div className={styles.progressMark} style={{left: `${SPI}%`}}/>
            <div className={styles.improvementArea} style={{left: `${SPI}%`, width: `${100 - SPI}%`}}/>
          </div>
          <div className={styles.index}>{`${SPI}`}</div>
        </div>
        <p className={styles.indexStatement}>{indexStatement}</p>
      </section>
      <section className={styles.indexWidget}>
        <div className={styles.indexExplanation}>
          <p className={styles.indexExplanationText}>The index is based on:</p>
          <div className={styles.indexBaseNumbersWrapper}>
            <div className={styles.indexBaseDataElement}>
              <p className={styles.baseNumber}>{`${currentProtection}`}</p>
              <p className={styles.numberText}>% of land</p>
              <p className={styles.numberText}>currently</p>
              <p className={styles.numberText}>protected</p>
            </div>
            <div className={styles.indexBaseDataElement}>
              <p className={styles.baseNumber}>{`${protectionNeeded}`}</p>
              <p className={styles.numberText}>% of</p>
              <p className={styles.numberText}>protection</p>
              <p className={styles.numberText}>needed</p>
            </div>
            <div className={styles.indexBaseDataElement}>
              <p className={styles.baseNumber}>{`${vertebratesCount}`}</p>
              <p className={styles.numberText}>land</p>
              <p className={styles.numberText}>vertebrate</p>
              <p className={styles.numberText}>species</p>
            </div>
            <div className={styles.indexBaseDataElement}>
              <p className={styles.baseNumber}>{`${endemicVertebratesCount}`}</p>
              <p className={styles.numberText}>endemic</p>
              <p className={styles.numberText}>vertebrated</p>
              <p className={styles.numberText}>species</p>
            </div>
          </div>
        </div>
        <div className={styles.hint}>
          <BulbIcon />
          <p className={styles.hintTitle}>Why only land vertebrates?</p>
          <p className={styles.hintText}>
            Terrestrial vertebrates represent the species groups with the most comprehensive coverage of distribution data. The Half-Earth Project is actively engaging in research to expand coverage of other taxonomic groups.
          </p>
        </div>
      </section>
      <section className={styles.descriptionWrapper}>
        <p>{`${countryDescription}`}</p>
      </section>
    </div>
  ) : null;
}

export default CountryDataCardComponent;