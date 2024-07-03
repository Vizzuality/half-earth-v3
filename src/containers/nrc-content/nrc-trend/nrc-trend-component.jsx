import { T, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import Tooltip from '@tippyjs/react';

import TrendChartTooltip from 'containers/nrc-content/nrc-trend/trend-chart-tooltip';

import TrendChart from 'components/charts/trend-chart';

import InfoIcon from 'icons/infoDark.svg?react';

import styles from './nrc-trend-styles.module.scss';

function Trend({
  chartData,
  countryData,
  landMarineSelection,
  isShrunken,
  metadataInfo,
}) {
  const t = useT();
  const { land: landData, marine: marineData } = chartData;
  const land = landMarineSelection === 'land';

  return (
    <div className={styles.areaChartContainer}>
      <div className={styles.chartHeader}>
        <p className={styles.chartTitle}>
          <T
            _str="Trend of the {landMarineSPI}"
            _comment="{Trend of the} land SPI"
            landMarineSPI={land ? t('land SPI') : t('marine SPI')}
          />
        </p>
        <div className={styles.areaChartLegend}>
          <div className={styles.areaChartLegendItem}>
            <hr className={styles.area1ChartLegendLine} />
            <p>{t('SPI')}</p>
          </div>
          <div className={styles.areaChartLegendItem}>
            <hr className={styles.area2ChartLegendLine} />
            <p>% {t('Protected areas')}</p>
          </div>
        </div>
        <span>
          <Tooltip
            content={<div className={styles.titleTooltip}>{metadataInfo}</div>}
            delay={100}
            placement="top"
          >
            <InfoIcon className={styles.icon} />
          </Tooltip>
        </span>
      </div>

      {countryData && (
        <TrendChart
          area1={{
            key: 'spi',
            stroke: getCSSVariable('white'),
            strokeWidth: 0.5,
            label: 'SPI',
            labelOffset: isShrunken ? 7 : 18,
          }}
          area2={{
            key: 'protected',
            stroke: getCSSVariable('white'),
            strokeWidth: 0.7,
            strokeDasharray: '3 3 3 3',
            label: t('% Protected areas'),
            labelOffset: isShrunken ? 7 : 18,
          }}
          data={land ? landData : marineData}
          height={240}
          width="98%"
          tooltip
          tooltipContent={<TrendChartTooltip />}
        />
      )}
    </div>
  );
}

export default Trend;
