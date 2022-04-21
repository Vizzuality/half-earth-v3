import React from 'react';
import AreaChart from 'components/charts/area-chart';

import DonutChart from 'components/charts/donut-chart';
import styles from './country-data-card-styles.module.scss';
import { ReactComponent as BulbIcon } from 'icons/bulb.svg';

const CountryDataCardComponent = ({
  SPI,
  vertebratesCount,
  countryData,
  currentProtection,
  countryDescription,
  endemicVertebratesCount
}) => {
  const { prop_protected_mar, nspecies_mar, SPI_mar, total_endemic_mar } = countryData;
  return (
    <div className={styles.container}>
      <section className={styles.indexWidget}>
        <div className={styles.indexExplanation}>
          <p className={styles.indexExplanationText}>National Species Protection Index</p>
          <div className={styles.donutContainer}>
            <DonutChart
              chartXPosition={48}
              chartYPosition={60}
              colors={["#A24033", "#E9E9E9"]}
              data={[
                { name: "SPI Ter", value: SPI },
                { name: "Rest", value: 100 - SPI }
              ]}
              height={130}
              innerRadius={'80%'}
              legendXPosition={53}
              legendYPosition={58}
              legendValue={SPI}
              legendText='LAND SPI'
              outerRadius={'95%'}
              width={120}
            />
            <div>
              <p className={styles.legendText}>
                The Land SPI is calculated based on the <b>protected land ({currentProtection}%),</b>
                the <b>total of vertebrate species ({vertebratesCount})</b> and the amount of which
                of these are <b>endemic ({endemicVertebratesCount}).</b>
              </p>
            </div>
          </div>
          <div className={styles.donutContainer}>
            <DonutChart
              chartXPosition={48}
              chartYPosition={60}
              colors={["#FFC01C", "#E9E9E9"]}
              data={[
                { name: "SPI Marine", value: SPI_mar },
                { name: "Rest", value: 100 - SPI_mar }
              ]}
              height={130}
              innerRadius={'80%'}
              legendXPosition={53}
              legendYPosition={58}
              legendValue={SPI_mar}
              legendText='MARINE SPI'
              outerRadius={'95%'}
              width={120}
            />
            <div>
              <p className={styles.legendText}>
                The Marine SPI is based on the  <b>protected marine areas ({prop_protected_mar}%),</b>
                the <b>total of marine mammals and fishes ({nspecies_mar})</b> species and the
                amount of which of these are <b>endemic ({total_endemic_mar}).</b>
              </p>
            </div>
          </div>

          <AreaChart />

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