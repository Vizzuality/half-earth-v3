import React from 'react';

import { useLocale, useT } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import styles from './trend-chart-tooltip-styles.module.scss';

function TrendChartTooltip({ active, payload }) {
  const t = useT();
  const locale = useLocale();
  const SPI = payload && payload[0];
  const protectedAreas = payload && payload[1];

  if (active && payload && payload.length) {
    return (
      <div className={styles.container}>
        <div className={styles.SPIcontainer}>
          <p>
            {t('SPI')}: {getLocaleNumber(Math.round(SPI.value), locale)}
          </p>
        </div>
        <div className={styles.protectedAreasContainer}>
          <p>
            {t('Protected areas')}: {Math.round(protectedAreas.value)}%
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default TrendChartTooltip;
