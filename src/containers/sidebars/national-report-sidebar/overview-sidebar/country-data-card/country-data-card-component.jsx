import React, { useState } from 'react';
import cx from 'classnames';
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
  endemicVertebratesCount,
  handleInfoClick,
  indexStatement,
}) => {
  const [activeTab, setActiveTab] = useState('land');
  const { REACT_APP_FEATURE_MARINE } = process.env;
  const { prop_protected_mar, nspecies_mar, SPI_mar, total_endemic_mar } = countryData;
  const mockLandData = [
    {
      year: "1980",
      species: [40, 0],
      areas: [20, 10]
    },
    {
      year: "1985",
      species: [75, 10],
      areas: [30, 10]
    },
    {
      year: "1990",
      species: [50, 40],
      areas: [20, 10]
    },
    {
      year: "1995",
      species: [55, 50],
      areas: [20, 10]
    },
    {
      year: "2000",
      species: [45, 35],
      areas: [20, 20]
    },
    {
      year: "2005",
      species: [55, 35],
      areas: [40, 10]
    },
    {
      year: "2010",
      species: [70, 60],
      areas: [30, 10]
    },
    {
      year: "2015",
      species: [55, 55],
      areas: [60, 40]
    },
    {
      year: "2020",
      species: [100, 60],
      areas: [70, 50]
    }
  ];

  const mockMarineData = [
    {
      year: "1980",
      species: [20, 0],
      areas: [30, 20]
    },
    {
      year: "1985",
      species: [79, 50],
      areas: [40, 20]
    },
    {
      year: "1990",
      species: [50, 40],
      areas: [20, 10]
    },
    {
      year: "1995",
      species: [59, 51],
      areas: [25, 15]
    },
    {
      year: "2000",
      species: [65, 55],
      areas: [60, 50]
    },
    {
      year: "2005",
      species: [80, 65],
      areas: [40, 10]
    },
    {
      year: "2010",
      species: [70, 60],
      areas: [30, 10]
    },
    {
      year: "2015",
      species: [55, 55],
      areas: [60, 50]
    },
    {
      year: "2020",
      species: [70, 60],
      areas: [80, 50]
    }
  ];

  const tabsData = {
    "land": {
      text: "Land",
      data: mockLandData,
    },
    "marine": {
      text: "Marine",
      data: mockMarineData,
    },
  };

  return (
    <div className={styles.container}>
      {!REACT_APP_FEATURE_MARINE && (
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
      )}
      <section className={styles.indexWidget}>
        <div className={styles.indexExplanation}>
          <p className={styles.indexExplanationText}>{REACT_APP_FEATURE_MARINE ? 'National Species Protection Index' : 'This index is based on:'}</p>
          {!REACT_APP_FEATURE_MARINE && (
            <div className={styles.indexBaseNumbersWrapper}>
              <div
                className={cx(
                  styles.indexBaseDataElement,
                  styles.protectionNumber
                )}
              >
                <p className={styles.baseNumber}>{`${currentProtection}`}</p>
                <p className={styles.numberText}>% of land</p>
                <p className={styles.numberText}>currently protected</p>
              </div>
              <div className={styles.indexBaseDataElement}>
                <p className={styles.baseNumber}>{`${vertebratesCount}`}</p>
                <p className={styles.numberText}>total land</p>
                <p className={styles.numberText}>vertebrate species</p>
              </div>
              <div className={styles.indexBaseDataElement}>
                <p
                  className={styles.baseNumber}
                >{`${endemicVertebratesCount}`}</p>
                <p className={styles.numberText}>endemic land</p>
                <p className={styles.numberText}>vertebrate species</p>
              </div>
            </div>
          )}
          {REACT_APP_FEATURE_MARINE && (
            <>
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

              <div className={styles.switchAreaChart}>
                <p className={styles.switchAreaChartText}>Evolution of SPI</p>
                <div>
                  {Object.keys(tabsData).map((key) => (
                    <button
                      key={key}
                      className={cx({
                        [styles.switchAreaChartButton]: true,
                        [styles.switchAreaChartActiveButton]: activeTab === key
                      })}
                      onClick={() => setActiveTab(key)}
                    >
                      {tabsData[key].text}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.areaChartContainer}>
                <p className={styles.areaChartYAxisLegend}>Species Protection Index</p>
                <AreaChart
                  area1={{ key: "species", stroke: "#000000", strokeWidth: 0.5 }}
                  area2={{ key: "areas", stroke: "#008f39", fill: "#008f39", fillOpacity: 0.4, strokeWidth: 1 }}
                  data={activeTab === 'land' ? mockLandData : mockMarineData}
                  height={200}
                  width={'100%'}
                />
              </div>
              <div className={styles.areaLegend}>
                <div className={styles.areaLegendGroup}>
                  <div className={styles.area1BoxLegend} />
                  <p className={styles.areaChartLegendText}>SPI</p>
                </div>
                <div className={styles.areaLegendGroup}>
                  <div className={styles.area2BoxLegend} />
                  <p className={styles.areaChartLegendText}>Protected areas (%)</p>
                </div>
              </div>
              <p className={styles.areaChartLegendText}>Source: Map Of Life, (Yale University).</p>
            </>
          )}

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
      </section >
      <section className={styles.descriptionWrapper}>
        <p>{`${countryDescription}`}</p>
      </section>
    </div >
  );
}

export default CountryDataCardComponent;