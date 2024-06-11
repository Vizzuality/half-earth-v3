import React from 'react';

import { T, useT } from '@transifex/react';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import ScatterPlot from 'components/charts/scatter-plot';
import Dropdown from 'components/dropdown';

import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';
import { ReactComponent as InfoIcon } from 'icons/infoDark.svg';

import { ReactComponent as CountryAreaImage } from 'images/country-area.svg';

import { CONTINENTS } from './nrc-challenges-constants';
import styles from './nrc-challenges-styles.module.scss';

function Challenges({
  challengesFilterOptions,
  challengesInfo,
  countryChallengesSelectedKey,
  countryISO,
  countryName,
  handleBubbleClick,
  handleFilterSelection,
  handleSelectIndicator,
  handleSelectNextIndicator,
  handleSelectPreviousIndicator,
  indicatorLabels,
  indicatorOptions,
  fullRanking,
  landMarineSelection,
  scatterPlotData,
  selectedIndicatorOption,
  selectedFilterOption,
  xAxisTicks,
  yAxisTicks,
}) {
  const t = useT();
  const { description: challengesTooltipInfo } = challengesInfo;
  const land = landMarineSelection === 'land';

  const CONTINENT_LABELS = {
    africa: t('Africa'),
    antarctica: t('Antarctica'),
    asia: t('Asia'),
    europe: t('Europe'),
    'north-america': t('North America'),
    'south-america': t('South America'),
    oceania: t('Oceania'),
    australia: t('Australia'),
  };

  return (
    <div
      className={cx({
        [styles.challengesContainer]: true,
        [styles.shrunken]: fullRanking,
      })}
    >
      <div id="nrc-challenges" className={styles.chartHeader}>
        {countryName && (
          <div className={styles.chartTitleContainer}>
            <div className={styles.chartTitleIndicators}>
              <p className={styles.chartTitle}>
                <T
                  _str="{landMarineSPI} and"
                  _comment="(Land SPI and) Number of vertebrate species of countries with shared stewardship to Sudan"
                  landMarineSPI={land ? t('Land SPI') : t('Marine SPI')}
                />
              </p>
              <div className={styles.dropdownContainer}>
                {indicatorOptions && (
                  <Dropdown
                    theme="secondary-dark"
                    width="full"
                    parentWidth={fullRanking ? '180px' : '230px'}
                    options={indicatorOptions}
                    selectedOption={
                      selectedIndicatorOption || indicatorOptions[0]
                    }
                    handleOptionSelection={handleSelectIndicator}
                  />
                )}
              </div>
            </div>
            <div className={styles.chartTitleFilter}>
              <p className={styles.chartTitle}>
                {t('of countries', {
                  _comment:
                    'Land SPI and Number of vertebrate species (of countries) with shared stewardship to Sudan',
                })}
              </p>
              <div className={styles.dropdownContainer}>
                <Dropdown
                  theme="secondary-dark"
                  width="full"
                  parentWidth={fullRanking ? '180px' : '230px'}
                  options={challengesFilterOptions}
                  selectedOption={selectedFilterOption}
                  handleOptionSelection={handleFilterSelection}
                />
              </div>
              <p className={styles.chartTitle}>
                <T
                  _str="to {countryName}"
                  _comment="Land SPI and Number of vertebrate species of countries with shared stewardship (to Sudan)"
                  countryName={countryName}
                />
              </p>
            </div>
          </div>
        )}
        <span>
          <Tooltip
            content={
              <div className={styles.titleTooltip}>
                <T
                  _str="{challengesTooltipInfo}"
                  challengesTooltipInfo={challengesTooltipInfo}
                />
              </div>
            }
            delay={100}
            placement="top"
          >
            <InfoIcon className={styles.icon} />
          </Tooltip>
        </span>
      </div>
      <div className={styles.scatterPlotContainer}>
        <div className={styles.scatterPlotChartWrapper}>
          <ScatterPlot
            data={scatterPlotData}
            countryISO={countryISO}
            xAxisTicks={xAxisTicks}
            yAxisTicks={yAxisTicks}
            onBubbleClick={handleBubbleClick}
            countryChallengesSelectedKey={countryChallengesSelectedKey}
            fullRanking={fullRanking}
          />
          {fullRanking && (
            <div className={styles.xAxisContainer}>
              <div className={cx(styles.xAxisLabelContainer, styles.shrunken)}>
                <span className={styles.xAxisIndicator}>
                  {indicatorLabels[countryChallengesSelectedKey]}
                </span>
              </div>
            </div>
          )}
          {!fullRanking && (
            <div className={styles.xAxisContainer}>
              <div className={styles.xAxisLabelContainer}>
                <button
                  type="button"
                  aria-label="Previous Indicator"
                  onClick={handleSelectPreviousIndicator}
                  style={{ transform: 'scaleX(-1)' }}
                >
                  <ArrowButton className={styles.arrowButton} />
                </button>
                <span className={styles.xAxisIndicator}>
                  {indicatorLabels[countryChallengesSelectedKey]}
                </span>
                <button
                  type="button"
                  onClick={handleSelectNextIndicator}
                  aria-label="Next Indicator"
                >
                  <ArrowButton className={styles.arrowButton} />
                </button>
              </div>
            </div>
          )}

          <div className={styles.yAxisContainer}>
            <span className={styles.yAxisIndicator}>
              {land ? <T _str="Land SPI" /> : <T _str="Marine SPI" />}
            </span>
          </div>
        </div>
        <div className={styles.scatterPlotLegendWrapper}>
          <div className={styles.continentsLegendWrapper}>
            <h5 className={styles.legendTitle}>{t('Continent')}</h5>
            <div className={styles.legendItemsContainer}>
              {CONTINENTS.map((c) => (
                <div key={c.color} className={styles.legendItem}>
                  <div
                    className={styles.legendItemColor}
                    style={{
                      background: c.color,
                    }}
                  />
                  <p className={styles.legendItemLabel}>
                    {CONTINENT_LABELS[c.slug]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className={styles.legendTitle}>
              <T _str="Country area in km{sup}" sup={<sup>2</sup>} />
            </h5>
            <CountryAreaImage className={styles.countryAreaImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
