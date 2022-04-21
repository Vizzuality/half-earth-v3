import React from 'react';
import DonutChart from 'components/charts/donut-chart';
import styles from './country-data-card-styles.module.scss';
import { ReactComponent as BulbIcon } from 'icons/bulb.svg';

const CountryDataCardComponent = ({
  SPI,
  indexStatement,
  vertebratesCount,
  handleInfoClick,
  // countryData,
  currentProtection,
  countryDescription,
  endemicVertebratesCount
}) => {
  return (
    <div className={styles.container}>
      <section className={styles.indexOverview}>
        <div className={styles.overviewTextWrapper}>
          <button onClick={handleInfoClick} className={styles.overviewText}>
            The national species protection index:
          </button>
        </div>
        <div className={styles.indexWrapper}>
          <div className={styles.indexBar}>
            <div className={styles.progressMark} style={{ left: `${SPI}%` }} />
            <div
              className={styles.improvementArea}
              style={{ left: `${SPI}%`, width: `${100 - SPI}%` }}
            />
          </div>
          <div className={styles.index}>{`${SPI}`}</div>
        </div>
        <p className={styles.indexStatement}>{indexStatement}</p>
      </section>
      <section className={styles.indexWidget}>
        <div className={styles.indexExplanation}>
          <p className={styles.indexExplanationText}>National Species Protection Index</p>
          <div className={styles.donutContainer}>

            <DonutChart
              chartXPosition={45}
              chartYPosition={55}
              colors={["#E9E9E9", "#A24033"]}
              data={[
                { name: "Group A", value: 400 },
                { name: "Group B", value: 300 }
              ]}
              height={130}
              innerRadius={'75%'}
              legendXPosition={50}
              legendYPosition={50}
              outerRadius={'90%'}
              width={120}
            />
            <div>
              <p className={styles.hintText}>
                The Land SPI is calculated based on the <b>protected land ({currentProtection}%),</b>
                the <b>total of vertebrate species ({vertebratesCount})</b> and the amount of which
                of these are <b>endemic ({endemicVertebratesCount}).</b>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.hint}>
          <BulbIcon />
          <p className={styles.hintTitle}>Why only land vertebrates?</p>
          <p className={styles.hintText}>
            Terrestrial vertebrates represent the species groups with the most
            comprehensive coverage of distribution data. The Half-Earth Project
            is actively engaging in research to expand coverage of other
            taxonomic groups.
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