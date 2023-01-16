import React from 'react';

import { T, useT } from '@transifex/react';

import Tooltip from '@tippyjs/react';

import AreaChart from 'components/charts/area-chart';
import AreaChartTooltip from 'components/nrc-content/nrc-trend/area-chart-tooltip';

import COLORS from 'styles/settings';

import { ReactComponent as InfoIcon } from 'icons/infoDark.svg';

import styles from './nrc-trend-styles.module.scss';

function Trend({ areaChartData, countryData, landMarineSelection }) {
  const t = useT();
  const { land: landData, marine: marineData } = areaChartData;
  const land = landMarineSelection === 'land';

  return (
    <div className={styles.areaChartContainer}>
      <div className={styles.chartHeader}>
        <p className={styles.chartTitle}>
          <T
            _str="Trend of the {landMarineSelection} SPI"
            landMarineSelection={land ? 'Land' : 'Marine'}
          />
        </p>
        <span>
          <Tooltip
            content={
              <div className={styles.titleTooltip}>
                {t(
                  'Lorem ipsum dolor sit amet consectetur. Tincidunt ipsum habitasse lacus dolor ullamcorper lacinia feugiat. Ut senectus bibendum massa nibh quis magna diam ipsum fermentum. '
                )}
              </div>
            }
            delay={100}
            placement="top"
          >
            <InfoIcon className={styles.icon} />
          </Tooltip>
        </span>
      </div>
      {countryData && (
        <AreaChart
          area1={{
            key: 'spi',
            stroke: COLORS.white,
            strokeWidth: 0.5,
            label: 'SPI',
          }}
          area2={{
            key: 'protected',
            stroke: COLORS.white,
            strokeWidth: 0.7,
            strokeDasharray: '3 3 3 3',
            label: '% Protected areas',
          }}
          data={land ? landData : marineData}
          height={240}
          width="98%"
          tooltip
          tooltipContent={<AreaChartTooltip />}
        />
      )}
    </div>
  );
}

export default Trend;
