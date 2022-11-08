/* eslint-disable camelcase */
import React, { useState } from 'react';

import { useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';

import AreaChart from 'components/charts/area-chart';
import DonutChart from 'components/charts/donut-chart';

import { LAND_MARINE } from 'constants/country-mode-constants';

import { ReactComponent as BulbIcon } from 'icons/bulb.svg';

import styles from './country-data-card-styles.module.scss';

function CountryDataCardComponent({
  areaChartData,
  countryData,
  countryDescription,
  handleInfoClick,
  indexStatement,
}) {
  const t = useT();
  const locale = useLocale();
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

  const coastal = Marine === 'True';

  const { land, marine } = areaChartData;

  const tabsData = {
    land: {
      text: t('Land'),
      data: land,
    },
    marine: {
      text: t('Marine'),
      data: marine,
    },
  };

  return (
    <div className={styles.container}>
      <section className={styles.indexOverview}>
        <div className={styles.overviewTextWrapper}>
          <button
            type="button"
            onClick={handleInfoClick}
            className={styles.overviewText}
          >
            {t('The national species protection index:')}
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
            {t('National Species Protection Index')}
          </p>
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
              innerRadius="80%"
              legendXPosition={53}
              legendYPosition={58}
              legendValue={SPI_ter}
              legendText={t('LAND SPI')}
              outerRadius="95%"
              width={120}
            />
            <div>
              <p className={styles.legendText}>
                {t('The Land SPI is calculated based on the')}{' '}
                <b>
                  {t('protected land area')} (
                  {`${prop_protected_ter && prop_protected_ter.toFixed()}%`})
                </b>
                {t(', the total number of')}{' '}
                <b>
                  {t('terrestrial vertebrates ')}(
                  {getLocaleNumber(nspecies_ter, locale)})
                </b>
                {t(', and the amount of these species that are')}{' '}
                <b>{t('endemic')}</b> {t('to that nation')}{' '}
                <b>({getLocaleNumber(total_endemic_ter, locale)})</b>.
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
                innerRadius="80%"
                legendXPosition={53}
                legendYPosition={58}
                legendValue={SPI_mar}
                legendText={t('MARINE SPI')}
                outerRadius="95%"
                width={120}
              />
              <div>
                <p className={styles.legendText}>
                  {t('The Marine SPI is based on the')}{' '}
                  <b>
                    {t('protected marine area')} (
                    {`${prop_protected_mar && prop_protected_mar.toFixed()}%`})
                  </b>
                  {t(', the total number of')}{' '}
                  <b>
                    {t('marine vertebrates')} (
                    {getLocaleNumber(nspecies_mar, locale)})
                  </b>
                  {t(', and the amount of these species that are')}{' '}
                  <b>{t('endemic')} </b> {t('to that nation')}{' '}
                  <b>({getLocaleNumber(total_endemic_mar, locale)})</b>.
                </p>
              </div>
            </div>
          )}
          <div className={styles.switchAreaChart}>
            <p className={styles.switchAreaChartText}>{t('Trend of SPI')}</p>
            <div>
              {Object.keys(tabsData).map((key) => (
                <button
                  key={key}
                  type="button"
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
              {t('Species Protection Index')}
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
              width="100%"
            />
          </div>
          <div className={styles.areaLegend}>
            <div className={styles.areaLegendGroup}>
              <div className={styles.area1BoxLegend} />
              <p className={styles.areaChartLegendText}>{t('SPI')}</p>
            </div>
            <div className={styles.areaLegendGroup}>
              <div className={styles.area2BoxLegend} />
              <p className={styles.areaChartLegendText}>
                {t('Protected areas (%)')}
              </p>
            </div>
          </div>
          <p className={styles.areaChartLegendText}>
            {t('Source: Map of Life, (Yale University)')}.
          </p>
        </div>
        <div className={styles.hint}>
          <BulbIcon />
          <p className={styles.hintTitle}>
            {t('Why only land and marine vertebrates?')}
          </p>
          <p className={styles.hintText}>
            {t(`Terrestrial and marine vertebrates represent the species groups with
            the most comprehensive distribution data available. The Half-Earth
            Project is actively engaging in research to expand coverage to other
            taxonomic groups.`)}
          </p>
        </div>
      </section>
      {countryDescription && (
        <section className={styles.descriptionWrapper}>
          <p>{countryDescription}</p>
        </section>
      )}
    </div>
  );
}

export default CountryDataCardComponent;
