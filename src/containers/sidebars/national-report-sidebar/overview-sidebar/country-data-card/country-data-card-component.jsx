import React, { useState } from 'react';
import { useT } from '@transifex/react';
import cx from 'classnames';
import AreaChart from 'components/charts/area-chart';
import DonutChart from 'components/charts/donut-chart';
import styles from './country-data-card-styles.module.scss';
import { ReactComponent as BulbIcon } from 'icons/bulb.svg';
import { LAND_MARINE } from 'constants/country-mode-constants';

const CountryDataCardComponent = ({
  areaChartData,
  countryData,
  countryDescription,
  handleInfoClick,
  indexStatement,
}) => {
  const t = useT();
  const [activeTab, setActiveTab] = useState(LAND_MARINE.land);

  const {
    Marine,
    nspecies_mar,
    nspecies_ter,
    prop_protected_mar,
    prop_protected_ter,
    SPI_ter,
    SPI_mar,
    total_endemic_mar,
    total_endemic_ter,
  } = countryData;

  const coastal = Marine === 'True' ? true : false;

  const { land, marine } = areaChartData;

  const tabsData = {
    land: {
      text: 'Land',
      data: land,
    },
    marine: {
      text: 'Marine',
      data: marine,
    },
  };

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
            <div
              className={styles.progressMark}
              style={{ left: `${SPI_ter}%` }}
            />
            <div
              className={styles.improvementArea}
              style={{ left: `${SPI_ter}%`, width: `${100 - SPI_ter}%` }}
            />
          </div>
          <div className={styles.index}>{`${SPI_ter}`}</div>
        </div>
        <p className={styles.indexStatement}>{indexStatement}</p>
      </section>
      <section className={styles.indexWidget}>
        <div className={styles.indexExplanation}>
          <p className={styles.indexExplanationText}>
            National Species Protection Index
          </p>
          <>
            <div className={styles.donutContainer}>
              <DonutChart
                chartXPosition={48}
                chartYPosition={60}
                colors={['#A24033', '#E9E9E9']}
                data={[
                  { name: 'SPI Ter', value: SPI_ter },
                  { name: 'Rest', value: 100 - SPI_ter },
                ]}
                height={130}
                innerRadius={'80%'}
                legendXPosition={53}
                legendYPosition={58}
                legendValue={SPI_ter}
                legendText="LAND SPI"
                outerRadius={'95%'}
                width={120}
              />
              <div>
                <p className={styles.legendText}>
                  The Land SPI is calculated based on the{' '}
                  <b>
                    protected land (
                    {`${prop_protected_ter && prop_protected_ter.toFixed()}%`})
                  </b>
                  , the total number of{' '}
                  <b>terrestrial vertebrates ({nspecies_ter})</b> and the amount
                  of these which are <b>endemic ({total_endemic_ter})</b>.
                </p>
              </div>
            </div>
            {coastal && (
              <div className={styles.donutContainer}>
                <DonutChart
                  chartXPosition={48}
                  chartYPosition={60}
                  colors={['#FFC01C', '#E9E9E9']}
                  data={[
                    { name: 'SPI Marine', value: SPI_mar },
                    { name: 'Rest', value: 100 - SPI_mar },
                  ]}
                  height={130}
                  innerRadius={'80%'}
                  legendXPosition={53}
                  legendYPosition={58}
                  legendValue={SPI_mar}
                  legendText="MARINE SPI"
                  outerRadius={'95%'}
                  width={120}
                />
                <div>
                  <p className={styles.legendText}>
                    The Marine SPI is based on the{' '}
                    <b>
                      protected marine areas (
                      {`${prop_protected_mar && prop_protected_mar.toFixed()}%`}
                      )
                    </b>
                    , the total number of{' '}
                    <b>marine vertebrates ({nspecies_mar})</b> and the amount of
                    these which are <b>endemic ({total_endemic_mar})</b>.
                  </p>
                </div>
              </div>
            )}
            <div className={styles.switchAreaChart}>
              <p className={styles.switchAreaChartText}>Trend of SPI</p>
              <div>
                {Object.keys(tabsData).map((key) => (
                  <button
                    key={key}
                    disabled={!coastal}
                    className={cx({
                      [styles.switchAreaChartButton]: true,
                      [styles.switchAreaChartActiveButton]: activeTab === key,
                    })}
                    onClick={() => setActiveTab(key)}
                  >
                    {tabsData[key].text}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.areaChartContainer}>
              <p className={styles.areaChartYAxisLegend}>
                Species Protection Index
              </p>
              <AreaChart
                area1={{
                  key: 'spi',
                  stroke: '#000000',
                  fill: [
                    '#FFBF00',
                    '#A74815',
                    '#821213',
                    '#371033',
                    '#250F3B',
                    '#1D1135',
                    '#060B2B',
                  ],
                  fillOpacity: 0.4,
                  strokeWidth: 0.5,
                }}
                area2={{
                  key: 'protected',
                  stroke: '#008f39',
                  fill: '#008f39',
                  fillOpacity: 0.4,
                  strokeWidth: 1,
                }}
                data={tabsData[activeTab].data}
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
                <p className={styles.areaChartLegendText}>
                  Protected areas (%)
                </p>
              </div>
            </div>
            <p className={styles.areaChartLegendText}>
              {t('Source: Map Of Life, (Yale University)')}.
            </p>
          </>
        </div>
        <div className={styles.hint}>
          <BulbIcon />
          <p className={styles.hintTitle}>
            Why only land and marine vertebrates?
          </p>
          <p className={styles.hintText}>
            Terrestrial and marine vertebrates represent the species groups with
            the most comprehensive coverage of distribution data. The Half-Earth
            Project is actively engaging in research to expand coverage of other
            taxonomic groups.
          </p>
        </div>
      </section>
      <section className={styles.descriptionWrapper}>
        <p>{`${countryDescription}`}</p>
      </section>
    </div>
  );
};

export default CountryDataCardComponent;
