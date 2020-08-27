import React from 'react';
import cx from 'classnames';
import styles from './country-data-card-styles.module.scss';
import { ReactComponent as BulbIcon } from 'icons/bulb.svg';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';

const CountryDataCardComponent = ({
  SPI,
  countryISO,
  countryName,
  indexStatement,
  vertebratesCount,
  handleInfoClick,
  currentProtection,
  countryDescription,
  endemicVertebratesCount
}) => {
  return (
    <div className={styles.container}>

      <section className={styles.indexOverview}>
        <div className={styles.nameWrapper}>
          <img className={styles.flag} src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`} alt="" />
          <p className={styles.countryName}>{countryName}</p>
        </div>
        <div className={styles.overviewTextWrapper}>
          <button onClick={handleInfoClick}>
            <QuestionIcon />
          </button>
          <p className={styles.overviewText}>The national species protection index is:</p>
        </div>
        <div className={styles.indexWrapper}>
          <div className={styles.indexBar}>
            <div className={styles.progressMark} style={{left: `${SPI}%`}}/>
            <div className={styles.improvementArea} style={{left: `${SPI}%`, width: `${100 - SPI}%`}}/>
          </div>
          <div className={styles.index}>{`${SPI}`}</div>
        </div>
        <p className={styles.indexStatement}>{indexStatement}</p>
      </section>
      <section className={styles.indexWidget}>
        <div className={styles.indexExplanation}>
          <p className={styles.indexExplanationText}>This index is based on:</p>
          <div className={styles.indexBaseNumbersWrapper}>
            <div className={cx(styles.indexBaseDataElement, styles.protectionNumber)}>
              <p className={styles.baseNumber}>{`${currentProtection}`}</p>
              <p className={styles.numberText}>% of land</p>
              <p className={styles.numberText}>currently</p>
              <p className={styles.numberText}>protected</p>
            </div>
            <div className={styles.indexBaseDataElement}>
              <p className={styles.baseNumber}>{`${vertebratesCount}`}</p>
              <p className={styles.numberText}>total land</p>
              <p className={styles.numberText}>vertebrate</p>
              <p className={styles.numberText}>species</p>
            </div>
            <div className={styles.indexBaseDataElement}>
              <p className={styles.baseNumber}>{`${endemicVertebratesCount}`}</p>
              <p className={styles.numberText}>endemic land</p>
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
  );
}

export default CountryDataCardComponent;